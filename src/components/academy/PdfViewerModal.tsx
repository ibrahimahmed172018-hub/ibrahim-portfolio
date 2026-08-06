import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, X } from "lucide-react";

export interface PdfViewerModalProps {
  activePdfViewer: any;
  onClose: () => void;
  onDownloadPDF: (item: any) => void;
  getPdfEmbedUrl: (item: any) => string;
}

export function PdfViewerModal({
  activePdfViewer,
  onClose,
  onDownloadPDF,
  getPdfEmbedUrl,
}: PdfViewerModalProps) {
  if (!activePdfViewer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 dir-rtl">
      <Card className="w-full max-w-4xl h-[85vh] p-6 border-amber-500/40 shadow-2xl flex flex-col bg-card">
        <div className="flex items-center justify-between border-b pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">{activePdfViewer.title}</h3>
              <p className="text-xs text-muted-foreground">
                {activePdfViewer.fileName || "المذكرة الرقمية المعتمدة للأكاديمية"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => onDownloadPDF(activePdfViewer)}
              className="bg-amber-600 text-white hover:bg-amber-700 font-bold"
            >
              <Download className="ml-1.5 h-4 w-4" /> تنزيل الـ PDF
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex-1 rounded-xl border bg-muted/10 overflow-hidden flex flex-col items-center justify-center p-2">
          <object
            data={getPdfEmbedUrl(activePdfViewer)}
            type="application/pdf"
            className="w-full h-full min-h-[480px] rounded-xl bg-card border shadow-sm"
          >
            <iframe
              src={getPdfEmbedUrl(activePdfViewer)}
              className="w-full h-full min-h-[480px] rounded-xl border-0"
              title={activePdfViewer.title}
            />
          </object>
        </div>
      </Card>
    </div>
  );
}
