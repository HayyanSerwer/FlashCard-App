import { useState } from 'react'
import WindowShell from '../components/WindowShell'
import ReadComprehension from '../components/Reader'
import GenerateButton from '../components/Button'
import Select from '../components/Select'
import Flashcard from '../components/FlashCard'

const MOCK_TRANSLATIONS: Record<string, string> = {
  frühling: 'spring', fahrrad: 'bicycle', wetter: 'weather', sonnig: 'sunny',
  blumen: 'flowers', schule: 'school', park: 'park', tulpen: 'tulips',
  fluss: 'river', picknick: 'picnic', fußball: 'football / soccer',
  morgen: 'morning', freunden: 'friends', menschen: 'people', tage: 'days',
}

interface CardData { front: string; back: string }

function XpPanel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-white border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-gray-500 border-b-gray-500 p-2 flex flex-col gap-2">
      <div className="font-bold text-[12px] text-[#000080] border-b border-[#aca899] pb-1">{title}</div>
      {children}
    </div>
  )
}

export default function Study() {
  const [selectedWord, setSelectedWord]   = useState('')
  const [generatedCard, setGeneratedCard] = useState<CardData | null>(null)
  const [savedCards, setSavedCards]       = useState<CardData[]>([])
  const [generating, setGenerating]       = useState(false)
  const [activeTab, setActiveTab]         = useState<'read' | 'cards'>('read')
  const [justSaved, setJustSaved]         = useState(false)

  const handleSelect = (text: string) => {
    setSelectedWord(text)
    setGeneratedCard(null)
    setJustSaved(false)
  }

  const handleGenerate = async () => {
    if (!selectedWord) return
    setGenerating(true)
    setGeneratedCard(null)
    setJustSaved(false)
    await new Promise(r => setTimeout(r, 700))
    const key = selectedWord.toLowerCase()
    setGeneratedCard({ front: selectedWord, back: MOCK_TRANSLATIONS[key] ?? `[translation of "${selectedWord}"]` })
    setGenerating(false)
  }

  const handleSave = () => {
    if (!generatedCard) return
    setSavedCards(p => [...p, generatedCard])
    setGeneratedCard(null)
    setSelectedWord('')
    setJustSaved(true)
  }

  const tabs: [string, string][] = [
    ['read', '📄 Reading'],
    ['cards', `🃏 Flashcards${savedCards.length ? ` (${savedCards.length})` : ''}`],
  ]

  return (
    <WindowShell title="Study — FlashCard XP">
      <div className="flex gap-0.5 px-1 pt-1 border-b-2 border-[#aca899] bg-[#ece9d8]">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as 'read' | 'cards')}
            className={`px-4 py-1 text-[11px] border border-b-0 rounded-t-sm cursor-pointer font-['Tahoma',sans-serif]
              ${activeTab === id
                ? 'bg-[#ece9d8] text-black font-bold relative top-0.5 z-10 border-[#aca899]'
                : 'bg-[#d8d4c8] text-gray-500 border-[#aca899] hover:bg-[#e0dcd0]'}`}
          >{label}</button>
        ))}
      </div>

      {activeTab === 'read' && (
        <div className="grid grid-cols-[1fr_280px] gap-2 p-2 overflow-hidden" style={{ height: 'calc(100% - 34px)' }}>
          <div className="overflow-y-auto"><ReadComprehension /></div>

          <div className="overflow-y-auto flex flex-col gap-2">
            <XpPanel title="📝 Card Generator">
              <Select onSelect={handleSelect} />

              {selectedWord && (
                <div className="bg-[#eef4ff] border border-[#9ab0d0] px-2 py-1 text-[11px]">
                  Word: <strong>{selectedWord}</strong>
                </div>
              )}

              <GenerateButton
                label={generating ? '⏳ Generating…' : '⚡ Generate Card'}
                onClick={handleGenerate}
                disabled={!selectedWord || generating}
                variant="primary"
              />

              {justSaved && (
                <div className="bg-[#dfffdf] border border-[#00a000] text-[#006000] px-2 py-1 text-[11px]">
                  ✅ Card saved to deck!
                </div>
              )}

              {generatedCard && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gray-400 italic">Preview — click to flip</span>
                  <Flashcard front={generatedCard.front} back={generatedCard.back} />
                  <div className="flex gap-2">
                    <GenerateButton label="💾 Save" onClick={handleSave} variant="primary" />
                    <GenerateButton label="🗑️ Discard" onClick={() => setGeneratedCard(null)} />
                  </div>
                </div>
              )}
            </XpPanel>
          </div>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="flex flex-col items-center p-4 overflow-auto" style={{ height: 'calc(100% - 34px)' }}>
          {savedCards.length === 0 ? (
            <div className="flex flex-col items-center gap-3 mt-12 text-gray-500">
              <span className="text-5xl">🃏</span>
              <p className="text-[11px] text-center max-w-xs">
                No cards yet! Go to the Reading tab, highlight a German word, then generate a card.
              </p>
            </div>
          ) : (
            <CardStudySession cards={savedCards} />
          )}
        </div>
      )}
    </WindowShell>
  )
}

