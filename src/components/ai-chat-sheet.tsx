import { useState } from "react";
import { Bot, Send, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const messages = [
  { from: "bot", text: "Xin chào! Mình là trợ lý AI của An Khởi. Bạn đang cảm thấy thế nào?" },
  { from: "user", text: "Mình bị đau đầu và hơi sốt từ tối qua." },
  {
    from: "bot",
    text: "Mình ghi nhận triệu chứng đau đầu kèm sốt. Bạn nên theo dõi nhiệt độ mỗi 4 giờ và uống nhiều nước. Nếu sốt trên 39°C, hãy đặt lịch khám nội tổng quát ngay.",
  },
];

export function AiChatSheet({ trigger }: { trigger: React.ReactNode }) {
  const [agreed, setAgreed] = useState(false);
  const [started, setStarted] = useState(false);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setStarted(false);
          setAgreed(false);
        }
      }}
    >
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="mx-auto h-[85vh] max-w-[430px] rounded-t-3xl p-0 [&>button]:top-5"
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="flex items-center gap-2 text-base">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Bot className="h-5 w-5" />
            </span>
            Trợ lý sức khỏe AI
          </SheetTitle>
          <SheetDescription className="text-xs">
            Hỗ trợ sàng lọc triệu chứng — không thay thế chẩn đoán y khoa
          </SheetDescription>
        </SheetHeader>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.from === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-border px-5 py-3">
              <Input placeholder="Mô tả triệu chứng của bạn..." disabled={!started} />
              <Button size="icon" className="shrink-0" disabled={!started}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!started && (
            <div className="absolute inset-0 flex items-end bg-foreground/40 px-4 pb-6 backdrop-blur-sm">
              <div className="w-full rounded-3xl bg-card p-5 shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-danger-soft text-danger">
                  <ShieldAlert className="h-5 w-5" />
                </span>
                <h2 className="mt-3 text-base font-bold">Tuyên bố miễn trừ y khoa</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Trợ lý AI chỉ cung cấp thông tin tham khảo và không đưa ra chẩn đoán, đơn thuốc
                  hay điều trị. Trong trường hợp cấp cứu, hãy gọi 115 hoặc đến cơ sở y tế gần nhất.
                </p>
                <label className="mt-4 flex items-start gap-3 rounded-2xl bg-secondary p-3 text-sm font-medium">
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                    className="mt-0.5"
                  />
                  Tôi đồng ý với các điều khoản trên
                </label>
                <Button
                  className="mt-4 w-full"
                  size="lg"
                  disabled={!agreed}
                  onClick={() => setStarted(true)}
                >
                  Bắt đầu trò chuyện
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
