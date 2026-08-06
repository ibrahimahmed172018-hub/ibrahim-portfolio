import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export interface QuizRunnerModalProps {
  quiz: any;
  onExit: () => void;
  onComplete?: (score: number, answers: Record<string, number>) => void;
  initialAnswers?: Record<string, number>;
  initialSubmitted?: boolean;
}

export function QuizRunnerModal({
  quiz,
  onExit,
  onComplete,
  initialAnswers = {},
  initialSubmitted = false,
}: QuizRunnerModalProps) {
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers || {});
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [timeLeft, setTimeLeft] = useState((quiz.duration || 20) * 60);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => setTimeLeft((t: number) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const questionsList = quiz.questions || [];

  const correctAnswersCount = questionsList.filter((q: any, idx: number) => {
    const qId = q.id || `q_${idx}`;
    const correctIdx =
      typeof q.correctOptionIndex === "number"
        ? q.correctOptionIndex
        : typeof q.correctIndex === "number"
          ? q.correctIndex
          : 0;
    return answers[qId] === correctIdx;
  }).length;

  const scorePct =
    questionsList.length > 0 ? Math.round((correctAnswersCount / questionsList.length) * 100) : 0;

  const handleSubmit = () => {
    setSubmitted(true);
    if (onComplete) {
      onComplete(scorePct, answers);
    }
  };

  return (
    <Card className="p-6 sm:p-8 border-accent/40 shadow-elegant space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <Badge
            className={
              submitted
                ? "bg-emerald-600 text-white font-bold"
                : "bg-accent text-accent-foreground font-bold"
            }
          >
            {submitted ? "مراجعة النموذج والنتائج ✓" : "اختبار تفاعلي"}
          </Badge>
          <h2 className="text-xl font-black text-primary mt-1.5">{quiz.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {!submitted && (
            <div className="text-sm font-bold text-accent flex items-center gap-1">
              <Clock className="h-4 w-4" /> المتبقي: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60}
            </div>
          )}
          <Button size="sm" variant="ghost" onClick={onExit}>
            إغلاق الاختبار
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white font-black text-2xl shadow-lg">
            {scorePct}٪
          </div>
          <h3 className="text-xl font-black text-primary">نموذج الإجابات ورصد النتيجة</h3>
          <p className="text-sm text-muted-foreground">
            أجبت بشكل صحيح على{" "}
            <span className="font-bold text-emerald-600">{correctAnswersCount}</span> من أصل{" "}
            <span className="font-bold">{questionsList.length}</span> أسئلة.
          </p>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-6">
        {questionsList.map((q: any, idx: number) => {
          const qId = q.id || `q_${idx}`;
          const qText = q.questionText || q.text || q.title || `السؤال رقم ${idx + 1}`;
          const choices = q.options ||
            q.choices || ["الخيار الأول", "الخيار الثاني", "الخيار الثالث", "الخيار الرابع"];
          const correctIdx =
            typeof q.correctOptionIndex === "number"
              ? q.correctOptionIndex
              : typeof q.correctIndex === "number"
                ? q.correctIndex
                : 0;

          const studentChosen =
            answers[qId] !== undefined
              ? answers[qId]
              : answers[`q_${idx}`] !== undefined
                ? answers[`q_${idx}`]
                : answers[idx];
          const isCorrect = studentChosen === correctIdx;

          return (
            <div
              key={qId}
              className={`space-y-3 p-5 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-rose-500/40 bg-rose-500/5"
                  : "border-border/80 bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold text-primary text-base flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      submitted
                        ? isCorrect
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{qText}</span>
                </div>

                {submitted && (
                  <Badge
                    variant="outline"
                    className={
                      isCorrect
                        ? "border-emerald-500 text-emerald-600 bg-emerald-500/10 shrink-0 font-bold"
                        : "border-rose-500 text-rose-600 bg-rose-500/10 shrink-0 font-bold"
                    }
                  >
                    {isCorrect ? "إجابة صحيحة ✓" : "إجابة خاطئة ✗"}
                  </Badge>
                )}
              </div>

              <div className="space-y-2 mr-8">
                {choices.map((choice: string, choiceIdx: number) => {
                  const isSelectedByStudent = studentChosen === choiceIdx;
                  const isTheCorrectAnswer = choiceIdx === correctIdx;

                  let choiceStyle = "bg-card border-border hover:bg-muted/40";
                  if (submitted) {
                    if (isSelectedByStudent && isTheCorrectAnswer) {
                      choiceStyle =
                        "border-emerald-500 bg-emerald-500/20 text-emerald-700 font-bold dark:text-emerald-300 shadow-sm";
                    } else if (isSelectedByStudent && !isTheCorrectAnswer) {
                      choiceStyle =
                        "border-rose-500 bg-rose-500/25 text-rose-700 font-bold dark:text-rose-300 shadow-sm";
                    } else if (isTheCorrectAnswer) {
                      choiceStyle =
                        "border-amber-500/80 bg-amber-500/15 text-amber-700 font-bold dark:text-amber-300";
                    } else {
                      choiceStyle = "bg-card/40 border-border/40 opacity-50";
                    }
                  } else if (isSelectedByStudent) {
                    choiceStyle = "border-accent bg-accent/15 font-bold shadow-sm";
                  }

                  return (
                    <label
                      key={choiceIdx}
                      className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all ${
                        submitted ? "cursor-default" : "cursor-pointer"
                      } ${choiceStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={qId}
                          disabled={submitted}
                          checked={isSelectedByStudent}
                          onChange={() =>
                            !submitted && setAnswers((prev) => ({ ...prev, [qId]: choiceIdx }))
                          }
                          className="accent-accent h-4 w-4"
                        />
                        <span className="text-sm font-semibold">{choice}</span>
                      </div>

                      {submitted && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isSelectedByStudent && isTheCorrectAnswer && (
                            <Badge className="bg-emerald-600 text-white font-bold text-xs px-2.5 py-0.5">
                              اختيارك الصحيح ✓
                            </Badge>
                          )}
                          {isSelectedByStudent && !isTheCorrectAnswer && (
                            <Badge className="bg-rose-600 text-white font-bold text-xs px-2.5 py-0.5">
                              اختيارك الخاطئ ✗
                            </Badge>
                          )}
                          {!isSelectedByStudent && isTheCorrectAnswer && (
                            <Badge className="bg-amber-500/20 text-amber-600 border border-amber-500/40 font-bold text-xs px-2.5 py-0.5">
                              الإجابة النموذجية الصحيحة ✓
                            </Badge>
                          )}
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base font-bold shadow-lg"
          >
            تسليم الإجابات وإنهاء الاختبار
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              onClick={onExit}
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 font-bold"
            >
              إغلاق المراجعة والعودة للأكاديمية
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
              variant="outline"
              className="w-full sm:w-auto border-accent/40 text-accent"
            >
              إعادة محاولة الاختبار من جديد
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
