import {
  HamburgerSvg,
  MarketsIconSvg,
  ThunderBoltSvg,
  WalletSvg,
} from "./svgs";

export const BOTTOM_TABS: {
  name: string;
  value: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Markets",
    value: "Markets",
    icon: <MarketsIconSvg />,
  },
  {
    name: "Trade",
    value: "Trade",
    icon: <ThunderBoltSvg />,
  },
  {
    name: "Wallet",
    value: "Wallet",
    icon: <WalletSvg />,
  },
  {
    name: "More",
    value: "More",
    icon: <HamburgerSvg />,
  },
];
