import Image from "next/image"
import { Plus, FolderHeart } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { collections } from "@/lib/data"

const accentMap: Record<string, string> = {
  grapefruit: "text-grapefruit",
  coral: "text-coral",
  lemon: "text-lemon",
  lime: "text-lime",
}

export default function CollectionsPage() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              My Collections
            </h1>
            <p className="mt-1 text-muted-foreground">
              Organize your favorite recipes into themed groups.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            New collection
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {/* Create new tile */}
          <button
            type="button"
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-coral hover:text-foreground"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">New collection</span>
          </button>

          {collections.map((col) => (
            <div
              key={col.id}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={col.cover || "/placeholder.svg"}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-lg font-bold text-background">
                    {col.name}
                  </h3>
                  <p className="flex items-center gap-1.5 text-sm text-background/90">
                    <FolderHeart
                      className={`h-4 w-4 ${accentMap[col.accent]}`}
                    />
                    {col.count} recipes
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
