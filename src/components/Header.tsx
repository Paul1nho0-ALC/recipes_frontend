import { Album } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  isHome?: boolean
}

export function Header({ isHome = false }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:gap-0 gap-6 sm:items-center justify-between px-8 py-4 w-full bg-blue-300">
      <a href="/" className="flex items-center gap-x-8 ">
        <Album className="text-white h-full" size={48} />

        <h1 className="font-daruma text-white text-4xl h-full -translate-y-1 uppercase">
          receitas
        </h1>
      </a>

      {isHome && (
        <Link
          to="create"
          className="font-bold bg-slate-50 hover:bg-slate-100 
      hover:underline py-2 px-4 rounded-md text-blue-400 transition-colors ease-linear cursor-pointer"
        >
          Criar Receita
        </Link>
      )}
    </header>
  )
}
