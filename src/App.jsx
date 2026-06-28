import { useState } from 'react'
import './App.css'
import RemainCredit from './components/RemainCredit'
import RemainWallet from './components/RemainWallet'
import BottomNav from './components/BottomNav'

function App() {
  const [tab, setTab] = useState('credit')

  return (
    <>
      <header className="hero">
        <h1 className="hero-title">ไทยช่วยไทย พลัส</h1>
        <p className="hero-sub">✨ 60/40 · จ่ายครึ่ง ประหยัดเต็ม</p>
        <p className="hero-period">📅 1 มิ.ย. – 30 ก.ย. 2569</p>
      </header>

      <main>{tab === 'credit' ? <RemainCredit /> : <RemainWallet />}</main>

      <BottomNav active={tab} onSelect={setTab} />
    </>
  )
}

export default App
