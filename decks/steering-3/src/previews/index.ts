import type { SlideDef } from '../deck/types';
import { CoverA, EvmA } from './A';
import { CoverB, EvmB } from './B';
import { CoverC, EvmC } from './C';

/** Style previews (open with ?previews). Deleted once a direction is chosen. */
export const previewSlides: SlideDef[] = [
  { id: 'a-portada', title: '', notes: '', Component: CoverA },
  { id: 'a-valor-ganado', title: '', notes: '', Component: EvmA },
  { id: 'b-portada', title: '', notes: '', Component: CoverB },
  { id: 'b-valor-ganado', title: '', notes: '', Component: EvmB },
  { id: 'c-portada', title: '', notes: '', Component: CoverC },
  { id: 'c-valor-ganado', title: '', notes: '', Component: EvmC },
];
