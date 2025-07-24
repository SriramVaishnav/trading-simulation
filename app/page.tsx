import TakeTrade from "@/components/trade/take-trade";
import TradeDetails from "@/components/trade/trade-details";
import { BarChartSvg } from "@/lib/svgs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-8 py-16 px-6 overflow-y-scroll">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Image
            src="/images/csk-logo.png"
            width={48}
            height={48}
            alt="csk-logo"
          />
          <div>
            <h1 className="text-lg font-bold">Chennai Super Kings</h1>
            <p className="text-sm text-gray-500">$65.2M Vol.</p>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="text-right">
            <p className="text-lg font-bold">34¢</p>
            <p className="text-green-600 text-sm">+0.84%</p>
          </div>
          <BarChartSvg />
        </div>
      </div>
      <TakeTrade />
      <TradeDetails />
    </main>
  );
}
