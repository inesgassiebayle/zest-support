import Image from "next/image"
import Link from "next/link"
import { Clock, Bookmark } from "lucide-react"
import type { Recipe } from "@/lib/data"

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-foreground/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
          <Clock className="h-3 w-3 text-coral" />
          {recipe.time}
        </span>
        <button
          type="button"
          aria-label="Save recipe"
          className="absolute right-3 top-3 rounded-full bg-background/90 p-2 text-foreground backdrop-blur transition-colors hover:text-primary"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif text-lg font-bold leading-snug text-foreground text-balance">
          {recipe.title}
        </h3>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Image
            src={recipe.authorAvatar || "/placeholder.svg"}
            alt={recipe.author}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{recipe.author}</span>
        </div>
      </div>
    </Link>
  )
}
