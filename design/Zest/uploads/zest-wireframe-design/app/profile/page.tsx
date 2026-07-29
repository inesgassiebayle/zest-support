import Image from "next/image"
import { Settings, Share2, MapPin } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { RecipeCard } from "@/components/recipe-card"
import { recipes } from "@/lib/data"

const stats = [
  { label: "Publications", value: "48" },
  { label: "Saves", value: "12.4k" },
  { label: "Followers", value: "3,210" },
]

export default function ProfilePage() {
  const published = recipes.filter((r) => r.author === "Lucía Moreno")

  return (
    <SiteShell>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <section className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="h-28 bg-gradient-to-r from-grapefruit via-coral to-lemon md:h-36" />
          <div className="flex flex-col gap-4 px-6 pb-6">
            <div className="-mt-12 flex items-end justify-between">
              <Image
                src="/avatars/avatar-1.png"
                alt="Lucía Moreno"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full border-4 border-card object-cover"
              />
              <div className="mb-1 flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Settings className="h-4 w-4" />
                  Edit profile
                </button>
                <button
                  type="button"
                  aria-label="Share profile"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                Lucía Moreno
              </h1>
              <p className="text-sm text-muted-foreground">@luciacooks</p>
              <p className="mt-2 max-w-lg text-pretty leading-relaxed text-foreground">
                Home cook obsessed with citrus, color, and seasonal produce.
                Sharing fresh, plant-forward recipes from my kitchen to yours.
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-lime" />
                Valencia, Spain
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 divide-x divide-border rounded-2xl bg-secondary">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-3 text-center">
                  <p className="font-serif text-xl font-bold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Published recipes */}
        <section>
          <div className="mb-5 flex items-center gap-3 border-b border-border">
            <button className="border-b-2 border-primary pb-3 text-sm font-semibold text-foreground">
              Published ({published.length})
            </button>
            <button className="pb-3 text-sm font-medium text-muted-foreground">
              Saved
            </button>
            <button className="pb-3 text-sm font-medium text-muted-foreground">
              Collections
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {published.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  )
}
