"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Bookmark,
  Heart,
  Share2,
  Minus,
  Plus,
} from "lucide-react"
import type { Recipe } from "@/lib/data"

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.servings)
  const [saved, setSaved] = useState(false)
  const factor = servings / recipe.servings

  return (
    <article className="flex flex-col gap-8">
      <Link
        href="/design/uploads/zest-wireframe-design/public"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to feed
      </Link>

      {/* Hero */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl">
            {recipe.title}
          </h1>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {recipe.description}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <Image
              src={recipe.authorAvatar || "/placeholder.svg"}
              alt={recipe.author}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {recipe.author}
              </p>
              <p className="text-xs text-muted-foreground">Recipe author</p>
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Meta icon={Clock} label="Time" value={recipe.time} tint="text-coral" />
            <Meta
              icon={ChefHat}
              label="Level"
              value={recipe.difficulty}
              tint="text-lime"
            />
            <Meta
              icon={Heart}
              label="Saves"
              value={recipe.saves.toLocaleString()}
              tint="text-grapefruit"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                saved
                  ? "bg-lime text-accent-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              {saved ? "Saved to collection" : "Save to collection"}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Ingredients */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Ingredients
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              <Users className="h-3 w-3" />
              {servings}
            </span>
          </div>

          {/* Servings selector */}
          <div className="mb-5 flex items-center justify-between rounded-xl bg-secondary p-2">
            <span className="pl-2 text-sm font-medium text-foreground">
              Servings
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease servings"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-foreground transition-colors hover:bg-background"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-sm font-bold text-foreground">
                {servings}
              </span>
              <button
                type="button"
                aria-label="Increase servings"
                onClick={() => setServings((s) => Math.min(20, s + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {recipe.ingredients.map((group, gi) => (
              <div key={gi}>
                {group.group && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-coral">
                    {group.group}
                  </p>
                )}
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-2 border-b border-border/60 pb-2 text-sm last:border-0"
                    >
                      <span className="text-foreground">{item.name}</span>
                      <span className="shrink-0 font-medium text-muted-foreground">
                        {scaleAmount(item.amount, factor)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Steps */}
        <section>
          <h2 className="mb-5 font-serif text-2xl font-bold text-foreground">
            Instructions
          </h2>
          <ol className="flex flex-col gap-4">
            {recipe.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lemon font-serif text-lg font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof Clock
  label: string
  value: string
  tint: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center">
      <Icon className={`mx-auto mb-1 h-5 w-5 ${tint}`} />
      <p className="text-sm font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

// Scales simple numeric amounts (e.g. "2", "1/2 cup", "400 g") by a factor.
function scaleAmount(amount: string, factor: number): string {
  if (factor === 1) return amount
  // Match a leading fraction first, then a decimal/integer.
  const match = amount.match(/^(\d+\/\d+|\d+(?:\.\d+)?)/)
  if (!match) return amount
  const token = match[1]
  let value: number
  if (token.includes("/")) {
    const [n, d] = token.split("/").map(Number)
    value = n / d
  } else {
    value = parseFloat(token)
  }
  const scaled = value * factor
  // Round to 2 decimals and trim trailing zeros for a clean display.
  const rounded = Math.round(scaled * 100) / 100
  const display = Number.isInteger(rounded)
    ? String(rounded)
    : String(rounded)
  return amount.replace(token, display)
}
