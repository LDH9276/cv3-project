import homeShoppingBroadcasts from './home-shopping-broadcasts.json'
import liveBroadcasts from './live-broadcasts.json'
import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

type LiveBroadcast = (typeof liveBroadcasts.list)[number]
type HomeShoppingBroadcast = (typeof homeShoppingBroadcasts.list)[number]

function formatNumber(value: number | null) {
  return value?.toLocaleString('ko-KR') ?? '-'
}

function normalizeLiveBroadcast(
  item: LiveBroadcast,
  index: number,
): BroadcastItem {
  return {
    id: item.objectID,
    rank: index + 1,
    title: item.title,
    category: String(item.cid),
    broadcastTime: item.datetime_start,
    metricLabel: '조회수',
    metricValue: formatNumber(item.visit_cnt),
    sales: formatNumber(item.sales_cnt),
    revenue: formatNumber(item.sales_amt),
    productCount: formatNumber(item.product_cnt),
  }
}

function normalizeHomeShoppingBroadcast(
  item: HomeShoppingBroadcast,
  index: number,
): BroadcastItem {
  return {
    id: item.hsshow_id,
    rank: index + 1,
    title: item.hsshow_title,
    category: item.cat?.cat_name ?? String(item.cid ?? '-'),
    broadcastTime: `${item.hsshow_datetime_start} ~ ${item.hsshow_datetime_end}`,
    metricLabel: '조회수',
    metricValue: formatNumber(item.visit_cnt),
    sales: formatNumber(item.sales_cnt),
    revenue: formatNumber(item.sales_amt),
    productCount: formatNumber(item.item_cnt),
  }
}

export const broadcastsByType: Record<BroadcastType, BroadcastItem[]> = {
  live: liveBroadcasts.list.map(normalizeLiveBroadcast),
  homeShopping: homeShoppingBroadcasts.list.map(normalizeHomeShoppingBroadcast),
}
