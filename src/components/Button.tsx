interface ButtonProps {
  label?: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'primary'
}

function GenerateButton({ label = 'Generate', onClick, disabled, variant = 'default' }: ButtonProps) {
  const base = `min-w-[75px] px-3 py-0.5 font-['Tahoma',sans-serif] text-[11px] cursor-pointer border-2
    active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white
    active:pt-[3px] active:pl-[9px]`

  const variants = {
    default: 'bg-gradient-to-b from-[#f8f8f8] to-[#dcdcdc] border-t-white border-l-white border-r-gray-500 border-b-gray-500 text-black hover:from-white hover:to-[#e8e8e8]',
    primary: 'bg-gradient-to-b from-[#d6e8ff] to-[#a8ccff] border-t-white border-l-white border-r-[#0054e3] border-b-[#0054e3] text-black hover:from-[#e0f0ff] hover:to-[#b8d8ff]',
  }

  const disabledStyle = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabledStyle}`}
    >
      {label}
    </button>
  )
}

export default GenerateButton