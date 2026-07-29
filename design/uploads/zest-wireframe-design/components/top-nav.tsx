"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Bell, Plus } from "lucide-react"
import { Logo } from "@/components/logo"

const navLinks = [
  { href: "/", label: "Feed" },
  { href: "/collections", label: "Collections" },
  { href: "/planner", label: "Meal Planner" },
  { href: "/profile", label: "Profile" },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 hidden border-b border-border bg-background/90 backdrop-blur md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link href="/design/uploads/zest-wireframe-design/public" aria-label="Zest home">
          <Logo />
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="relative ml-auto hidden max-w-sm flex-1 lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search recipes, ingredients..."
            className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-coral focus:ring-2 focus:ring-coral/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/design/uploads/zest-wireframe-design/public"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            New recipe
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-grapefruit" />
          </button>
          <Link href="/profile" aria-label="Your profile">
            <Image
              src="/avatars/avatar-1.png"
              alt="Your avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border-2 border-lemon object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
