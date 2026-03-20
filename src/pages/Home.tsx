import { useNavigate } from 'react-router-dom'
import WindowShell from '../components/WindowShell'

export default function Home() {
  const navigate = useNavigate()

  return (
    <WindowShell title="FlashCard XP — Welcome">
      <div className="flex items-center justify-center h-full p-6">
        <div className="flex flex-col items-center gap-4 p-6 bg-white w-full max-w-md
                        border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-gray-500 border-b-gray-500">

          <span className="text-5xl">🧠</span>
          <h1 className="text-xl font-bold text-[#000080] font-['Tahoma',sans-serif]">FlashCard XP</h1>
          <p className="text-[11px] text-gray-500 text-center">Your Windows XP-style language learning companion</p>

          <div className="flex gap-3 w-full">
            {[
              { icon: '📖', title: 'Study Now', sub: 'Practice your flashcards', path: '/study' },
              { icon: '🗂️', title: 'My Decks',  sub: 'Manage your card decks',   path: '/decks' },
            ].map(btn => (
              <button
                key={btn.path}
                onClick={() => navigate(btn.path)}
                className="flex-1 flex items-center gap-3 p-3 text-left cursor-pointer
                           bg-gradient-to-b from-[#f8f8f8] to-[#dcdcdc]
                           border-2 border-t-white border-l-white border-r-gray-500 border-b-gray-500
                           hover:from-[#d6e8ff] hover:to-[#a8ccff]
                           active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white"
              >
                <span className="text-3xl">{btn.icon}</span>
                <div>
                  <div className="text-[12px] font-bold text-[#000080]">{btn.title}</div>
                  <div className="text-[10px] text-gray-500">{btn.sub}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full">
            {[['12','Cards Due'],['3','Decks'],['87%','Accuracy']].map(([num, label]) => (
              <div key={label} className="flex-1 text-center p-2 bg-[#eef4ff]
                                          border border-t-gray-500 border-l-gray-500 border-r-[#dfdfdf] border-b-[#dfdfdf]">
                <div className="text-xl font-bold text-[#000080]">{num}</div>
                <div className="text-[10px] text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowShell>
  )
}