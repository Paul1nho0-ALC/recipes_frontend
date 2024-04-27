import { api } from '../utils/api'

export type RecipesProps = {
  id: string
  title: string
  description: string
  ingredients: string
}

export type createRecipesProps = {
  title: string
  description: string
  ingredients: string
}

export async function GetRecipes(filter: string | null) {
  try {
    const response = await api.get<RecipesProps[]>('/recipes')
    const recipes = filter
      ? response.data.filter((recipe) => recipe.title.includes(filter))
      : response.data

    return recipes
  } catch (e) {
    console.warn(e)
  }
}

export async function GetRecipeById(id: string | null) {
  if (id === null) return
  try {
    const response = await api.get<RecipesProps>(`/recipes/${id}`)

    const { title, description } = response.data

    const ingredients = JSON.parse(response.data.ingredients)

    const parsedResponse = {
      title,
      description,
      ingredients,
    }

    console.log(parsedResponse)

    return parsedResponse
  } catch (e) {
    console.warn(e)
  }
}

export async function CreateRecipe(data: createRecipesProps) {
  try {
    const response = await api.post('/recipes', {
      ...data,
    })
    return response
  } catch (e) {
    console.warn(e)
  }
}

export async function DeleteRecipe(id: string | null) {
  if (id === null) return
  try {
    await api.delete(`/recipes/${id}`)
  } catch (e) {
    console.warn(e)
  }
}
