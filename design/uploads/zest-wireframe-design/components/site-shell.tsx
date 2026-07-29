import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/design/uploads/zest-wireframe-design/public" aria-label="Zest home" className="flex items-center gap-2">
          <Image
            src="/zest-logo.png"
            alt="Zest logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="font-serif text-xl font-bold text-foreground">Zest</span>
        </Link>
        <div className="relative ml-auto flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-coral focus:ring-2 focus:ring-coral/30"
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-4 md:px-6 md:pb-12 md:pt-8">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
