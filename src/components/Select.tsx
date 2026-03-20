import { useState } from 'react'

interface SelectProps {
  onSelect?: (text: string) => void
}

function Select({ onSelect }: SelectProps) {
  const [selectedText, setSelectedText] = useState('')

  const handleClick = () => {
    const selection = window.getSelection()
    const text = selection ? selection.toString().trim() : ''
    if (text) {
      setSelectedText(text)
      onSelect?.(text)
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={handleClick}
        type="button"
        className="min-w-[75px] px-3 py-0.5 font-['Tahoma',sans-serif] text-[11px] cursor-pointer border-2
          bg-gradient-to-b from-[#f8f8f8] to-[#dcdcdc]
          border-t-white border-l-white border-r-gray-500 border-b-gray-500
          hover:from-white hover:to-[#e8e8e8]
          active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white"
      >
        ✂️ Select Word
      </button>

      {selectedText && (
        <div className="flex items-center gap-1 bg-[#ffffe0] border border-[#c8c800] px-2 py-0.5 text-[11px]">
          <span className="text-gray-500">Selected:</span>
          <span className="font-bold text-[#000080]">"{selectedText}"</span>
        </div>
      )}
    </div>
  )
}

export default Select