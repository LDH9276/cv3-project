import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

interface ItemListProps {
  broadcastType: BroadcastType
  items: BroadcastItem[]
}

function ItemList({ broadcastType, items }: ItemListProps) {
  return (
    <section aria-label={broadcastType === 'live' ? '라이브 방송 목록' : '홈쇼핑 목록'}>
      <h2>{broadcastType === 'live' ? '라이브 방송' : '홈쇼핑 방송'}</h2>

      {items.length === 0 ? (
        <p>표시할 방송 데이터가 없습니다.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.rank}. {item.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ItemList
