import homeShoppingBroadcasts from './home-shopping-broadcasts.json'
import liveBroadcasts from './live-broadcasts.json'
import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

type LiveBroadcast = (typeof liveBroadcasts.list)[number]
type HomeShoppingBroadcast = (typeof homeShoppingBroadcasts.list)[number]

function formatNumber(value: number | null): string | null {
  // null을 문자열로 치환하지 않아 UI가 잠김 상태를 별도 요소로 렌더링할 수 있습니다.
  return value === null ? null : value.toLocaleString('ko-KR')
}

interface BroadcastDateTime {
  date: string
  time: string
}

function formatBroadcastDateTime(value: string): BroadcastDateTime {
  if (!/^\d{10}(\d{2})?$/.test(value)) {
    return { date: value, time: '' }
  }

  const yearLength = value.length === 12 ? 4 : 2
  const year =
    yearLength === 4 ? Number(value.slice(0, 4)) : 2000 + Number(value.slice(0, 2))
  const month = Number(value.slice(yearLength, yearLength + 2))
  const day = Number(value.slice(yearLength + 2, yearLength + 4))
  const hour = Number(value.slice(yearLength + 4, yearLength + 6))
  const minute = Number(value.slice(yearLength + 6, yearLength + 8))
  const date = new Date(year, month - 1, day, hour, minute)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    return { date: value, time: '' }
  }

  const twoDigits = (number: number) =>
    number.toLocaleString('ko-KR', { minimumIntegerDigits: 2, useGrouping: false })
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' })

  return {
    date: `${twoDigits(year % 100)}.${twoDigits(month)}.${twoDigits(day)} (${weekday})`,
    time: `${twoDigits(hour)}:${twoDigits(minute)}`,
  }
}

function normalizeLiveBroadcast(
  item: LiveBroadcast,
  index: number,
): BroadcastItem {
  const broadcastDateTime = formatBroadcastDateTime(item.datetime_start)

  return {
    id: item.objectID,
    rank: index + 1,
    platformName: item.platform_id,
    title: item.title,
    category: String(item.cid),
    broadcastDate: broadcastDateTime.date,
    broadcastTime: broadcastDateTime.time,
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
  const broadcastDateTime = formatBroadcastDateTime(item.hsshow_datetime_start)

  return {
    id: item.hsshow_id,
    rank: index + 1,
    platformName: item.platform_name,
    title: item.hsshow_title,
    category: item.cat?.cat_name ?? String(item.cid ?? '-'),
    broadcastDate: broadcastDateTime.date,
    broadcastTime: broadcastDateTime.time,
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
