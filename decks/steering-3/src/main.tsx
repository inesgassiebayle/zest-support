import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import { Deck } from './deck/Deck';
import { previewSlides } from './previews';
import { slides } from './slides';

const showPreviews = new URLSearchParams(window.location.search).has('previews');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Deck slides={showPreviews ? previewSlides : slides} />
  </StrictMode>,
);
