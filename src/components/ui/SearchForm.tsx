import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const searchRecipesSchema = z.object({
  name: z.string(),
})

interface SearchFormProps {
  isLoading: boolean
}

export function SearchForm(props: SearchFormProps) {
  type SearchRecipesSchema = z.infer<typeof searchRecipesSchema>
  const { register, handleSubmit } = useForm<SearchRecipesSchema>({
    resolver: zodResolver(searchRecipesSchema),
  })

  const { isLoading } = props
  const [_, setSearchParams] = useSearchParams()

  const handleSearchRecipes = ({ name }: SearchRecipesSchema) => {
    setSearchParams((state) => {
      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }
      return state
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchRecipes)}
      className="px-4 flex-col md:px-10 md:flex-row flex gap-8"
    >
      <input
        disabled={isLoading}
        type="search"
        placeholder="Pesquisar receita"
        className="h-8 drop-shadow rounded-md px-2 border border-slate-200 outline-none"
        {...register('name')}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="h-8 drop-shadow bg-blue-300 px-8 text-bold text-slate-50 rounded-md hover:underline
         hover:bg-blue-400 transition-colors ease-linear disabled:bg-blue-100 disabled:cursor-default"
      >
        Pesquisar
      </button>
    </form>
  )
}
