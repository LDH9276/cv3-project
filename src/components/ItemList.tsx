import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

interface ItemListProps {
  broadcastType: BroadcastType
  items: BroadcastItem[]
}

interface DataValueProps {
  label: string
  value: string | null
}

function DataValue({ label, value }: DataValueProps) {
  return (
    <div className='data-value'>
      <span>{label}</span>
      {value === null ?
        <div className='locked-value'>
          잠김
          <div className="locked-hint">
            데이터 확인을 위해 로그인해주세요.
          </div>
        </div> :
        <div>{value}</div>}
    </div>
  )
}

function ItemList({ broadcastType, items }: ItemListProps) {

  return (
    <section aria-label={broadcastType === 'live' ? '라이브 방송 목록' : '홈쇼핑 목록'}>
      <h2>{broadcastType === 'live' ? '라이브 방송' : '홈쇼핑 방송'}</h2>

      {items.length === 0 ? (
        <p>표시할 방송 데이터가 없습니다.</p>
      ) : (
        <ul className='data-label'>
          {items.slice(0, 10).map((item) => (
            <li key={item.id}>
              <p>{item.rank}</p>
              <div className="title-wrap">
                <p className='item-title'>{item.title}</p>
                <p className='item-platform'>{item.platformName}</p>
              </div>
              <p>방송 시간: {item.broadcastTime}</p>
              <DataValue label={item.metricLabel} value={item.metricValue} />
              <DataValue label='판매량' value={item.sales} />
              <DataValue label='매출' value={item.revenue} />
              <DataValue label='상품 수' value={item.productCount} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ItemList
