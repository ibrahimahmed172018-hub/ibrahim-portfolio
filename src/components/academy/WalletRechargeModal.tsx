import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Phone, Sparkles, X, TicketCheck, Loader2 } from "lucide-react";
import { redeemAccessCodeFn } from "@/lib/api";
import { toast } from "sonner";

export interface WalletRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  studentId?: string;
  teacherPaymentMethods: {
    vodafoneNumber: string;
    instapayHandle: string;
    bankDetails: string;
  };
  onSubmitRecharge: (data: {
    amount: number;
    paymentMethod: "vodafone" | "instapay" | "bank";
    senderReference: string;
  }) => void;
  onCopyInfo: (text: string, label: string) => void;
  onBalanceUpdated?: (newBalance: number) => void;
}

export function WalletRechargeModal({
  isOpen,
  onClose,
  balance,
  studentId = "guest",
  teacherPaymentMethods,
  onSubmitRecharge,
  onCopyInfo,
  onBalanceUpdated,
}: WalletRechargeModalProps) {
  const [rechargeType, setRechargeType] = useState<"card" | "transfer">("card");
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "vodafone" | "instapay" | "bank"
  >("vodafone");
  const [rechargeAmountInput, setRechargeAmountInput] = useState("500");
  const [senderRefInput, setSenderRefInput] = useState("");

  if (!isOpen) return null;

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCodeInput.trim()) {
      toast.error("يرجى إدخال رمز كود الشحن");
      return;
    }

    try {
      setRedeeming(true);
      const res = await redeemAccessCodeFn({
        data: {
          studentId,
          code: accessCodeInput.trim(),
        },
      });

      if (res && res.success) {
        toast.success(res.message || "تم شحن المحفظة بنجاح!");
        if (res.newBalance !== undefined && onBalanceUpdated) {
          onBalanceUpdated(res.newBalance);
        }
        setAccessCodeInput("");
        onClose();
      } else {
        toast.error(res?.error || "كود الشحن غير صحيح أو مستخدم مسبقاً");
      }
    } catch (err: any) {
      toast.error("خطأ أثناء تفعيل كود الشحن");
    } finally {
      setRedeeming(false);
    }
  };

  const handleSubmitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(rechargeAmountInput) || 0;
    onSubmitRecharge({
      amount,
      paymentMethod: selectedPaymentMethod,
      senderReference: senderRefInput.trim(),
    });
  };

  const activeVal =
    selectedPaymentMethod === "vodafone"
      ? teacherPaymentMethods.vodafoneNumber
      : selectedPaymentMethod === "instapay"
        ? teacherPaymentMethods.instapayHandle
        : teacherPaymentMethods.bankDetails;

  const activeLabel =
    selectedPaymentMethod === "vodafone"
      ? "رقم فودافون كاش للمدرس"
      : selectedPaymentMethod === "instapay"
        ? "معرّف InstaPay للتحويل"
        : "رقم الحساب البنكي / IBAN";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="w-full max-w-md p-6 border-accent/40 shadow-elegant my-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-accent" />
            <span className="font-bold text-primary">محفظة الطالب وشحن الرصيد</span>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 text-center rounded-2xl bg-accent/10 p-4 border border-accent/20">
          <div className="text-xs text-muted-foreground">رصيدك الحالي بالأكاديمية</div>
          <div className="mt-1 text-3xl font-black text-accent">{balance} ج.م</div>
        </div>

        {/* Tab Selection: Access Code (Instant) vs Transfer (Proof) */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-muted/50 border">
          <button
            type="button"
            onClick={() => setRechargeType("card")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              rechargeType === "card"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <TicketCheck className="h-4 w-4" /> كود شحن (تفعيل فوري)
          </button>
          <button
            type="button"
            onClick={() => setRechargeType("transfer")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              rechargeType === "transfer"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Phone className="h-4 w-4" /> تحويل كاش / إنستاباي
          </button>
        </div>

        {rechargeType === "card" ? (
          <form onSubmit={handleRedeemCode} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="accessCodeInput" className="text-xs font-bold">
                أدخل رمز كود الشحن / الكارت الورقي
              </Label>
              <Input
                id="accessCodeInput"
                value={accessCodeInput}
                onChange={(e) => setAccessCodeInput(e.target.value)}
                placeholder="مثال: RTN-500-X7A1-8921"
                className="mt-1.5 font-mono text-center tracking-wider uppercase font-bold text-sm"
                required
              />
              <p className="text-[11px] text-muted-foreground mt-1.5">
                * يمكنك الحصول على كروت الأكواد من السنتر أو المدرس مباشرة لشحن المحفظة فورياً.
              </p>
            </div>

            <Button
              type="submit"
              disabled={redeeming}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-3 shadow-md mt-2"
            >
              {redeeming ? (
                <Loader2 className="h-4 w-4 animate-spin ml-2" />
              ) : (
                "تفعيل كود الشحن الآن 🎟️"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitTransfer} className="mt-4 space-y-4">
            <div>
              <Label className="text-xs font-bold">1. اختر طريقة الشحن والتحويل</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod("vodafone")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    selectedPaymentMethod === "vodafone"
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <Phone className="h-4 w-4 text-emerald-600" /> فودافون كاش
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod("instapay")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    selectedPaymentMethod === "instapay"
                      ? "border-purple-500 bg-purple-500/15 text-purple-700 dark:text-purple-300 shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-purple-600" /> إنستا باي
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod("bank")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    selectedPaymentMethod === "bank"
                      ? "border-blue-500 bg-blue-500/15 text-blue-700 dark:text-blue-300 shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <Wallet className="h-4 w-4 text-blue-600" /> حساب بنكي
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-dashed border-accent/40 space-y-2">
              <div className="text-xs text-muted-foreground font-medium">{activeLabel}:</div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-background border font-mono text-sm font-bold text-accent dir-ltr">
                <span className="truncate">{activeVal}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => onCopyInfo(activeVal, activeLabel)}
                  className="h-7 text-xs text-accent hover:bg-accent/10 shrink-0 font-sans"
                >
                  نسخ الرقم
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="rechargeAmountInput" className="text-xs font-bold">
                2. المبلغ المراد إضافته للمحفظة (بالجنيه المصري)
              </Label>
              <Input
                id="rechargeAmountInput"
                name="rechargeAmount"
                type="number"
                value={rechargeAmountInput}
                onChange={(e) => setRechargeAmountInput(e.target.value)}
                placeholder="٥٠٠ ج.م"
                className="mt-1.5 font-bold"
                required
              />
            </div>

            <div>
              <Label htmlFor="senderRefInput" className="text-xs font-bold">
                3. رقم الموبايل المحوّل منه / مرجع العملية (اختياري)
              </Label>
              <Input
                id="senderRefInput"
                name="senderRef"
                value={senderRefInput}
                onChange={(e) => setSenderRefInput(e.target.value)}
                placeholder="مثال: ٠١٠٠ ٠٠٠ ٠٠٠٠"
                dir="ltr"
                className="mt-1.5 text-xs font-mono"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-3 shadow-md mt-2"
            >
              تأكيد التحويل وإرسال طلب الشحن ⚡
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
