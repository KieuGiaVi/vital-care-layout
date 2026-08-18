import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarPlus, Clock, MapPin } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/mobile-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Lịch hẹn khám — An Khởi" },
      {
        name: "description",
        content: "Theo dõi lịch hẹn khám sắp tới và lịch sử khám bệnh của bạn trong ứng dụng An Khởi.",
      },
      { property: "og:title", content: "Lịch hẹn khám — An Khởi" },
      {
        property: "og:description",
        content: "Quản lý lịch hẹn sắp tới, đổi giờ hoặc xem lại lịch sử khám bệnh.",
      },
    ],
  }),
  component: AppointmentsScreen,
});

const upcoming = [
  {
    doctor: "BS. Nguyễn Minh Anh",
    specialty: "Nội tổng quát",
    time: "Thứ Năm, 20/08 · 09:30",
    place: "Phòng 204 · Cơ sở Quận 1",
    status: "Đã xác nhận",
  },
  {
    doctor: "BS. Trần Quốc Bảo",
    specialty: "Da liễu · Tư vấn video",
    time: "Thứ Bảy, 22/08 · 15:00",
    place: "Trực tuyến",
    status: "Chờ thanh toán",
  },
];

const history = [
  {
    doctor: "BS. Lê Thu Hà",
    specialty: "Xét nghiệm máu",
    time: "12/08 · 14:20",
    place: "Cơ sở Quận 7",
    status: "Hoàn thành",
  },
  {
    doctor: "BS. Phạm Hoàng Nam",
    specialty: "Tai mũi họng",
    time: "02/08 · 19:00",
    place: "Trực tuyến",
    status: "Hoàn thành",
  },
];

function AppointmentsScreen() {
  return (
    <MobileShell
      header={
        <ScreenHeader
          title="Lịch hẹn"
          subtitle="Quản lý các buổi khám của bạn"
          right={
            <Button asChild size="icon" className="shrink-0 rounded-2xl">
              <Link to="/booking">
                <CalendarPlus className="h-5 w-5" />
              </Link>
            </Button>
          }
        />
      }
    >
      <Tabs defaultValue="upcoming">
        <TabsList className="w-full rounded-2xl">
          <TabsTrigger value="upcoming" className="rounded-xl">
            Sắp tới
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl">
            Đã khám
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcoming.map((a) => (
            <AppointmentCard key={a.doctor} {...a} />
          ))}
        </TabsContent>
        <TabsContent value="history" className="mt-4 space-y-3">
          {history.map((a) => (
            <AppointmentCard key={a.doctor} {...a} />
          ))}
        </TabsContent>
      </Tabs>
    </MobileShell>
  );
}

function AppointmentCard({
  doctor,
  specialty,
  time,
  place,
  status,
}: {
  doctor: string;
  specialty: string;
  time: string;
  place: string;
  status: string;
}) {
  const pending = status === "Chờ thanh toán";
  return (
    <Card className="gap-0 rounded-3xl border-0 p-4 shadow-card">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarFallback className="bg-primary-soft text-primary">BS</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{doctor}</p>
          <p className="truncate text-xs text-muted-foreground">{specialty}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[11px] font-bold",
            pending
              ? "bg-danger-soft text-danger"
              : status === "Hoàn thành"
                ? "bg-secondary text-secondary-foreground"
                : "bg-success-soft text-success",
          )}
        >
          {status}
        </span>
      </div>
      <div className="mt-3 grid gap-1.5 rounded-2xl bg-secondary px-3 py-2.5 text-xs font-semibold">
        <span className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary" /> {time}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> {place}
        </span>
      </div>
    </Card>
  );
}
