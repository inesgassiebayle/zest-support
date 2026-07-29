"use client"

import { useState } from "react"
import { recipes, categories } from "@/lib/data"
import { RecipeCard } from "@/components/recipe-card"

export function Feed() {
  const [active, setActive] = useState<string>("all")

  const filtered =
    active === "all"
      ? recipes
      : recipes.filter((r) => r.category === active)

  const featured = recipes[6]

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-grapefruit to-coral p-6 text-primary-foreground md:p-12">
        <div className="max-w-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-lemon">
            Fresh from the community
          </p>
          <h1 className="font-serif text-3xl font-bold leading-tight text-balance md:text-5xl">
            Cook brighter, plan smarter.
          </h1>
          <p className="mt-3 text-sm text-primary-foreground/90 md:text-base">
            Discover thousands of community recipes, build your collections, and
            plan a delicious week — all in one zesty place.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Discover
          </h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} recipes
          </span>
        </div>

        <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-coral hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  )
}
