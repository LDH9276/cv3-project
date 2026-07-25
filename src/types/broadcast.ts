export type BroadcastType = 'live' | 'homeShopping'

export interface BroadcastItem {
  id: string
  rank: number
  platformName: string
  title: string
  category: string
  broadcastTime: string
  metricLabel: '조회수' | '시청률'
  // 원본 데이터의 null을 유지해 화면에서 잠김 상태로 표시합니다.
  metricValue: string | null
  sales: string | null
  revenue: string | null
  productCount: string | null
}

export interface LiveRawItem {
  objectID: string
  platform_id: string
  platform_name: string
  datetime_start: string
  product_cnt: number
  visit_cnt: number | null
  sales_cnt: number | null
  sales_amt: number | null
  title: string
  cid: number | null
  ad_channel?: string[]
}

export interface HomeShoppingRawItem {
  hsshow_id: string
  platform_id: string
  platform_name: string
  hsshow_title: string
  hsshow_datetime_start: string
  hsshow_datetime_end: string
  hsshow_url_live: string | null
  item_cnt: number
  cid: number | null
  sales_cnt: number | null
  sales_amt: number | null
  visit_cnt: number | null

  cat?: {
    cid: number
    cat_name: string
  }
}

export interface RawResponse<T> {
  list: T[]
  mask: boolean
}
