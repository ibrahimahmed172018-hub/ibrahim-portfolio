import React, { useEffect, useMemo, useRef, useState } from "react";
import { PlayCircle, ShieldCheck } from "lucide-react";
import { getBunnyEmbedUrl, parseBunnyVideo } from "@/lib/bunny";
import { readLocalProgress } from "@/lib/progress-storage";
import {
  LessonProgressTracker,
  type ProgressSyncFn,
  type SyncResult,
} from "@/lib/progress-tracker";

let playerJsLoader: Promise<void> | null = null;

/** Bunny Stream exposes reliable playback events through player.js. */
function loadBunnyPlayerJs() {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).playerjs) return Promise.resolve();
  if (playerJsLoader) return playerJsLoader;

  playerJsLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Bunny playback API"));
    document.head.appendChild(script);
  });
  return playerJsLoader;
}

interface BunnyVideoPlayerProps {
  videoSrcOrId: string;
  lessonId?: string;
  courseId?: string;
  tenantId?: string;
  studentId?: string;
  token?: string;
  title?: string;
  studentName?: string;
  studentPhone?: string;
  autoPlay?: boolean;
  /** Server-side resume point in seconds. Read once, at mount. */
  startTime?: number;
  /** Known lesson duration in seconds, if the server has it. */
  duration?: number;
  showWatermark?: boolean;
  /** Server call that persists progress (e.g. a createServerFn wrapper). */
  sync?: ProgressSyncFn;
  onProgressUpdate?: (percent: number, currentTime?: number, duration?: number) => void;
  onAck?: (result: SyncResult) => void;
}

