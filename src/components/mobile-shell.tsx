import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Home, User, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/appointments", label: "Lịch hẹn", icon: CalendarDays },
  { to: "/wallet", label: "Ví", icon: Wallet },
  { to: "/profile", label: "Cá nhân", icon: User },
] as const;

export function MobileShell({
  children,
  header,
  hideNav,
}: {
  children: ReactNode;
  header?: ReactNode;
  hideNav?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-muted/60 py-0 sm:py-8">
      <div className="app-frame overflow-hidden border-border/70 shadow-card sm:min-h-[900px] sm:rounded-[2.5rem] sm:border">
        {header}
        <main className={cn("px-5 pt-5", hideNav ? "pb-8" : "pb-28")}>{children}</main>

        {!hideNav && (
          <nav className="sticky bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur">
            <ul className="grid grid-cols-4">
              {tabs.map((tab) => {
                const active = pathname === tab.to;
                return (
                  <li key={tab.to}>
                    <Link
                      to={tab.to}
                      className={cn(
                        "flex flex-col items-center gap-1 py-3 text-[11px] font-semibold transition-colors",
                        active ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-9 w-9 place-items-center rounded-2xl transition-colors",
                          active && "bg-primary-soft",
                        )}
                      >
                        <tab.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.9} />
                      </span>
                      {tab.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-5 py-4">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
