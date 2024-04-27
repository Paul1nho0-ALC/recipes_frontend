import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { useEffect } from 'react'
import { DeleteRecipe, GetRecipeById } from '../api/RecipesAPI'
import { useQuery } from '@tanstack/react-query'
export function RecipePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('id') === null) {
      navigate('/')
    }
  }, [searchParams, navigate])

  const id = searchParams.get('id')

  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => GetRecipeById(id),
  })

  async function handleDeleteRecipe() {
    DeleteRecipe(id).then(() => (location.href = '/'))
  }

  return (
    <>
      <Header />
      {!isLoading &&
        (data ? (
          <main className="w-screen h-full break-words">
            <div className="w-full p-8 md:px-16 md:py-32 bg-slate-200">
              <h1 className="text-slate-800 font-bold text-4xl md:text-6xl">
                {data?.title}
              </h1>
            </div>
            <div className="flex md:flex-row flex-col w-full gap-8 p-8 md:p-16">
              <div className="bg-blue-100 p-8 max-w-4xl rounded-lg">
                <h2 className="text-slate-600 text-2xl font-bold mb-2">
                  Descrição/Modo de preparo:
                </h2>
                <p className="text-slate-900 text-lg">{data?.description}</p>
              </div>
              <div className="flex flex-col bg-blue-100 p-8 rounded-lg flex-1">
                <h2 className="text-slate-600 text-2xl font-bold mb-2">
                  ingredientes:
                </h2>
                {data?.ingredients.map((ingredient: string) => (
                  <span
                    key={ingredient.concat(Math.random().toString())}
                    className="text-slate-800 font-medium text-lg"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-16">
              <button
                className="text-white font-bold text-lg bg-red-400 px-4 py-2 
                rounded-md hover:bg-red-500 transition-colors ease-in"
                onClick={handleDeleteRecipe}
              >
                Excluir Receita
              </button>
            </div>
          </main>
        ) : (
          <div className="w-full flex flex-col items-center py-16 gap-4">
            <h1 className="text-8xl font-bold text-slate-700">Erro 404</h1>
            <Link
              className="text-white font-bold px-6 py-2 bg-blue-400 rounded-lg"
              to={'/'}
            >
              Voltar a Home
            </Link>
          </div>
        ))}
    </>
  )
}
