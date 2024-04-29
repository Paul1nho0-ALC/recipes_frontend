import { GetRecipes } from '../api/RecipesAPI'
import { Recipe } from './Recipe'
import { useQuery } from '@tanstack/react-query'
import { SearchForm } from './ui/SearchForm'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

export function Recipes() {
  // Filter
  const [searchParams] = useSearchParams()
  const filter = searchParams.get('name')?.toLowerCase()

  // Query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['recipes', filter],
    queryFn: () => GetRecipes(filter),
  })

  useEffect(() => {
    refetch()
  }, [filter, refetch])

  let hasRecipes = false

  // Checking if there is recipes
  if (data !== undefined) {
    hasRecipes = data.length > 0
  }

  return (
    <div className="mt-8 w-full">
      <SearchForm isLoading={isLoading} />

      {isLoading ? (
        <p className="font-normal text-3xl text-slate-700 text-center mt-12">
          Carregando...
        </p>
      ) : hasRecipes ? (
        <div className="grid p-4 gap-8 mt-11 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center w-full">
          {data?.map((recipe) => (
            <Recipe
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
            />
          ))}
        </div>
      ) : (
        <p className="font-extrabold text-slate-800 text-4xl text-center uppercase bottom-24 mt-24">
          {filter
            ? 'Não encontrei receitas com este nome :('
            : 'Não há receitas disponíveis, por favor crie uma nova receita!'}
        </p>
      )}
    </div>
  )
}
