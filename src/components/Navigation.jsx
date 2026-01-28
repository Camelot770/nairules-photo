import { NavLink } from 'react-router-dom'
import { Home, Image, Calendar, User } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Главная', icon: Home },
  { path: '/portfolio', label: 'Портфолио', icon: Image },
  { path: '/booking', label: 'Запись', icon: Calendar },
  { path: '/about', label: 'Обо мне', icon: User },
]

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100/50 safe-area-bottom z-40">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-4 transition-all duration-200 ${
                isActive ? 'text-black' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="mb-1"
                />
                <span className={`text-[10px] ${isActive ? 'font-medium' : ''}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
