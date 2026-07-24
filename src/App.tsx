import { useState } from 'react'
import ItemList from '@/components/ItemList'
import { broadcastsByType } from '@/data/broadcasts'
import type { BroadcastType } from '@/types/broadcast'

function App() {
  const [broadcastType, setBroadcastType] =
    useState<BroadcastType>('live')

  return (
    <main>
      <h1>CV3 기술과제</h1>

      <div aria-label="방송 유형" role="tablist">
        <button
          aria-selected={broadcastType === 'live'}
          onClick={() => setBroadcastType('live')}
          role="tab"
          type="button"
        >
          라이브 방송
        </button>
        <button
          aria-selected={broadcastType === 'homeShopping'}
          onClick={() => setBroadcastType('homeShopping')}
          role="tab"
          type="button"
        >
          홈쇼핑
        </button>
      </div>

      <ItemList
        broadcastType={broadcastType}
        items={broadcastsByType[broadcastType]}
      />
    </main>
  )
}

export default App
