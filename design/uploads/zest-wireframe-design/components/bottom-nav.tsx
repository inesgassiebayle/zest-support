"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookMarked, CalendarDays, User, Plus } from "lucide-react"

const tabs = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/collections", label: "Collections", icon: BookMarked },
  { href: "/planner", label: "Planner", icon: CalendarDays },
  { href: "/profile", label: "Profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {tabs.slice(0, 2).map((tab) => (
          <TabItem key={tab.href} tab={tab} pathname={pathname} />
        ))}

        <div className="flex justify-center">
          <Link
            href="/design/uploads/zest-wireframe-design/public"
            aria-label="New recipe"
            className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          >
            <Plus className="h-6 w-6" />
          </Link>
        </div>

        {tabs.slice(2).map((tab) => (
          <TabItem key={tab.href} tab={tab} pathname={pathname} />
        ))}
      </div>
    </nav>
  )
}

function TabItem({
  tab,
  pathname,
}: {
  tab: { href: string; label: string; icon: typeof Home }
  pathname: string
}) {
  const active =
    tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
  const Icon = tab.icon
  return (
    <Link
      href={tab.href}
      className={`flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      {tab.label}
    </Link>
  )
}
