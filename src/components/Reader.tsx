import { useRef } from 'react'

interface ReadComprehensionProps {
  text?: string
  title?: string
}

const DEFAULT_TEXT = `Im Frühling fahren viele Menschen gern mit dem Fahrrad. Das Wetter ist oft sonnig, die Blumen beginnen zu blühen, und die Tage werden länger. Anna fährt jeden Morgen mit dem Rad zur Schule. Sie braucht ungefähr 15 Minuten. Auf dem Weg sieht sie einen kleinen Park mit vielen bunten Tulpen. Am Nachmittag fährt sie oft mit ihren Freunden zum Fluss. Dort machen sie ein Picknick und spielen Fußball.`

function ReadComprehension({ text, title = 'Reading Passage' }: ReadComprehensionProps) {
  const divRef = useRef<HTMLDivElement>(null)

  function handleDrag(e: React.DragEvent) {
    if (!divRef.current) return
    e.dataTransfer.setDragImage(divRef.current, 0, 0)
  }

  return (
    <div
      ref={divRef}
      draggable
      onDragStart={handleDrag}
      className="bg-[#c0c0c0] border-[3px] border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#606060] border-b-[#606060] cursor-grab w-full"
    >
      <div className="flex items-center justify-between px-2 py-1
                      bg-gradient-to-r from-[#000080] to-[#1084d0] text-white text-[11px] font-bold">
        <span>📄 {title}</span>
        <div className="flex gap-1">
          <button className="w-4 h-4 text-[9px] font-bold flex items-center justify-center bg-[#c0c0c0] text-black
                             border border-t-white border-l-white border-r-gray-600 border-b-gray-600">_</button>
          <button className="w-4 h-4 text-[9px] font-bold flex items-center justify-center bg-[#c0c0c0] text-black
                             border border-t-white border-l-white border-r-gray-600 border-b-gray-600">□</button>
        </div>
      </div>

      <div className="m-1 p-2 bg-white border-2 border-t-gray-500 border-l-gray-500 border-r-[#dfdfdf] border-b-[#dfdfdf]">
        <p className="text-[13px] leading-relaxed text-black font-['Times_New_Roman',serif] select-text cursor-text">
          {text || DEFAULT_TEXT}
        </p>
      </div>
    </div>
  )
}

export default ReadComprehension