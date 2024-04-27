import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateRecipe } from '../api/RecipesAPI'
import { Bounce, toast } from 'react-toastify'

const createRecipesSchema = z.object({
  title: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
})

export function CreateRecipesForm() {
  type CreateRecipesSchema = z.infer<typeof createRecipesSchema>
  const { register, handleSubmit, formState } = useForm<CreateRecipesSchema>({
    resolver: zodResolver(createRecipesSchema),
  })

  const [ingredients, setIngredients] = useState<string[]>([])

  const recipeInputRef = useRef<HTMLInputElement>(null)

  function handleRemoveItem() {
    const list = [...ingredients]
    list.pop()

    setIngredients(list)
  }

  async function HandleCreateRecipes(data: CreateRecipesSchema) {
    const jsonIngredients = JSON.stringify(ingredients)
    const recipes = {
      ingredients: jsonIngredients,
      ...data,
    }
    // Create a recipe in the database
    const response = await CreateRecipe(recipes)

    toast.success(response?.data, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }

  function handleOnClick() {
    if (recipeInputRef.current) {
      const recipe = recipeInputRef.current?.value

      recipe && setIngredients((oldValues) => [...oldValues, recipe])
      recipeInputRef.current.value = ''
    }
  }

  return (
    <div className="p-8 w-screen">
      <form
        className="w-full h-full flex flex-col gap-16 items-center"
        onSubmit={handleSubmit(HandleCreateRecipes)}
      >
        <div className="w-full h-full flex flex-col lg:flex-row">
          <div className="w-full">
            <div className="flex gap-4 mb-4 flex-col">
              {formState.errors.title && (
                <span className="font-medium text-red-500">
                  {formState.errors.title.message}
                </span>
              )}
              <div className="flex lg:items-center gap-4 mb-4 flex-col lg:flex-row">
                <label htmlFor="title" className="text-slate-700">
                  Nome da receita:
                </label>
                <input
                  className="p-2 flex-1 rounded-md outline-none border border-slate-300"
                  type="text"
                  placeholder="Ex: Bolo de cenoura"
                  {...register('title')}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              {formState.errors.description && (
                <span className="font-medium text-red-500">
                  {formState.errors.description.message}
                </span>
              )}
              <label htmlFor="title" className="text-slate-700">
                Descrição / modo de preparo:
              </label>
              <textarea
                placeholder="Ex: bata os ingredientes no liquidificador, coloque o elemento x, espere 300 dias e estará pronto!"
                className="p-2 rounded-md outline-none w-full h-[280px] 
            resize-none border border-slate-300"
                {...register('description')}
              />
            </div>
          </div>

          <div className="w-full mt-4 lg:mt-0 lg:px-10 flex flex-col items-center gap-4">
            <div className="flex lg:items-center gap-4 flex-col xl:flex-row">
              <label htmlFor="ingredients" className="text-slate-700">
                Ingredientes da receita ( 1 por vez ):
              </label>
              <div className="flex-1 flex flex-row">
                <input
                  className="p-2 rounded-tl-md rounded-s-md w-full outline-none border border-slate-300"
                  type="text"
                  placeholder="Ex: 3 ovos"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleOnClick()
                    }
                  }}
                  ref={recipeInputRef}
                />
                <button
                  type="button"
                  className="px-2 bg-blue-300 rounded-tr-md rounded-e-md"
                  onClick={handleOnClick}
                >
                  <Plus color="#ffffff" />
                </button>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="w-full max-w-[480px] rounded-2x text-center">
                <div className="font-bold bg-white text-slate-800 rounded-t-md py-3">
                  <p>Ingredientes [ {ingredients.length} ]</p>
                </div>
                {ingredients &&
                  ingredients.map((ingredient) => {
                    return (
                      <div
                        key={ingredient.concat(Math.random.toString())}
                        className="font-bold text-slate-800 py-4 border-b border-slate-400 border-dashed break-words"
                      >
                        <p>{ingredient}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
            {ingredients.length > 0 && (
              <button
                className="bg-red-400 py-2 px-4 rounded-md text-slate-50"
                type="button"
                onClick={handleRemoveItem}
              >
                Remover
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-slate-50 font-bold rounded-md bg-blue-400 px-4
         py-2 hover:underline hover:bg-blue-500 transition-colors ease-in"
        >
          Criar Receita
        </button>
      </form>
    </div>
  )
}
