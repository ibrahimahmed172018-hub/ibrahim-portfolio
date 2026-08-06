import { Link } from "@tanstack/react-router";
import { RetinaLogo } from "./Logo";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <RetinaLogo className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            المميزات
          </a>
          <a
            href="/#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            الأسعار
          </a>
          <a
            href="/#faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            الأسئلة الشائعة
          </a>
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            لوحة الإدارة
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* On desktop (sm and up): text link for Login */}
          <Link
            to="/login"
            className="hidden text-sm font-medium text-foreground/80 hover:text-foreground sm:inline"
          >
            تسجيل الدخول
          </Link>

          {/* On mobile: show Login button in place of Create Academy */}
          <Button
            asChild
            variant="default"
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant sm:hidden"
          >
            <Link to="/login">تسجيل الدخول</Link>
          </Button>

          {/* On desktop (sm and up): show Create Academy button */}
          <Button
            asChild
            variant="default"
            className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant"
          >
            <Link to="/register">أنشئ أكاديميتك</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-primary text-primary-foreground/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-background/10 p-2">
              <RetinaLogo className="h-7 w-auto brightness-0 invert" />
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/60">
            منصة Retina توفر لكل مدرس مصري أكاديمية مستقلة بهويته الخاصة، بعدد طلاب غير محدود وتحكم
            كامل في المحتوى والعلامة التجارية.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-primary-foreground">المنصة</div>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/60">
            <li>منشئ الكورسات</li>
            <li>إدارة الطلاب</li>
            <li>فيديو محمي</li>
            <li>هوية بصرية مخصصة</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-primary-foreground">الشركة</div>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/60">
            <li>من نحن</li>
            <li>الأسعار</li>
            <li>الدعم الفني</li>
            <li>تواصل معنا</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-xs text-primary-foreground/50">
          <span>© {new Date().getFullYear()} منصة Retina</span>
          <span>صُممت لتُرى.</span>
        </div>
      </div>
    </footer>
  );
}
