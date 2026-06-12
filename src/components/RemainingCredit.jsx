import { useState } from 'react'
import ResultItem from './ResultItem'
import { useToast } from './Toast'

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
  const [shake, setShake] = useState(false)
  const showToast = useToast()

  const creditNum = Number(credit) || 0
  const targetNum = Number(target) || 0
  const { topup, purchase } = calc(creditNum)
  const extra = targetNum > purchase ? targetNum - purchase : 0

  return (
    <section className="calc-section credit-mode">
      <h2 className="calc-title">คำนวณจากข้อมูลสิทธิคงเหลือ (ต่อวัน)</h2>
      <p className="calc-desc">รัฐสนับสนุนเงิน 60% ผู้รับสิทธิจ่ายเอง 40%</p>

      <div className="input-group">
        <label className="input-label">สิทธิ์คงเหลือ (ต่อวัน)</label>
        <div className={`input-wrapper ${shake ? 'shake' : ''}`}>
          <input
            className="input-field"
            type="number"
            inputMode="numeric"
            value={credit}
            onChange={(e) => {
              const val = e.target.value
              if (val === '') return setCredit('')
              if (Number(val) > 200) {
                setShake(true)
                showToast('สิทธิ์คงเหลือสูงสุดไม่เกิน 200 บาท (ต่อวัน)')
                setTimeout(() => setShake(false), 300)
                return
              }
              setCredit(val)
            }}
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
            <ResultItem label="ต้องจ่ายเพิ่มเอง" value={extra} />
          )}
        </div>
      )}
    </section>
  )
}

export default RemainingCredit
