import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenerateButton from './components/Button'
import ReadComprehension from './components/Reader'
import Select from './components/Select'


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <div className='flex justify-center'>
      <ReadComprehension></ReadComprehension> 
      </div>
      <div className='flex justify-center'>
      <GenerateButton></GenerateButton>
      <Select></Select>
      </div>
    </>
  )
}

export default App
