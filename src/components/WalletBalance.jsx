import { useState } from 'react'
import ResultItem from './ResultItem'

const MULTIPLIER_CONTRIBUTION = 1.5
const MULTIPLIER_PURCHASE = 2.5

function calc(wallet) {
  return {
    contribution: Math.round(wallet * MULTIPLIER_CONTRIBUTION),
    purchase: Math.round(wallet * MULTIPLIER_PURCHASE),
  }
}

function WalletBalance() {
  const [wallet, setWallet] = useState('')
  const [shake, setShake] = useState(false)

  const walletNum = Number(wallet) || 0
  const { contribution, purchase } = calc(walletNum)

  return (
    <section className="calc-section wallet-mode">
      <h2 className="calc-title">คำนวณจากข้อมูลกระเป๋าเงินคงเหลือ (ต่อวัน)</h2>
      <p className="calc-desc">รัฐสนับสนุนเงิน 60% ผู้รับสิทธิจ่ายเอง 40%</p>

      <div className="input-group">
        <label className="input-label">กระเป๋าเงินคงเหลือ (ต่อวัน)</label>
        <div className={`input-wrapper ${shake ? 'shake' : ''}`}>
          <input
            className="input-field"
            type="number"
            inputMode="numeric"
            value={wallet}
            onChange={(e) => {
              const val = e.target.value
              if (val === '') return setWallet('')
              if (Number(val) > 133) {
                setShake(true)
                setTimeout(() => setShake(false), 300)
                return
              }
              setWallet(val)
            }}
            placeholder="0"
          />
          <span className="input-suffix">บาท</span>
        </div>
      </div>

      {walletNum > 0 && (
        <div className="results">
          <ResultItem label="ได้รับเงินสมทบจากรัฐ" value={contribution} />
          <ResultItem label="ซื้อสินค้าได้" value={purchase} />
        </div>
      )}
    </section>
  )
}

export default WalletBalance
