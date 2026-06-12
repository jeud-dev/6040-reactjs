import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ToastContext = createContext(null)

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)

  const showToast = useCallback((msg) => {
    setMessage(msg)
  }, [])

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(null), 3000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <div className="toast">
          <span>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}
