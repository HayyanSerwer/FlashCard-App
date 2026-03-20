import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Study from './pages/Study'
import Decks from './pages/Decks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study" element={<Study />} />
        <Route path="/decks" element={<Decks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App