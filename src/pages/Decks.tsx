import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WindowShell from '../components/WindowShell'
import GenerateButton from '../components/Button'

const INITIAL_DECKS = [
  { id: 1, name: 'German – Spring Story', cards: 8,  due: 3, icon: '🇩🇪' },
  { id: 2, name: 'German – Numbers',      cards: 20, due: 5, icon: '🔢' },
  { id: 3, name: 'German – Animals',      cards: 15, due: 0, icon: '🐾' },
]

export default function Decks() {
  const navigate = useNavigate()
  const [decks, setDecks]       = useState(INITIAL_DECKS)
  const [selected, setSelected] = useState<number | null>(null)
  const [showNew, setShowNew]   = useState(false)
  const [newName, setNewName]   = useState('')

  const handleCreate = () => {
    if (!newName.trim()) return
    setDecks(d => [...d, { id: Date.now(), name: newName.trim(), cards: 0, due: 0, icon: '📚' }])
    setNewName('')
    setShowNew(false)
  }

  const handleDelete = () => {
    if (selected === null) return
    setDecks(d => d.filter(dk => dk.id !== selected))
    setSelected(null)
  }

  return (
    <WindowShell title="My Decks — FlashCard XP">
      <div className="flex flex-col h-full">

        <div className="flex items-center gap-1 px-2 py-1 border-b border-[#aca899] bg-[#ece9d8]">
          <GenerateButton label="➕ New Deck"      onClick={() => setShowNew(true)} variant="primary" />
          <GenerateButton label="🗑️ Delete"         onClick={handleDelete}          disabled={selected === null} />
          <div className="w-px h-5 bg-gray-500 border-r border-white mx-1" />
          <GenerateButton label="📖 Study Selected" onClick={() => navigate('/study')} disabled={selected === null} />
        </div>

        <div className="flex-1 overflow-auto mx-2 my-1.5 bg-white
                        border-2 border-t-gray-500 border-l-gray-500 border-r-[#dfdfdf] border-b-[#dfdfdf]">
          <div className="grid grid-cols-[32px_1fr_64px_64px] sticky top-0
                          bg-gradient-to-b from-[#e8e4d8] to-[#ccc8bc] border-b border-gray-500
                          text-[11px] font-bold px-1 py-0.5">
            <span />
            <span>Name</span>
            <span className="text-center">Cards</span>
            <span className="text-center">Due</span>
          </div>

          {decks.map(deck => (
            <div
              key={deck.id}
              onClick={() => setSelected(deck.id)}
              onDoubleClick={() => navigate('/study')}
              className={`grid grid-cols-[32px_1fr_64px_64px] px-1 py-1 text-[12px] cursor-pointer
                          border-b border-[#f0ece0]
                          ${selected === deck.id ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f0ff]'}`}
            >
              <span className="text-center">{deck.icon}</span>
              <span className="truncate">{deck.name}</span>
              <span className="text-center text-[11px]">{deck.cards}</span>
              <span className={`text-center text-[11px] font-bold
                ${deck.due > 0 ? (selected === deck.id ? 'text-red-300' : 'text-red-600') : ''}`}>
                {deck.due || '—'}
              </span>
            </div>
          ))}
        </div>

        <div className="px-2 py-0.5 text-[10px] text-gray-500 border-t border-[#aca899] bg-[#ece9d8]">
          {selected !== null
            ? `"${decks.find(d => d.id === selected)?.name}" selected — double-click to study`
            : `${decks.length} deck(s) — click to select, double-click to study`}
        </div>
      </div>

      {showNew && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#ece9d8] border-[3px] border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-gray-600 border-b-gray-600 min-w-[280px]">
            <div className="h-7 flex items-center justify-between px-2
                            bg-gradient-to-b from-[#0058e6] via-[#3c8cf5] to-[#0058e6] rounded-t-sm">
              <span className="text-white text-[12px] font-bold">➕ New Deck</span>
              <button
                onClick={() => setShowNew(false)}
                className="w-5 h-5 text-[10px] font-bold text-white flex items-center justify-center rounded-sm
                           bg-gradient-to-b from-[#e6473a] to-[#c0392b]
                           border border-t-red-300 border-l-red-300 border-r-red-900 border-b-red-900 cursor-pointer"
              >✕</button>
            </div>
            <div className="p-3 flex flex-col gap-3">
              <label className="text-[11px]">Deck Name:</label>
              <input
                className="px-1 py-0.5 text-[11px] font-['Tahoma',sans-serif] w-full
                           border-2 border-t-gray-500 border-l-gray-500 border-r-[#dfdfdf] border-b-[#dfdfdf] bg-white"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                autoFocus
                placeholder="e.g. German Vocabulary"
              />
              <div className="flex justify-end gap-2 pt-1 border-t border-[#aca899]">
                <GenerateButton label="OK" onClick={handleCreate} variant="primary" />
                <GenerateButton label="Cancel" onClick={() => setShowNew(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </WindowShell>
  )
}