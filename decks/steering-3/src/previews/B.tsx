import { Assertion } from '../components/Assertion';
import { ExampleBadge } from '../components/ExampleBadge';
import { Kicker } from '../components/Kicker';
import { Metric } from '../components/Metric';
import { SlideFrame } from '../components/SlideFrame';
import { useDeck } from '../deck/DeckContext';
import Threads from '../components/bits/Threads';
import { preview } from './data';

const nf = new Intl.NumberFormat('es-AR');

// Cocina de noche: dark throughout, grapefruit and lemon accents, thin threads on the cover.
function ThreadsBg() {
  const { isStatic } = useDeck();
  if (isStatic) {
    return <div className="h-full w-full" style={{ background: 'radial-gradient(ellipse at 70% 60%, #e8415a33, transparent 55%), #141210' }} />;
  }
  return (
    <div className="h-full w-full bg-[#141210]">
      <Threads color="#f5c842" accentColor="#e8415a" amplitude={1.2} distance={0.2} lineCount={36} enableMouseInteraction={false} />
    </div>
  );
}

export function CoverB() {
  return (
    <SlideFrame dark background={<ThreadsBg />} className="justify-center">
      <p className="font-mono text-[22px] uppercase tracking-[0.3em] text-lemon">Steering 3 · 12/11/2026</p>
      <h1 className="mt-8 font-serif text-[200px] font-medium leading-[0.95] text-white">
        El cierre de <span className="italic text-grapefruit">Zest</span>
      </h1>
      <p className="mt-10 text-[34px] text-white/70">Laboratorio II y IV</p>
    </SlideFrame>
  );
}

export function EvmB() {
  return (
    <SlideFrame dark className="justify-between bg-[#141210]">
      {preview.isExample && <ExampleBadge source="la planilla 10B" />}
      <div className="flex flex-col gap-8">
        <Kicker>Valor ganado · método corregido</Kicker>
        <Assertion text="Corregimos cómo medimos: desarrollo va un 8% por encima del plan" size="md" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {[
          { label: 'SPI desarrollo', value: preview.spiDev, formula: `EV / PV = ${nf.format(preview.ev)} / ${nf.format(preview.pv)}` },
          { label: 'CPI desarrollo', value: preview.cpiDev, formula: `EV / AC = ${nf.format(preview.ev)} / ${nf.format(preview.ac)}` },
        ].map(m => (
          <div key={m.label} className="rounded-[32px] border border-white/10 bg-white/[0.04] p-12 text-lemon">
            <Metric label={m.label} value={m.value} decimals={2} tone="good" formula={m.formula} />
          </div>
        ))}
      </div>
      <p className="font-mono text-[22px] text-white/50">Steering 2, método anterior: SPI 1,36 · un % único sobre todo el BAC inflaba el índice</p>
    </SlideFrame>
  );
}
