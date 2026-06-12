import { useState } from 'react'
import './App.css'
import RemainingCredit from './components/RemainingCredit'
import WalletBalance from './components/WalletBalance'
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

      <main>{tab === 'credit' ? <RemainingCredit /> : <WalletBalance />}</main>

      <BottomNav active={tab} onSelect={setTab} />
    </>
  )
}

export default App
