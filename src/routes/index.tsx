import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  Bell,
  ChevronRight,
  Droplets,
  HeartPulse,
  Stethoscope,
  Syringe,
  TestTube,
  Video,
} from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { AiChatSheet } from "@/components/ai-chat-sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "An Khởi — Đặt lịch khám & ví sức khỏe" },
      {
        name: "description",
        content:
          "An Khởi giúp bạn đặt lịch khám với bác sĩ, quản lý ví thanh toán và trò chuyện với trợ lý sức khỏe AI.",
      },
      { property: "og:title", content: "An Khởi — Đặt lịch khám & ví sức khỏe" },
      {
        property: "og:description",
        content: "Đặt lịch khám, thanh toán bằng ví và theo dõi sức khỏe trên một ứng dụng.",
      },
    ],
  }),
  component: HomeScreen,
});

const services = [
  { label: "Khám tổng quát", icon: Stethoscope },
  { label: "Xét nghiệm", icon: TestTube },
  { label: "Tiêm chủng", icon: Syringe },
  { label: "Tư vấn video", icon: Video },
];

function HomeScreen() {
  return (
    <MobileShell
      header={
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 bg-primary px-5 pb-8 pt-6 text-primary-foreground">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-11 w-11 shrink-0 border-2 border-primary-foreground/40">
              <AvatarFallback className="bg-primary-foreground/15 text-primary-foreground">
                KV
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs text-primary-foreground/75">Chào buổi chiều</p>
              <p className="truncate text-base font-bold">Kiều Gia Vĩ</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-2xl bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </header>
      }
    >
      <Card className="-mt-12 mb-6 gap-0 rounded-3xl border-0 p-4 shadow-card">
        <div className="grid grid-cols-3 divide-x divide-border text-center">
          <Stat icon={HeartPulse} value="72" unit="bpm" label="Nhịp tim" />
          <Stat icon={Activity} value="118/76" unit="" label="Huyết áp" />
          <Stat icon={Droplets} value="5.4" unit="mmol" label="Đường huyết" />
        </div>
      </Card>

      <h2 className="mb-3 text-sm font-bold">Dịch vụ</h2>
      <div className="mb-6 grid grid-cols-4 gap-2">
        {services.map((s) => (
          <Link
            key={s.label}
            to="/booking"
            className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 text-center shadow-card"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold leading-tight">{s.label}</span>
          </Link>
        ))}
      </div>

      <AiChatSheet
        trigger={
          <button className="mb-6 flex w-full items-center gap-3 rounded-3xl bg-accent p-4 text-left text-accent-foreground shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card text-primary">
              <Bot className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold">Trợ lý sức khỏe AI</span>
              <span className="block text-xs opacity-80">Sàng lọc triệu chứng trong 1 phút</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0" />
          </button>
        }
      />

      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <h2 className="truncate text-sm font-bold">Lịch hẹn sắp tới</h2>
        <Link to="/appointments" className="text-xs font-semibold text-primary">
          Xem tất cả
        </Link>
      </div>
      <Card className="gap-0 rounded-3xl border-0 p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary-soft text-primary">BS</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">BS. Nguyễn Minh Anh</p>
            <p className="truncate text-xs text-muted-foreground">Nội tổng quát · Phòng 204</p>
          </div>
          <span className="shrink-0 rounded-full bg-success-soft px-3 py-1 text-[11px] font-bold text-success">
            Đã xác nhận
          </span>
        </div>
        <p className="mt-3 rounded-2xl bg-secondary px-3 py-2 text-xs font-semibold">
          Thứ Năm, 20/08 · 09:30 - 10:00
        </p>
      </Card>

      <Button asChild className="mt-6 w-full" size="lg">
        <Link to="/booking">Đặt lịch khám mới</Link>
      </Button>
    </MobileShell>
  );
}

function Stat({
  icon: Icon,
  value,
  unit,
  label,
}: {
  icon: React.ElementType;
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="px-1">
      <Icon className="mx-auto h-4 w-4 text-primary" />
      <p className="mt-1 text-sm font-bold">
        {value}
        <span className="text-[10px] font-medium text-muted-foreground"> {unit}</span>
      </p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
