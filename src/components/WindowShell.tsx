import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface WindowShellProps {
  children: React.ReactNode
  title: string
}

export default function WindowShell({ children, title }: WindowShellProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [time] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

  return (
    <div className="w-screen h-screen relative overflow-hidden font-['Tahoma',sans-serif] text-[11px] select-none">

      <div className="absolute inset-0 bg-gradient-to-b from-[#236bcd] via-[#5cb8ff] to-[#87ceeb]" />
      <div className="absolute bottom-10 left-[-10%] right-[-10%] h-44 bg-gradient-to-t from-[#2e7d32] to-[#4caf50] rounded-[100%]" />

      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <DesktopIcon label="Home"      icon="🏠" onClick={() => navigate('/')}      active={location.pathname === '/'} />
        <DesktopIcon label="Study"     icon="📖" onClick={() => navigate('/study')} active={location.pathname === '/study'} />
        <DesktopIcon label="My Decks"  icon="🗂️" onClick={() => navigate('/decks')} active={location.pathname === '/decks'} />
      </div>

      <div className="absolute top-5 left-24 right-5 bottom-14 flex flex-col rounded-t-lg overflow-hidden z-10
                      border-[3px] border-t-[#0054e3] border-l-[#0054e3] border-r-[#00318a] border-b-[#00318a]
                      shadow-[2px_2px_12px_rgba(0,0,0,0.5)] bg-[#ece9d8]">

        <div className="h-8 shrink-0 flex items-center justify-between px-2 rounded-t-md
                        bg-gradient-to-b from-[#0058e6] via-[#3c8cf5] to-[#0058e6]">
          <div className="flex items-center gap-1 text-white text-[12px] font-bold [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
            <span>🧠</span><span>{title}</span>
          </div>
          <div className="flex gap-[3px]">
            <TitleBarBtn label="_" />
            <TitleBarBtn label="□" />
            <TitleBarBtn label="✕" isClose onClick={() => navigate('/')} />
          </div>
        </div>

        <div className="h-6 shrink-0 flex items-center border-b border-[#aca899] bg-[#ece9d8]">
          {['File','Edit','View','Help'].map(m => (
            <span key={m} className="px-3 py-0.5 cursor-pointer hover:bg-[#316ac5] hover:text-white">{m}</span>
          ))}
        </div>

        <div className="flex-1 overflow-auto">{children}</div>

        <div className="h-6 shrink-0 flex items-center justify-between px-2 text-[10px] text-gray-500
                        border-t border-[#aca899] bg-[#ece9d8]">
          <span>Ready</span><span>FlashCard XP v1.0</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center gap-1 px-1 z-20
                      bg-gradient-to-b from-[#245fbd] to-[#1a4fa0] border-t-2 border-[#5090d0]">
        <button
          onClick={() => navigate('/')}
          className="h-8 px-3 flex items-center gap-1 rounded-xl font-bold text-[13px] text-white
                     bg-gradient-to-b from-[#5fb642] to-[#3d9a22] border border-[#1e7800]
                     shadow-md hover:brightness-110 cursor-pointer"
        >🪟 Start</button>

        <div className="flex-1 flex gap-1 overflow-hidden">
          <div className="h-7 px-3 flex items-center gap-1 text-white bg-gradient-to-b from-[#1a3060] to-[#2355a0] border border-[#3060a0] truncate max-w-[220px]">
            🧠 {title}
          </div>
        </div>

        <div className="flex items-center gap-2 h-8 px-3 text-white border border-[#5090d0]
                        bg-gradient-to-b from-[#1a4fa0] to-[#2d70d6]">
          <span>🔊</span><span>🌐</span><span className="text-[11px]">{time}</span>
        </div>
      </div>
    </div>
  )
}

function DesktopIcon({ label, icon, onClick, active }: { label: string; icon: string; onClick: () => void; active: boolean }) {
  return (
    <div
      onDoubleClick={onClick}
      className={`flex flex-col items-center w-[72px] p-1 rounded gap-1 cursor-pointer
        ${active ? 'bg-blue-700/50 outline outline-dotted outline-1 outline-white' : 'hover:bg-white/20'}`}
    >
      <span className="text-3xl [filter:drop-shadow(1px_2px_2px_rgba(0,0,0,0.4))]">{icon}</span>
      <span className="text-[11px] text-white text-center leading-tight break-words
                       [text-shadow:1px_1px_2px_black,-1px_-1px_2px_black]">{label}</span>
    </div>
  )
}

function TitleBarBtn({ label, onClick, isClose }: { label: string; onClick?: () => void; isClose?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-sm border cursor-pointer
        hover:brightness-110 active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white
        ${isClose
          ? 'text-white bg-gradient-to-b from-[#e6473a] to-[#c0392b] border-t-red-300 border-l-red-300 border-r-red-900 border-b-red-900'
          : 'text-black bg-gradient-to-b from-[#e6e6e6] to-[#c0c0c0] border-t-white border-l-white border-r-gray-500 border-b-gray-500'
        }`}
    >{label}</button>
  )
}