import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/zest-logo.png"
        alt="Zest logo"
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        priority
      />
      <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
        Zest
      </span>
    </div>
  )
}
