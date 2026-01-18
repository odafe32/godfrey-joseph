import { useState } from 'react'
import { Topbar } from './ui'
import HeroSection from './ui/Home/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Topbar/>
      <HeroSection/>
    </>
  )
}

export default App
