import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 500)
  }, [navigate])

  return <div className="flex min-h-screen items-center justify-center">Authenticating...</div>
}