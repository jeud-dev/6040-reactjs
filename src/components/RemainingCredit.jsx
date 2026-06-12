import { useState } from 'react'
import ResultItem from './ResultItem'

const MULTIPLIER_TOPUP = 0.67
const MULTIPLIER_PURCHASE = 1.67

function calc(credit) {
  return {
    topup: Math.round(credit * MULTIPLIER_TOPUP),
    purchase: Math.round(credit * MULTIPLIER_PURCHASE),
  }
}

function RemainingCredit() {
  const [credit, setCredit] = useState('')
  const [target, setTarget] = useState('')

  const creditNum = Number(credit) || 0
  const targetNum = Number(target) || 0
  const { topup, purchase } = calc(creditNum)
  const extra = targetNum > purchase ? targetNum - purchase : 0

  return (
    <section className="calc-section credit-mode">
      <h2 className="calc-title">สิทธิคงเหลือ 💰 บาท</h2>
      <p className="calc-desc">รัฐสนับสนุนเงิน 60% ผู้รับสิทธิจ่ายเอง 40%</p>

      <div className="input-group">
        <label className="input-label">สิทธิ์คงเหลือ</label>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="number"
            inputMode="numeric"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            placeholder="0"
          />
          <span className="input-suffix">บาท</span>
        </div>
      </div>

      {creditNum > 0 && (
        <div className="results">
          <ResultItem label="ต้องเติมเงิน" value={topup} />
          <ResultItem label="ซื้อสินค้าได้" value={purchase} />

          <div className="input-group" style={{ marginTop: 12 }}>
            <label className="input-label">ต้องการซื้อ 🛒 บาท</label>
            <div className="input-wrapper">
              <input
                className="input-field"
                type="number"
                inputMode="numeric"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="0"
              />
              <span className="input-suffix">บาท</span>
            </div>
          </div>

          {targetNum > 0 && (
            <ResultItem label="ต้องเพิ่มจ่ายเอง" value={extra} />
          )}
        </div>
      )}
    </section>
  )
}

export default RemainingCredit
