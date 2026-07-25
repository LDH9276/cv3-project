import homeShoppingBroadcasts from './home-shopping-broadcasts.json'
import liveBroadcasts from './live-broadcasts.json'
import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

type LiveBroadcast = (typeof liveBroadcasts.list)[number]
type HomeShoppingBroadcast = (typeof homeShoppingBroadcasts.list)[number]

// 라이브 방송 원본의 카테고리 ID를 화면에 표시할 카테고리명으로 변환합니다.
const liveCategoryNames: Readonly<Record<number, string>> = {
  50000026: '식품',
  50000151: '디지털/가전',
  50000167: '패션의류',
  50000173: '패션잡화',
  50000190: '화장품/미용',
  50000205: '디지털/가전',
  50000212: '디지털/가전',
  50000213: '디지털/가전',
}

// null 값을 유지해 화면에서 잠김 상태를 별도로 렌더링할 수 있도록 숫자를 문자열로 변환합니다.
function formatNumber(value: number | null): string | null {
  return value === null ? null : value.toLocaleString('ko-KR')
}

// 카테고리 ID가 없거나 매핑되지 않은 경우에도 화면에 안전하게 표시할 값을 반환합니다.
function getLiveCategoryName(categoryId: number | null) {
  return categoryId === null
    ? '-'
    : (liveCategoryNames[categoryId] ?? String(categoryId))
}

interface BroadcastDateTime {
  date: string
  weekday: string
  time: string
}

// 10자리 또는 12자리 방송 일시를 날짜·요일·시간으로 분리해 한국어 표시 형식으로 변환합니다.
function formatBroadcastDateTime(value: string): BroadcastDateTime {
  if (!/^\d{10}(\d{2})?$/.test(value)) {
    return { date: value, weekday: '', time: '' }
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
    return { date: value, weekday: '', time: '' }
  }

  // 날짜와 시간 구성 요소를 항상 두 자리로 맞춥니다.
  const twoDigits = (number: number) =>
    number.toLocaleString('ko-KR', { minimumIntegerDigits: 2, useGrouping: false })
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' })

  return {
    date: `${twoDigits(year % 100)}.${twoDigits(month)}.${twoDigits(day)}`,
    weekday,
    time: `${twoDigits(hour)}:${twoDigits(minute)}`,
  }
}

// 라이브 방송 원본 데이터를 공통 BroadcastItem 형식으로 정규화합니다.
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
    category: getLiveCategoryName(item.cid),
    broadcastDate: broadcastDateTime.date,
    broadcastWeekday: broadcastDateTime.weekday,
    broadcastTime: broadcastDateTime.time,
    metricLabel: '조회수',
    metricValue: formatNumber(item.visit_cnt),
    sales: formatNumber(item.sales_cnt),
    revenue: formatNumber(item.sales_amt),
    productCount: formatNumber(item.product_cnt),
  }
}

// 홈쇼핑 방송 원본 데이터를 공통 BroadcastItem 형식으로 정규화합니다.
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
    broadcastWeekday: broadcastDateTime.weekday,
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
