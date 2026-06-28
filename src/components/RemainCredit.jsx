import { useState } from 'react'
import ResultItem from './ResultItem'
import { useToast } from './Toast'

const MULTIPLIER_TOPUP = 0.67
const MULTIPLIER_PURCHASE = 1.67

const PERIODS = [
  { key: 'day', label: 'ต่อวัน', max: 200 },
  { key: 'month', label: 'ต่อเดือน', max: 1000 },
]

function calc(credit) {
  return {
    topup: Math.round(credit * MULTIPLIER_TOPUP),
    purchase: Math.round(credit * MULTIPLIER_PURCHASE),
  }
}

function RemainCredit() {
  const [credit, setCredit] = useState('')
  const [target, setTarget] = useState('')
  const [period, setPeriod] = useState(PERIODS[0])
  const [shake, setShake] = useState(false)
  const showToast = useToast()

  const creditNum = Number(credit) || 0
  const targetNum = Number(target) || 0
  const { topup, purchase } = calc(creditNum)
  const extra = targetNum > purchase ? targetNum - purchase : 0

  return (
    <section className="calc-section credit-mode">
      <h2 className="calc-title">คำนวณจากสิทธิคงเหลือ</h2>
      <p className="calc-desc">รัฐสนับสนุนเงิน 60% ผู้รับสิทธิจ่ายเอง 40%</p>

      <div className="period-toggle">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            className={`period-btn ${period.key === p.key ? 'active' : ''}`}
            onClick={() => {
              setPeriod(p)
              setCredit('')
              setTarget('')
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="input-group">
        <label className="input-label">สิทธิคงเหลือ</label>
        <div className={`input-wrapper ${shake ? 'shake' : ''}`}>
          <input
            className="input-field"
            type="number"
            inputMode="numeric"
            value={credit}
            onChange={(e) => {
              const val = e.target.value
              if (val === '') return setCredit('')
              if (Number(val) > period.max) {
                setShake(true)
                showToast(`สิทธิคงเหลือสูงสุดไม่เกิน ${period.max} บาท (${period.label})`)
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
          <ResultItem label="เติมเงิน" value={topup} />
          <ResultItem label="มูลค่าซื้อสินค้า" value={purchase} />

          <div className="input-group" style={{ marginTop: 12 }}>
            <label className="input-label">ต้องการซื้อสินค้า 🛒 บาท</label>
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

export default RemainCredit
