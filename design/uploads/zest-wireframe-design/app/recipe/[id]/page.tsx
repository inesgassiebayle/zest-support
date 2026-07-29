import { notFound } from "next/navigation"
import { SiteShell } from "@/components/site-shell"
import { RecipeDetail } from "@/components/recipe-detail"
import { getRecipe, recipes } from "@/lib/data"

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }))
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const recipe = getRecipe(id)
  if (!recipe) notFound()

  return (
    <SiteShell>
      <RecipeDetail recipe={recipe} />
    </SiteShell>
  )
}
