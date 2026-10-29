import { Assertion } from '../components/Assertion';
import { Background } from '../components/Background';
import { ExampleBadge } from '../components/ExampleBadge';
import { Kicker } from '../components/Kicker';
import { Metric } from '../components/Metric';
import { SlideFrame } from '../components/SlideFrame';
import { preview } from './data';

const nf = new Intl.NumberFormat('es-AR');

// Citrus editorial: cream canvas, big Playfair, animated gradient only on the cover.
export function CoverA() {
  return (
    <SlideFrame dark background={<Background kind="grainient" />} className="justify-end">
      <p className="font-mono text-[22px] uppercase tracking-[0.25em] text-white/80">Steering 3 · Laboratorio II y IV · 12/11/2026</p>
      <h1 className="mt-6 font-serif text-[260px] font-medium leading-none text-white">Zest</h1>
      <p className="mt-8 max-w-[1100px] text-[36px] leading-snug text-white/90">Descubrir, guardar, organizar y planificar recetas en un solo lugar.</p>
    </SlideFrame>
  );
}

export function EvmA() {
  return (
    <SlideFrame className="justify-between">
      {preview.isExample && <ExampleBadge source="la planilla 10B" />}
      <div className="flex flex-col gap-8">
        <Kicker>Valor ganado · método corregido</Kicker>
        <Assertion text="Corregimos cómo medimos: desarrollo va un 8% por encima del plan" size="md" />
      </div>
      <div className="grid grid-cols-3 items-end gap-16">
        <Metric label="SPI desarrollo" value={preview.spiDev} decimals={2} tone="good" formula={`EV / PV = ${nf.format(preview.ev)} / ${nf.format(preview.pv)}`} />
        <Metric label="CPI desarrollo" value={preview.cpiDev} decimals={2} tone="good" formula={`EV / AC = ${nf.format(preview.ev)} / ${nf.format(preview.ac)}`} />
        <div className="border-l-4 border-border pl-8">
          <p className="font-mono text-[22px] uppercase tracking-[0.15em] text-muted-foreground">Steering 2 · método anterior</p>
          <p className="mt-3 font-mono text-[64px] text-muted-foreground line-through decoration-grapefruit decoration-4">1,36</p>
          <p className="mt-2 text-[24px] text-muted-foreground">Un % único sobre todo el BAC inflaba el índice</p>
        </div>
      </div>
    </SlideFrame>
  );
}
