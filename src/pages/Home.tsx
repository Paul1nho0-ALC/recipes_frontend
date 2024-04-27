import { Header } from '../components/Header'
import { Recipes } from '../components/Recipes'

export function Home() {
  return (
    <>
      <Header isHome={true} />
      <Recipes />
    </>
  )
}
