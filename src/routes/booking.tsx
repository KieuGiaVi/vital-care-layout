import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  Stethoscope,
  Syringe,
  TestTube,
  Timer,
  Video,
  Wallet,
} from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Đặt lịch khám 4 bước — An Khởi" },
      {
        name: "description",
        content:
          "Chọn dịch vụ, bác sĩ, giờ khám và thanh toán trong 4 bước. Giữ chỗ khung giờ trong 5 phút.",
      },
      { property: "og:title", content: "Đặt lịch khám 4 bước — An Khởi" },
      {
        property: "og:description",
        content: "Đặt lịch khám nhanh với bộ lọc bác sĩ và giữ chỗ khung giờ 5 phút.",
      },
    ],
  }),
  component: BookingScreen,
});

const steps = ["Dịch vụ", "Bác sĩ", "Giờ khám", "Thanh toán"];

const services = [
  { name: "Khám nội tổng quát", price: 350000, desc: "Tư vấn 30 phút tại phòng khám", icon: Stethoscope },
  { name: "Xét nghiệm máu", price: 480000, desc: "Kết quả sau 4 giờ", icon: TestTube },
  { name: "Tư vấn video", price: 250000, desc: "Gọi video 20 phút với bác sĩ", icon: Video },
  { name: "Tiêm chủng", price: 620000, desc: "Vắc-xin cúm mùa", icon: Syringe },
];

const doctors = [
  { name: "BS. Nguyễn Minh Anh", gender: "female", years: 12, specialty: "Nội tổng quát", rating: 4.9 },
  { name: "BS. Trần Quốc Bảo", gender: "male", years: 8, specialty: "Nội tổng quát", rating: 4.7 },
  { name: "BS. Lê Thu Hà", gender: "female", years: 5, specialty: "Nội tiết", rating: 4.8 },
  { name: "BS. Phạm Hoàng Nam", gender: "male", years: 16, specialty: "Tim mạch", rating: 5.0 },
];

const slots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "13:30", "14:00", "14:30"];
const unavailable = ["09:00", "13:30"];

const vnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

function BookingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [gender, setGender] = useState<"all" | "male" | "female">("all");
  const [experience, setExperience] = useState<"all" | "5" | "10">("all");
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    if (step !== 3) return;
    setSeconds(300);
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  const selectedService = services.find((s) => s.name === service);
  const canContinue = [!!service, !!doctor, !!slot, true][step];

  const filteredDoctors = doctors.filter(
    (d) =>
      (gender === "all" || d.gender === gender) &&
      (experience === "all" || d.years >= Number(experience)),
  );

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <MobileShell
      hideNav
      header={
        <div className="border-b border-border bg-card px-5 py-4">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => (step === 0 ? navigate({ to: "/" }) : setStep(step - 1))}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Bước {step + 1}/4</p>
              <h1 className="truncate text-base font-bold">{steps[step]}</h1>
            </div>
          </div>

          <ol className="mt-4 flex items-center">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                    i < step
                      ? "bg-success text-success-foreground"
                      : i === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={cn(
                      "mx-1 h-0.5 flex-1 rounded-full",
                      i < step ? "bg-success" : "bg-border",
                    )}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      }
    >
      {step === 0 && (
        <div className="space-y-3">
          {services.map((s) => (
            <button
              key={s.name}
              onClick={() => setService(s.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-3xl bg-card p-4 text-left shadow-card ring-2 transition-all",
                service === s.name ? "ring-primary" : "ring-transparent",
              )}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{s.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{s.desc}</span>
              </span>
              <span className="shrink-0 text-sm font-bold text-primary">{vnd(s.price)}</span>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="mb-4 space-y-2">
            <FilterRow
              label="Giới tính"
              options={[
                { v: "all", l: "Tất cả" },
                { v: "female", l: "Nữ" },
                { v: "male", l: "Nam" },
              ]}
              value={gender}
              onChange={(v) => setGender(v as typeof gender)}
            />
            <FilterRow
              label="Kinh nghiệm"
              options={[
                { v: "all", l: "Tất cả" },
                { v: "5", l: "5+ năm" },
                { v: "10", l: "10+ năm" },
              ]}
              value={experience}
              onChange={(v) => setExperience(v as typeof experience)}
            />
          </div>
          <div className="space-y-3">
            {filteredDoctors.map((d) => (
              <button
                key={d.name}
                onClick={() => setDoctor(d.name)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-3xl bg-card p-4 text-left shadow-card ring-2 transition-all",
                  doctor === d.name ? "ring-primary" : "ring-transparent",
                )}
              >
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-primary-soft text-primary">BS</AvatarFallback>
                </Avatar>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{d.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {d.specialty} · {d.years} năm KN
                  </span>
                </span>
                <Badge variant="secondary" className="shrink-0 rounded-full font-bold">
                  ★ {d.rating}
                </Badge>
              </button>
            ))}
            {filteredDoctors.length === 0 && (
              <p className="rounded-3xl bg-card p-6 text-center text-sm text-muted-foreground shadow-card">
                Không có bác sĩ phù hợp bộ lọc.
              </p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {["T4 19/08", "T5 20/08", "T6 21/08", "T7 22/08"].map((d, i) => (
              <span
                key={d}
                className={cn(
                  "shrink-0 rounded-2xl px-4 py-2 text-xs font-bold",
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-card shadow-card",
                )}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((t) => {
              const off = unavailable.includes(t);
              return (
                <button
                  key={t}
                  disabled={off}
                  onClick={() => setSlot(t)}
                  className={cn(
                    "rounded-2xl py-3 text-sm font-bold shadow-card transition-colors",
                    off && "bg-muted text-muted-foreground/50 line-through shadow-none",
                    !off && slot === t && "bg-primary text-primary-foreground",
                    !off && slot !== t && "bg-card",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-xs text-muted-foreground">
            Khung giờ sẽ được giữ trong 5 phút sau khi bạn chuyển sang bước thanh toán.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-3xl border-2 border-danger/30 bg-danger-soft p-4 text-danger">
            <Timer className="h-6 w-6 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">Giữ chỗ khung giờ</p>
              <p className="truncate text-xs opacity-80">Hoàn tất thanh toán trước khi hết hạn</p>
            </div>
            <p className="shrink-0 text-2xl font-black tabular-nums">{clock}</p>
          </div>

          <Card className="gap-0 rounded-3xl border-0 p-4 shadow-card">
            <h2 className="text-sm font-bold">Chi tiết lịch hẹn</h2>
            <div className="mt-3 space-y-2 text-sm">
              <Row label="Dịch vụ" value={service ?? "-"} />
              <Row label="Bác sĩ" value={doctor ?? "-"} />
              <Row label="Thời gian" value={slot ? `Thứ Năm, 20/08 · ${slot}` : "-"} />
            </div>
            <Separator className="my-3" />
            <div className="space-y-2 text-sm">
              <Row label="Phí dịch vụ" value={vnd(selectedService?.price ?? 0)} />
              <Row label="Phí đặt lịch" value={vnd(20000)} />
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <span className="text-sm font-bold">Tổng cộng</span>
              <span className="text-lg font-black text-primary">
                {vnd((selectedService?.price ?? 0) + 20000)}
              </span>
            </div>
          </Card>

          <Card className="gap-0 rounded-3xl border-0 p-4 shadow-card">
            <h2 className="text-sm font-bold">Phương thức thanh toán</h2>
            <div className="mt-3 space-y-2">
              <PayOption icon={Wallet} title="Ví An Khởi" sub="Số dư 2.170.000₫" selected />
              <PayOption icon={CreditCard} title="Thẻ ngân hàng" sub="Visa · Mastercard" />
            </div>
          </Card>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(step - 1)}>
            Quay lại
          </Button>
        )}
        {step < 3 ? (
          <Button
            size="lg"
            className="flex-1"
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
          >
            Tiếp tục
          </Button>
        ) : (
          <Button asChild size="lg" className="flex-1" disabled={seconds === 0}>
            <Link to="/appointments">
              <Lock className="h-4 w-4" /> Thanh toán
            </Link>
          </Button>
        )}
      </div>
    </MobileShell>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { v: string; l: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
      <span className="shrink-0 text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="flex gap-2 overflow-x-auto">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
              value === o.v ? "bg-primary text-primary-foreground" : "bg-card shadow-card",
            )}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="truncate text-right text-sm font-semibold">{value}</span>
    </div>
  );
}

function PayOption({
  icon: Icon,
  title,
  sub,
  selected,
}: {
  icon: React.ElementType;
  title: string;
  sub: string;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl p-3 ring-2",
        selected ? "bg-primary-soft ring-primary" : "bg-secondary ring-transparent",
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      {selected && <Check className="h-4 w-4 shrink-0 text-primary" />}
    </div>
  );
}
