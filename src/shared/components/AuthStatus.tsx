import { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client'
import type { Session, User } from '@supabase/supabase-js'

export default function AuthStatus() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получаем текущую сессию при монтировании
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Подписываемся на изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github', // или 'google', 'discord' и т.д.
      options: {
        redirectTo: window.location.origin + '/profile',
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) return <div className="text-center py-4">Загрузка...</div>

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      {session ? (
        <div className="space-y-3">
          <p>
            Привет,{' '}
            <span className="font-medium">
              {session.user.email || session.user.user_metadata?.name}
            </span>
          </p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Выйти
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">Не авторизован</p>
          <button
            onClick={handleSignIn}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Войти через GitHub
          </button>
        </div>
      )}
    </div>
  )
}