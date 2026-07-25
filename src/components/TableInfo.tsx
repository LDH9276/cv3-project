import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

interface ItemListProps {
  broadcastType: BroadcastType
  items: BroadcastItem[]
}

// 방송 목록 데이터를 간단한 제목 목록으로 표시합니다.
function ItemList({ broadcastType, items }: ItemListProps) {
  return (
    <section aria-label={broadcastType === 'live' ? '라이브 방송 목록' : '홈쇼핑 목록'}>
      <h2>{broadcastType === 'live' ? '라이브 방송' : '홈쇼핑 방송'}</h2>

      {items.length === 0 ? (
        <p>표시할 방송 데이터가 없습니다.</p>
      ) : (
        <ul>
          {items.slice(0, 10).map((item) => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ItemList
