import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Eye, Plus, Wallet as WalletIcon } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/mobile-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Ví An Khởi — Số dư & giao dịch" },
      {
        name: "description",
        content: "Xem số dư ví An Khởi, nạp tiền, rút tiền và theo dõi lịch sử giao dịch khám bệnh.",
      },
      { property: "og:title", content: "Ví An Khởi — Số dư & giao dịch" },
      {
        property: "og:description",
        content: "Nạp tiền, rút tiền và theo dõi lịch sử giao dịch trong ví sức khỏe An Khởi.",
      },
    ],
  }),
  component: WalletScreen,
});

const transactions = [
  { title: "Nạp tiền qua VietQR", time: "18/08 · 08:12", amount: 1500000, type: "in" },
  { title: "Khám nội tổng quát", time: "16/08 · 09:45", amount: -350000, type: "out" },
  { title: "Xét nghiệm máu tổng quát", time: "12/08 · 14:20", amount: -480000, type: "out" },
  { title: "Hoàn tiền huỷ lịch hẹn", time: "10/08 · 11:05", amount: 350000, type: "in" },
  { title: "Nạp tiền qua thẻ ngân hàng", time: "04/08 · 20:31", amount: 800000, type: "in" },
  { title: "Tư vấn video da liễu", time: "02/08 · 19:00", amount: -250000, type: "out" },
];

const vnd = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.abs(n)) + "₫";

function WalletScreen() {
  return (
    <MobileShell header={<ScreenHeader title="Ví của tôi" subtitle="Thanh toán không tiền mặt" />}>
      <Card className="gap-0 overflow-hidden rounded-3xl border-0 bg-primary p-5 text-primary-foreground shadow-lift">
        <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
          <WalletIcon className="h-4 w-4" />
          Số dư hiện tại
          <Eye className="ml-auto h-4 w-4" />
        </div>
        <p className="mt-2 text-3xl font-black tracking-tight">2.170.000₫</p>
        <p className="mt-1 text-xs text-primary-foreground/75">Ví An Khởi · **** 4821</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button size="lg" variant="secondary" className="rounded-2xl font-bold">
            <Plus className="h-4 w-4" /> Nạp tiền
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-primary-foreground/40 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
          >
            <ArrowUpRight className="h-4 w-4" /> Rút tiền
          </Button>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <h2 className="truncate text-sm font-bold">Lịch sử giao dịch</h2>
        <button className="text-xs font-semibold text-primary">Bộ lọc</button>
      </div>

      <ul className="mt-3 divide-y divide-border overflow-hidden rounded-3xl bg-card shadow-card">
        {transactions.map((t) => (
          <li key={t.title + t.time} className="flex items-center gap-3 px-4 py-3.5">
            <span
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                t.type === "in" ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
              )}
            >
              {t.type === "in" ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t.title}</p>
              <p className="truncate text-xs text-muted-foreground">{t.time}</p>
            </div>
            <p
              className={cn(
                "shrink-0 text-sm font-bold",
                t.type === "in" ? "text-success" : "text-danger",
              )}
            >
              {t.type === "in" ? "+" : "-"}
              {vnd(t.amount)}
            </p>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
