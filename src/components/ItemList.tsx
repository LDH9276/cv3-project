import { useId, useState } from 'react'
import type { BroadcastItem, BroadcastType } from '@/types/broadcast'

interface ItemListProps {
  broadcastType: BroadcastType
  items: BroadcastItem[]
}

interface DataValueProps {
  value: string | null
}

// 데이터 값이 null일 때 잠김 안내를 표시하고 로그인 안내 박스의 열림 상태를 관리합니다.
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
            로그인
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

// 선택된 방송 유형의 목록을 최대 10개까지 화면에 표시합니다.
function ItemList({ broadcastType, items }: ItemListProps) {

  return (
    <section aria-label={broadcastType === 'live' ? '라이브 방송 목록' : '홈쇼핑 목록'}>
      {items.length === 0 ? (
        <p>표시할 방송 데이터가 없습니다.</p>
      ) : (
        <ul className='data-label'>
          {broadcastType === 'live' ?
            <li className='data-legend'>
              <span>방송정보</span>
              <span>분류</span>
              <span>방송시간</span>
              <span>조회수</span>
              <span>판매량</span>
              <span>매출액</span>
              <span>상품수</span>
            </li> :
            <li className='data-legend'>
              <span>방송정보</span>
              <span>분류</span>
              <span>방송시간</span>
              <span>시청률</span>
              <span>판매량</span>
              <span>매출액</span>
              <span>상품수</span>
            </li>
          }

          {items.slice(0, 10).map((item) => (
            <li key={item.id}>
              <div className='title-wrap'>
                <p className="item-rank">{item.rank}</p>
                <div className="item-title-wrap">
                  <p className='item-title'>{item.title}</p>
                  <p className='item-platform'>{item.platformName}</p>
                </div>
              </div>
              <span>{item.category}</span>
              <div className='broadcast-datetime'>
                <div className="broadcast-date">
                  <span>{item.broadcastDate}</span>
                  <span>({item.broadcastWeekday})</span>
                </div>
                <span>{item.broadcastTime}</span>
              </div>
              <DataValue value={item.metricValue} />
              <DataValue value={item.sales} />
              <DataValue value={item.revenue} />
              <DataValue value={item.productCount} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ItemList
