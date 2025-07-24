import StockHeader from "@/components/trade/stock-header";
import TakeTrade from "@/components/trade/take-trade";
import TradeDetails from "@/components/trade/trade-details";

export default function Home() {
  return (
    <main className="pt-8 py-16 px-6 overflow-y-scroll">
      <StockHeader />
      <TakeTrade />
      <TradeDetails />
    </main>
  );
}
