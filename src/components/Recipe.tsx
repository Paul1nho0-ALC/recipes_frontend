import { useNavigate } from 'react-router-dom'

interface RecipeProps {
  title: string
  description: string
  id: string
}
export function Recipe(props: RecipeProps) {
  const fullTitle = props.title
  const fullDescription = props.description
  const id = props.id
  const navigate = useNavigate()

  const title =
    fullTitle.length >= 60
      ? fullTitle.substring(0, 60).concat('. . .')
      : fullTitle
  const description =
    fullDescription.length >= 80
      ? fullDescription.substring(0, 80).concat('. . .')
      : fullDescription

  function handleClick() {
    navigate(`/recipe?id=${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="w-full md:w-[460px] rounded-lg bg-slate-100 text-start 
    p-6 break-words shadow-md shadow-slate-400 divide-y-2 divide-dashed divide-slate-300 hover:scale-[1.02]
    ease-linear duration-150 hover:cursor-pointer"
    >
      <h1 className="font-bold text-slate-800 mb-4 text-xl">{title}</h1>
      <p className="font-light text-base text-slate-600 pt-4">{description}</p>
    </div>
  )
}
