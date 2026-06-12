const EMOJI_MAP = {
  'เติมเงิน': '💳',
  'ซื้อสินค้า': '🛍️',
  'เงินสมทบ': '🏛️',
  'จ่ายเอง': '💸',
}

const formatters = {
  baht: (v) => `${v.toLocaleString(undefined, { maximumFractionDigits: 0 })} บาท`,
}

function ResultItem({ label, value }) {
  const emoji = Object.keys(EMOJI_MAP).find((k) => label.includes(k))

  return (
    <div className="result-item">
      <span className="result-label">{emoji ? `${EMOJI_MAP[emoji]} ${label}` : label}</span>
      <span className="result-value">{formatters.baht(value)}</span>
    </div>
  )
}

export default ResultItem
