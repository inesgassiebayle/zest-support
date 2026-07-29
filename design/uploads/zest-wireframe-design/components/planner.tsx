"use client"

import { useState } from "react"
import Image from "next/image"
import { GripVertical, X } from "lucide-react"
import { recipes, type Recipe } from "@/lib/data"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const meals = ["Breakfast", "Lunch", "Dinner"] as const
type Meal = (typeof meals)[number]

type Plan = Record<string, string | null> // key `${day}-${meal}` -> recipeId

const initialPlan: Plan = {
  "Mon-Breakfast": "lemon-ricotta-pancakes",
  "Mon-Lunch": "baja-fish-tacos",
  "Mon-Dinner": "lemon-garlic-pasta",
  "Tue-Breakfast": "mango-citrus-smoothie-bowl",
  "Wed-Dinner": "lemon-herb-roast-chicken",
  "Thu-Lunch": "rainbow-buddha-bowl",
  "Fri-Dinner": "lemon-garlic-pasta",
  "Sat-Lunch": "citrus-avocado-salad",
  "Sun-Dinner": "lemon-herb-roast-chicken",
}

export function Planner() {
  const [plan, setPlan] = useState<Plan>(initialPlan)
  const [dragId, setDragId] = useState<string | null>(null)

  function recipeById(id: string | null) {
    return id ? recipes.find((r) => r.id === id) : undefined
  }

  function handleDrop(key: string) {
    if (!dragId) return
    setPlan((p) => ({ ...p, [key]: dragId }))
    setDragId(null)
  }

  function clearSlot(key: string) {
    setPlan((p) => ({ ...p, [key]: null }))
  }

  const plannedCount = Object.values(plan).filter(Boolean).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Weekly Meal Planner
        </h1>
        <p className="mt-1 text-muted-foreground">
          Drag recipes into a slot to plan your week. {plannedCount} meals
          planned.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Calendar + recipe tray */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* Recipe tray to drag from */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Your recipes — drag to a slot
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {recipes.map((r) => (
                <div
                  key={r.id}
                  draggable
                  onDragStart={() => setDragId(r.id)}
                  onDragEnd={() => setDragId(null)}
                  className="flex w-40 shrink-0 cursor-grab items-center gap-2 rounded-xl border border-border bg-background p-2 active:cursor-grabbing"
                >
                  <Image
                    src={r.image || "/placeholder.svg"}
                    alt={r.title}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <span className="line-clamp-2 text-xs font-medium text-foreground">
                    {r.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              {/* Header row */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-2">
                <div />
                {days.map((d) => (
                  <div
                    key={d}
                    className="rounded-lg bg-secondary py-2 text-center text-sm font-semibold text-foreground"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Meal rows */}
              {meals.map((meal) => (
                <div
                  key={meal}
                  className="mt-2 grid grid-cols-[80px_repeat(7,1fr)] gap-2"
                >
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    {meal}
                  </div>
                  {days.map((day) => {
                    const key = `${day}-${meal}`
                    const recipe = recipeById(plan[key])
                    return (
                      <Slot
                        key={key}
                        recipe={recipe}
                        onDrop={() => handleDrop(key)}
                        onClear={() => clearSlot(key)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slot({
  recipe,
  onDrop,
  onClear,
}: {
  recipe?: Recipe
  onDrop: () => void
  onClear: () => void
}) {
  const [over, setOver] = useState(false)

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={() => {
        setOver(false)
        onDrop()
      }}
      className={`group relative min-h-[72px] rounded-xl border p-1.5 transition-colors ${
        over
          ? "border-coral bg-coral/10"
          : recipe
            ? "border-border bg-background"
            : "border-dashed border-border bg-secondary/40"
      }`}
    >
      {recipe ? (
        <div className="flex h-full flex-col">
          <div className="relative h-10 overflow-hidden rounded-lg">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              sizes="120px"
              className="object-cover"
            />
            <button
              type="button"
              aria-label="Remove from plan"
              onClick={onClear}
              className="absolute right-1 top-1 rounded-full bg-background/90 p-0.5 text-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <span className="mt-1 line-clamp-2 px-0.5 text-[11px] font-medium leading-tight text-foreground">
            {recipe.title}
          </span>
        </div>
      ) : (
        <div className="flex h-full min-h-[64px] items-center justify-center text-muted-foreground/50">
          <GripVertical className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
