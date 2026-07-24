export type BroadcastType = "live" | "homeShopping";

export interface BroadcastItem {
  id: string;
  rank: number;
  title: string;
  category: string;
  broadcastTime: string;
  metricLabel: "조회수" | "시청률";
  metricValue: string;
  sales: string;
  revenue: string;
  productCount: string;
}
