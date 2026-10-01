import { useCallback, useState } from 'react'
import './App.css'
import { useHouseTheme } from './theme/useHouseTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import LoadingScreen from './components/LoadingScreen'
import MagicField from './components/MagicField'
import Finale from './components/Finale'

function App() {
  const { house, setHouse } = useHouseTheme()
  const [loading, setLoading] = useState(true)
  const finishLoading = useCallback(() => setLoading(false), [])

  return (
    <>
      {loading && <LoadingScreen onComplete={finishLoading} />}
      <MagicField />
      <Navbar />
      <main>
        <Hero />
        <Section1 house={house} setHouse={setHouse} />
        <Section2 house={house} setHouse={setHouse} />
        <Finale house={house} />
      </main>
    </>
  )
}

export default App
