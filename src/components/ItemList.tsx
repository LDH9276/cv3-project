import { useId, useState } from 'react'
import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

interface ItemListProps {
  broadcastType: BroadcastType
  items: BroadcastItem[]
}

interface DataValueProps {
  value: string | null
}

function DataValue({ value }: DataValueProps) {
  const [isHintOpen, setIsHintOpen] = useState(false)
  const hintId = useId()

  return (
    <div className='data-value'>
      {value === null ? (
        <div className='locked-control'>
          <button
            aria-controls={hintId}
            aria-expanded={isHintOpen}
            className='locked-value'
            onClick={() => setIsHintOpen((current) => !current)}
            type='button'
          >
            잠김
          </button>
          {isHintOpen && (
            <div aria-live='polite' className='locked-hint' id={hintId}>
              데이터 확인을 위해 로그인해주세요.
            </div>
          )}
        </div>
      ) : (
        <div>{value}</div>
      )}
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
          {broadcastType === 'live' ?
            <li>
              <p>&nbsp;</p>
              <div className='title-wrap'>
                <span>제목</span>
              </div>
            </li>

            :
            <li>
              <p>&nbsp;</p>
              <div className='title-wrap'>
                <span>제목</span>
              </div>
            </li>
          }


          {items.slice(0, 10).map((item) => (
            <li key={item.id}>
              <p>{item.rank}</p>
              <div className="title-wrap">
                <p className='item-title'>{item.title}</p>
                <p className='item-platform'>{item.platformName}</p>
              </div>
              <p>{item.broadcastTime}</p>
              <DataValue value={item.metricValue} />
              <DataValue value={item.sales} />
              <DataValue value={item.revenue} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ItemList
