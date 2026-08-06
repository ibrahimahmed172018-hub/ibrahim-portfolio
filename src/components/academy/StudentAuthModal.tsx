import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2, Mail, Phone, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";

export interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  academyName: string;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  studentName: string;
  setStudentName: (val: string) => void;
  studentEmail?: string;
  setStudentEmail?: (val: string) => void;
  studentPhone: string;
  setStudentPhone: (val: string) => void;
  studentPassword: string;
  setStudentPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submittingAuth: boolean;
  unverifiedEmail?: string | null;
  resendLoading?: boolean;
  onResendVerification?: () => void;
}

export function StudentAuthModal({
  isOpen,
  onClose,
  academyName,
  authMode,
  setAuthMode,
  studentName,
  setStudentName,
  studentEmail = "",
  setStudentEmail,
  studentPhone,
  setStudentPhone,
  studentPassword,
  setStudentPassword,
  onSubmit,
  submittingAuth,
  unverifiedEmail,
  resendLoading = false,
  onResendVerification,
}: StudentAuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-8 border-accent/40 shadow-elegant">
        <div className="flex items-center justify-between border-b pb-4">
          <span className="font-bold text-primary">
            {authMode === "signup" ? `إنشاء حساب طالب في ${academyName}` : "تسجيل الدخول كطالب"}
          </span>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Email Verification Required Banner */}
        {unverifiedEmail && (
          <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-right">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
              <div className="flex-1 text-sm">
                <p className="font-bold text-primary">يتطلب تفعيل بريدك الإلكتروني 📩</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  أرسلنا رابط تأكيد إلى <strong className="text-primary">{unverifiedEmail}</strong>.
                  يُرجى مراجعة بريدك الإلكتروني والضغط على الرابط لتأكيد الحساب ومتابعة الدخول.
                </p>
                {onResendVerification && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={resendLoading}
                    className="mt-3 border-yellow-500/40 text-yellow-600 hover:bg-yellow-500/10"
                    onClick={onResendVerification}
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="ml-1.5 h-3 w-3 animate-spin" /> جاري الإرسال…
                      </>
                    ) : (
                      <>
                        <RefreshCw className="ml-1.5 h-3 w-3" /> أعد إرسال رابط التأكيد
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {authMode === "signup" && (
            <>
              <div>
                <Label htmlFor="studentNameInput">اسم الطالب ثلاثي</Label>
                <Input
                  id="studentNameInput"
                  name="studentName"
                  autoComplete="name"
                  placeholder="أحمد محمد علي"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="studentEmailInput">البريد الإلكتروني</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="studentEmailInput"
                    name="studentEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="student@example.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail?.(e.target.value)}
                    dir="ltr"
                    className="pl-9"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="studentPhoneInput">
              {authMode === "signup" ? "رقم الموبايل" : "البريد الإلكتروني أو رقم الموبايل"}
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="studentPhoneInput"
                name="studentPhone"
                autoComplete={authMode === "signup" ? "tel" : "username"}
                placeholder={
                  authMode === "signup" ? "01XXXXXXXXX" : "example@email.com أو 01XXXXXXXXX"
                }
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                dir="ltr"
                className="pl-9"
                required
              />
              {studentPhone.includes("@") ? (
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent transition-all" />
              ) : (
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all" />
              )}
            </div>
            {authMode === "login" && (
              <p className="mt-1 text-xs text-muted-foreground">
                يمكنك تسجيل الدخول برقم الموبايل أو البريد الإلكتروني
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="studentPasswordInput">كلمة السر</Label>
            <Input
              id="studentPasswordInput"
              name="studentPassword"
              autoComplete={authMode === "signup" ? "new-password" : "current-password"}
              type="password"
              placeholder="••••••••"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submittingAuth}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2"
          >
            {submittingAuth ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : authMode === "signup" ? (
              "إنشاء الحساب ودخول الأكاديمية"
            ) : (
              "دخول الأكاديمية"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          {authMode === "signup" ? (
            <span>
              لديك حساب بالفعل؟{" "}
              <button
                onClick={() => setAuthMode("login")}
                className="text-accent font-bold underline"
              >
                سجل دخولك
              </button>
            </span>
          ) : (
            <span>
              طالب جديد؟{" "}
              <button
                onClick={() => setAuthMode("signup")}
                className="text-accent font-bold underline"
              >
                أنشئ حسابك الآن
              </button>
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