export const BunnyVideoPlayer: React.FC<BunnyVideoPlayerProps> = ({
  videoSrcOrId,
  lessonId,
  courseId,
  tenantId,
  studentId,
  token,
  title,
  studentName = "طالب الأكاديمية",
  studentPhone = "",
  autoPlay = true,
  startTime = 0,
  duration,
  showWatermark = true,
  sync,
  onProgressUpdate,
  onAck,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState({ top: "20%", left: "15%" });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const bunnyPlayerRef = useRef<any>(null);
  const bunnyClockRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Callbacks live in refs: parent re-renders must never recreate the tracker
  // (recreating it would remount the iframe and restart the video).
  const onProgressUpdateRef = useRef(onProgressUpdate);
  const onAckRef = useRef(onAck);
  const syncRef = useRef(sync);
  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
    onAckRef.current = onAck;
    syncRef.current = sync;
  }, [onProgressUpdate, onAck, sync]);

  // Resume point is resolved from server value and local checkpoint cache (whichever is further)
  const [resolvedStartTime, setResolvedStartTime] = useState<number>(() => {
    const local = readLocalProgress(lessonId);
    return Math.max(startTime || 0, local?.currentTime || 0);
  });
  const initialStartTimeRef = useRef(resolvedStartTime);
  const [resumeReady, setResumeReady] = useState(false);

  useEffect(() => {
    const local = readLocalProgress(lessonId);
    const start = Math.max(startTime || 0, local?.currentTime || 0);
    initialStartTimeRef.current = start;
    setResolvedStartTime(start);
    setResumeReady(true);
    // `startTime` is intentionally not a dependency: parent progress updates
    // change it continuously, and changing the iframe URL restarts playback.
  }, [lessonId, videoSrcOrId]);

  const provider = useMemo(() => parseBunnyVideo(videoSrcOrId).provider, [videoSrcOrId]);

  const embedSrc = useMemo(
    () =>
      getBunnyEmbedUrl(videoSrcOrId, {
        autoplay: autoPlay,
        disableRum: true,
        startTime: resolvedStartTime,
        origin: typeof window !== "undefined" ? window.location.origin : undefined,
      }),
    [videoSrcOrId, autoPlay, resolvedStartTime],
  );

  // Moving watermark (anti-piracy).
  useEffect(() => {
    if (!showWatermark) return;
    const interval = setInterval(() => {
      setWatermarkPos({
        top: `${Math.floor(Math.random() * 65 + 10)}%`,
        left: `${Math.floor(Math.random() * 60 + 10)}%`,
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [showWatermark]);

  useEffect(() => {
    setLoaded(false);
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, [videoSrcOrId]);

  const trackerRef = useRef<LessonProgressTracker | null>(null);

  const connectBunnyPlaybackApi = () => {
    const iframe = iframeRef.current;
    const tracker = trackerRef.current;
    if (provider !== "bunny" || !iframe || !tracker || bunnyPlayerRef.current) return;

    void loadBunnyPlayerJs()
      .then(() => {
        if (!iframeRef.current || !trackerRef.current || bunnyPlayerRef.current) return;
        const Player = (window as any).playerjs?.Player;
        if (!Player) return;

        const player = new Player(iframeRef.current);
        bunnyPlayerRef.current = player;
        const stopClock = () => {
          if (bunnyClockRef.current) clearInterval(bunnyClockRef.current);
          bunnyClockRef.current = null;
        };
        const startClock = () => {
          if (bunnyClockRef.current) return;
          bunnyClockRef.current = setInterval(() => {
            player.getCurrentTime?.((seconds: number) => {
              if (Number.isFinite(seconds) && seconds >= 0) {
                trackerRef.current?.handleTimeUpdate(seconds);
              }
            });
          }, 1000);
        };
        player.on("ready", () => {
          player.getDuration?.((seconds: number) => {
            if (Number.isFinite(seconds) && seconds > 0) {
              trackerRef.current?.handleTimeUpdate(0, seconds);
            }
          });
          player.on("timeupdate", (data: any) => {
            const timing = data?.data ?? data;
            const seconds = timing?.seconds ?? timing?.currentTime ?? timing?.time;
            const total = timing?.duration;
            if (typeof seconds === "number") trackerRef.current?.handleTimeUpdate(seconds, total);
          });
          player.on("play", () => {
            trackerRef.current?.handlePlay();
            startClock();
          });
          player.on("pause", () => {
            stopClock();
            trackerRef.current?.handlePause();
          });
          player.on("ended", () => {
            stopClock();
            trackerRef.current?.handleEnded();
          });
        });
      })
      .catch((error) => console.warn("Bunny playback tracking unavailable", error));
  };

  // Single tracker instance per lesson — one message listener, no double counting.
  useEffect(() => {
    if (!lessonId || !courseId || !resumeReady) return;
    const local = readLocalProgress(lessonId);

    const tracker = new LessonProgressTracker({
      lessonId,
      courseId,
      tenantId,
      studentId,
      token,
      duration: duration || local?.duration,
      resumeAt: Math.max(initialStartTimeRef.current, local?.watchedSeconds || 0),
      syncIntervalMs: 10_000,
      beaconUrl: "/api/public/progress",
      sync: (payload) =>
        syncRef.current
          ? syncRef.current(payload)
          : Promise.resolve({ success: false, error: "no sync fn provided" }),
      onLocalProgress: (current, percent, dur) =>
        onProgressUpdateRef.current?.(percent, current, dur),
      onAck: (result) => onAckRef.current?.(result),
    });

    trackerRef.current = tracker;
    if (iframeRef.current) tracker.attachIframe(iframeRef.current);
    if (mediaRef.current) tracker.attachMedia(mediaRef.current);

    return () => {
      trackerRef.current = null;
      bunnyPlayerRef.current = null;
      if (bunnyClockRef.current) clearInterval(bunnyClockRef.current);
      bunnyClockRef.current = null;
      tracker.destroy();
    };
  }, [lessonId, courseId, tenantId, studentId, token, duration, videoSrcOrId, resumeReady]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-border/40 select-none">
      {showWatermark && (
        <div
          className="pointer-events-none absolute z-30 transition-all duration-1000 ease-in-out select-none"
          style={{ top: watermarkPos.top, left: watermarkPos.left }}
        >
          <div className="rotate-[-15deg] text-center text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg backdrop-blur-xs shadow-2xl bg-background/70 text-foreground border border-border">
            <div>{studentName}</div>
            {studentPhone && <div dir="ltr">{studentPhone}</div>}
            <div className="text-[9px] uppercase tracking-widest mt-0.5 text-muted-foreground">
              Anti-Piracy DRM
            </div>
          </div>
        </div>
      )}

      {!loaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/95 p-6 text-center space-y-3">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent animate-pulse">
            <PlayCircle className="h-10 w-10" />
          </div>
          {title && <h4 className="text-lg font-bold max-w-md">{title}</h4>}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1 rounded-full border border-border">
            <ShieldCheck className="h-3.5 w-3.5" /> تشغيل محمي
          </div>
        </div>
      )}

      {!resumeReady ? null : provider === "file" ? (
        <video
          ref={mediaRef}
          src={embedSrc}
          className="w-full h-full relative z-10"
          controls
          autoPlay={autoPlay}
          playsInline
          onLoadedData={() => {
            setLoaded(true);
            if (mediaRef.current && trackerRef.current) {
              trackerRef.current.attachMedia(mediaRef.current);
            }
          }}
        />
      ) : (
        <iframe
          ref={iframeRef}
          id={lessonId ? `lesson-player-${lessonId}` : undefined}
          src={embedSrc}
          className="w-full h-full border-0 relative z-10"
          loading="eager"
          onLoad={() => {
            setLoaded(true);
            if (iframeRef.current && trackerRef.current) {
              trackerRef.current.attachIframe(iframeRef.current);
            }
            connectBunnyPlaybackApi();
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title={title || "فيديو المحاضرة"}
        />
      )}
    </div>
  );
};
