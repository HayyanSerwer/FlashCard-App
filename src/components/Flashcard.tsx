import { useState } from 'react'

interface FlashcardProps {
  front: string
  back: string
}

function Flashcard({ front, back }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="flashcard-scene w-full h-40 cursor-pointer"
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`flashcard-card ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flex-col gap-2 bg-white
                        border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-gray-500 border-b-gray-500">
          <span className="text-[10px] text-gray-400">🇩🇪 German</span>
          <span className="text-2xl font-bold text-[#000080] font-['Times_New_Roman',serif]">{front}</span>
          <span className="text-[10px] text-gray-300">click to reveal →</span>
        </div>

        <div className="flashcard-face flashcard-back flex-col gap-2 bg-[#e8f0ff]
                        border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-gray-500 border-b-gray-500">
          <span className="text-[10px] text-gray-400">🇬🇧 English</span>
          <span className="text-2xl font-bold text-[#004000] font-['Times_New_Roman',serif]">{back}</span>
          <span className="text-[10px] text-gray-300">← click to flip back</span>
        </div>
      </div>
    </div>
  )
}

export default Flashcard