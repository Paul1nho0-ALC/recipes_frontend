import { GetRecipes } from '../api/RecipesAPI'
import { Recipe } from './Recipe'
import { useQuery } from '@tanstack/react-query'
import { SearchForm } from './ui/SearchForm'
import { useSearchParams } from 'react-router-dom'

export function Recipes() {
  // Filter
  const [searchParams] = useSearchParams()
  const filter = searchParams.get('name')
  let hasRecipes = false

  // Query
  const { data, isLoading } = useQuery({
    queryKey: ['recipes', filter],
    queryFn: () => GetRecipes(filter),
  })

  const filteredRecipes = filter
    ? data?.filter((recipe) => recipe.title.includes(filter))
    : data

  // Checking if there is recipes
  if (filteredRecipes !== undefined) {
    hasRecipes = filteredRecipes.length > 0
  }

  return (
    <div className="mt-8 w-full">
      <SearchForm isLoading={isLoading} />

      {isLoading ? (
        <p className="font-normal text-3xl text-slate-700 text-center mt-12">
          Carregando...
        </p>
      ) : hasRecipes ? (
        <div className="grid p-8 gap-8 mt-11 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center w-full">
          {filteredRecipes?.map((recipe) => (
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
