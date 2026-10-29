import { Assertion } from '../components/Assertion';
import { ExampleBadge } from '../components/ExampleBadge';
import { Kicker } from '../components/Kicker';
import { SlideFrame } from '../components/SlideFrame';
import { preview } from './data';

const nf = new Intl.NumberFormat('es-AR');
const PHOTOS = ['pasta', 'tacos', 'buddha-bowl', 'pancakes', 'roast-chicken', 'citrus-salad'];

// Recetario: the deck reads like Zest itself — a cookbook cover, and data laid
// out as a recipe card (ingredients → result → steps).
export function CoverC() {
  return (
    <section className="absolute inset-0 grid grid-cols-[760px_1fr] bg-background">
      <div className="flex flex-col justify-between px-[100px] py-[96px]">
        <p className="font-mono text-[20px] uppercase tracking-[0.25em] text-grapefruit">Steering 3 · 12/11/2026</p>
        <div>
          <h1 className="font-serif text-[220px] font-medium leading-none">Zest</h1>
          <p className="mt-6 font-serif text-[44px] italic leading-snug text-muted-foreground">Recetario del cierre</p>
        </div>
        <p className="text-[26px] text-muted-foreground">Laboratorio II y IV</p>
      </div>
      <div className="grid grid-cols-3 grid-rows-2">
        {PHOTOS.map(p => (
          <img key={p} src={`./assets/${p}.webp`} alt="" className="h-full w-full object-cover" />
        ))}
      </div>
    </section>
  );
}

export function EvmC() {
  return (
    <SlideFrame className="justify-between">
      {preview.isExample && <ExampleBadge source="la planilla 10B" />}
      <div className="flex flex-col gap-6">
        <Kicker>Valor ganado · método corregido</Kicker>
        <Assertion text="Corregimos cómo medimos: desarrollo va un 8% por encima del plan" size="md" />
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-20">
        <div>
          <p className="font-serif text-[36px] italic text-grapefruit">Ingredientes</p>
          {[
            ['PV · lo que el plan pedía', preview.pv],
            ['EV · lo que terminamos', preview.ev],
            ['AC · lo que costó', preview.ac],
          ].map(([k, v]) => (
            <div key={k as string} className="mt-6 flex items-baseline gap-4 text-[30px]">
              <span>{k}</span>
              <span className="flex-1 border-b-2 border-dotted border-border" />
              <span className="font-mono">USD {nf.format(v as number)}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[32px] bg-card p-12 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
          <p className="font-serif text-[36px] italic text-grapefruit">Resultado</p>
          <div className="mt-4 flex items-end gap-16">
            <div>
              <p className="font-mono text-[22px] uppercase tracking-[0.15em] text-muted-foreground">SPI desarrollo</p>
              <p className="font-mono text-[120px] leading-none">1,08</p>
            </div>
            <div>
              <p className="font-mono text-[22px] uppercase tracking-[0.15em] text-muted-foreground">CPI desarrollo</p>
              <p className="font-mono text-[120px] leading-none">1,02</p>
            </div>
          </div>
          <p className="mt-8 text-[24px] text-muted-foreground">Antes, con un % único sobre todo el BAC: SPI 1,36</p>
        </div>
      </div>
    </SlideFrame>
  );
}