function CardStudySession({ cards }: { cards: CardData[] }) {
  const [index, setIndex]     = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong]     = useState(0)
  const [done, setDone]       = useState(false)

  const answer = (isCorrect: boolean) => {
    if (isCorrect) setCorrect(c => c + 1); else setWrong(w => w + 1)
    if (index + 1 >= cards.length) setDone(true); else setIndex(i => i + 1)
  }

  if (done) return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <span className="text-5xl">🎉</span>
      <h2 className="text-lg font-bold text-[#000080]">Session Complete!</h2>
      <div className="flex gap-4">
        <div className="px-5 py-2 font-bold bg-[#dfffdf] text-[#006000] border-2 border-t-white border-l-white border-r-[#006000] border-b-[#006000]">✅ {correct} Correct</div>
        <div className="px-5 py-2 font-bold bg-[#ffdfd8] text-[#800000] border-2 border-t-white border-l-white border-r-[#800000] border-b-[#800000]">❌ {wrong} Wrong</div>
      </div>
      <button
        onClick={() => { setIndex(0); setCorrect(0); setWrong(0); setDone(false) }}
        className="px-4 py-1 text-[11px] cursor-pointer bg-gradient-to-b from-[#d6e8ff] to-[#a8ccff]
                   border-2 border-t-white border-l-white border-r-[#0054e3] border-b-[#0054e3] hover:from-[#e0f0ff]"
      > Study Again</button>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="w-full text-[11px] text-gray-500 flex flex-col gap-1">
        <span>Card {index + 1} of {cards.length}</span>
        <div className="h-2.5 bg-[#d0d0d0] border border-t-gray-500 border-l-gray-500 border-r-[#dfdfdf] border-b-[#dfdfdf]">
          <div
            className="h-full bg-gradient-to-b from-[#5cb8e0] to-[#0054e3] transition-all duration-300"
            style={{ width: `${(index / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <Flashcard front={cards[index].front} back={cards[index].back} />

      <div className="flex gap-5">
        <button onClick={() => answer(false)}
          className="px-5 py-1.5 font-bold text-[13px] bg-[#ffdfd8] text-[#800000] cursor-pointer
                     border-2 border-t-white border-l-white border-r-[#800000] border-b-[#800000] hover:brightness-105">
          Missed it
        </button>
        <button onClick={() => answer(true)}
          className="px-5 py-1.5 font-bold text-[13px] bg-[#dfffdf] text-[#006000] cursor-pointer
                     border-2 border-t-white border-l-white border-r-[#006000] border-b-[#006000] hover:brightness-105">
           Got it!
        </button>
      </div>
    </div>
  )
}