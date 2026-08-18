import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  FileText,
  HeartPulse,
  LogOut,
  Plus,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/mobile-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Hồ sơ bệnh nhân — An Khởi" },
      {
        name: "description",
        content: "Quản lý hồ sơ bệnh nhân, dị ứng thuốc và thông tin sức khỏe cá nhân trên An Khởi.",
      },
      { property: "og:title", content: "Hồ sơ bệnh nhân — An Khởi" },
      {
        property: "og:description",
        content: "Cập nhật thông tin cá nhân và danh sách dị ứng để bác sĩ kê đơn an toàn hơn.",
      },
    ],
  }),
  component: ProfileScreen,
});

const allergyOptions = [
  "Penicillin",
  "Aspirin",
  "Ibuprofen",
  "Hải sản",
  "Đậu phộng",
  "Phấn hoa",
  "Sulfa",
  "Latex",
  "Trứng",
  "Sữa bò",
];

function ProfileScreen() {
  const [allergies, setAllergies] = useState<string[]>(["Penicillin", "Hải sản"]);

  const toggle = (item: string) =>
    setAllergies((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );

  return (
    <MobileShell header={<ScreenHeader title="Cá nhân" subtitle="Hồ sơ bệnh nhân" />}>
      <Card className="gap-0 rounded-3xl border-0 p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-base font-bold">
              KV
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">Kiều Gia Vĩ</p>
            <p className="truncate text-xs text-muted-foreground">
              Nam · 28 tuổi · Nhóm máu O+
            </p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-bold text-success">
              <ShieldCheck className="h-3 w-3" /> Đã xác thực CCCD
            </p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </Card>

      <Card className="mt-4 gap-0 rounded-3xl border-0 p-4 shadow-card">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <h2 className="flex min-w-0 items-center gap-2 text-sm font-bold">
            <HeartPulse className="h-4 w-4 shrink-0 text-danger" />
            <span className="truncate">Dị ứng</span>
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="secondary" className="shrink-0 rounded-full">
                <Plus className="h-4 w-4" /> Thêm
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 rounded-2xl p-3">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                Chọn dị ứng (nhiều lựa chọn)
              </p>
              <div className="flex flex-wrap gap-2">
                {allergyOptions.map((option) => {
                  const active = allergies.includes(option);
                  return (
                    <button key={option} onClick={() => toggle(option)}>
                      <Badge
                        variant={active ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                          !active && "text-muted-foreground",
                        )}
                      >
                        {active && <Check className="h-3 w-3" />}
                        {option}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {allergies.length === 0 && (
            <p className="text-xs text-muted-foreground">Chưa có dị ứng nào được ghi nhận.</p>
          )}
          {allergies.map((a) => (
            <Badge
              key={a}
              className="gap-1 rounded-full bg-danger-soft px-3 py-1 text-xs font-bold text-danger hover:bg-danger-soft"
            >
              {a}
              <button aria-label={`Xoá ${a}`} onClick={() => toggle(a)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <p className="mt-3 rounded-2xl bg-secondary px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          Thông tin dị ứng được chia sẻ với bác sĩ để kê đơn an toàn.
        </p>
      </Card>

      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-3xl bg-card shadow-card">
        {[
          { label: "Hồ sơ bệnh án", icon: FileText },
          { label: "Bảo hiểm y tế", icon: ShieldCheck },
          { label: "Cài đặt & bảo mật", icon: Settings },
        ].map((row) => (
          <li key={row.label}>
            <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <row.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{row.label}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>

      <Button variant="ghost" className="mt-4 w-full text-danger hover:text-danger">
        <LogOut className="h-4 w-4" /> Đăng xuất
      </Button>
    </MobileShell>
  );
}
