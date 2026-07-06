const BASE = "/images/leistungen"

export interface BeforeAfterPair {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  caption: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface ServiceMedia {
  /** large hero image for the service detail page */
  hero?: GalleryImage
  /** interactive before/after comparison sliders (two large comparisons) */
  beforeAfter: BeforeAfterPair[]
  /** additional result images shown in the auto-rotating carousel */
  gallery: GalleryImage[]
}

export const serviceMedia: Record<string, ServiceMedia> = {
  fensterreinigung: {
    hero: {
      src: `${BASE}/fenster-sauber-nach-glasreinigung.avif`,
      alt: "Streifenfrei gereinigtes Fenster nach professioneller Glasreinigung",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/dachfenster-oberlicht-vor-reinigung.avif`,
        afterSrc: `${BASE}/dachfenster-oberlicht-sauber-gereinigt.avif`,
        beforeAlt: "Verschmutztes Dachfenster-Oberlicht vor der Reinigung",
        afterAlt: "Sauber gereinigtes Dachfenster-Oberlicht nach der Reinigung",
        caption: "Dachfenster & Oberlichter – vom Schmutzfilm zur klaren Sicht",
      },
      {
        beforeSrc: `${BASE}/fenster-verschmutzt-vor-glasreinigung.avif`,
        afterSrc: `${BASE}/fenster-sauber-nach-glasreinigung.avif`,
        beforeAlt: "Stark verschmutztes Fenster vor der Glasreinigung",
        afterAlt: "Streifenfrei sauberes Fenster nach der Glasreinigung",
        caption: "Glasflächen – streifenfreies Ergebnis nach der Reinigung",
      },
    ],
    gallery: [
      {
        src: `${BASE}/fenster-halb-gereinigt-vorher-nachher.avif`,
        alt: "Halb gereinigtes Fenster zeigt den direkten Vorher-Nachher-Unterschied",
      },
      {
        src: `${BASE}/fensterrahmen-reinigung-detailarbeit.avif`,
        alt: "Detailarbeit bei der Reinigung eines Fensterrahmens",
      },
      {
        src: `${BASE}/fenster-kalk-verschmutzung-reinigung.avif`,
        alt: "Entfernung von Kalk- und Wasserflecken bei der Fensterreinigung",
      },
      {
        src: `${BASE}/fensterrahmen-sauber-nahaufnahme.avif`,
        alt: "Saubere Fensterrahmen in Nahaufnahme nach der Reinigung",
      },
    ],
  },

  fassadenreinigung: {
    hero: {
      src: `${BASE}/fassadenreinigung-wohngebaeude-resultat.avif`,
      alt: "Saubere gelbe Wohnhaus-Fassade mit braunen Türen nach der Fassadenreinigung",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/fassade-veralgt-vor-reinigung.avif`,
        afterSrc: `${BASE}/fassade-gereinigt-nach-reinigung.avif`,
        beforeAlt: "Veralgte und verschmutzte Hausfassade vor der Reinigung",
        afterAlt: "Saubere, helle Hausfassade nach der Fassadenreinigung",
        caption: "Wohnhaus-Fassade – Algen und Grünbelag restlos entfernt",
      },
      {
        beforeSrc: `${BASE}/buerogebaeude-fassade-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/buerogebaeude-fassade-gereinigt-nachher.avif`,
        beforeAlt: "Verschmutzte Bürogebäude-Fassade mit Umweltablagerungen vor der Reinigung",
        afterAlt: "Strahlend saubere Bürogebäude-Fassade nach der Reinigung",
        caption: "Gewerbliche Fassade – Umweltablagerungen entfernt",
      },
    ],
    gallery: [
      {
        src: `${BASE}/fassadenreinigung-wohnhaus-ergebnis.avif`,
        alt: "Gereinigte Fassade eines Wohnhauses als Endergebnis",
      },
    ],
  },

  steinreinigung: {
    hero: {
      src: `${BASE}/naturstein-terrasse-gereinigt-ergebnis.avif`,
      alt: "Gereinigte Naturstein-Terrasse als Ergebnis der Steinreinigung",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/gartenweg-pflaster-vor-reinigung.avif`,
        afterSrc: `${BASE}/gartenweg-kopfsteinpflaster-ergebnis.avif`,
        beforeAlt: "Veralgter Gartenweg aus Pflastersteinen vor der Reinigung",
        afterAlt: "Sauberes Kopfsteinpflaster des Gartenwegs nach der Reinigung",
        caption: "Gartenweg & Pflaster – Algen und Moos restlos entfernt",
      },
      {
        beforeSrc: `${BASE}/eingangsweg-pflaster-reinigung-vorher.avif`,
        afterSrc: `${BASE}/eingangsbereich-pflaster-gereinigt.avif`,
        beforeAlt: "Verschmutzter Eingangsweg aus Pflaster vor der Reinigung",
        afterAlt: "Gereinigter Pflaster-Eingangsbereich nach der Reinigung",
        caption: "Eingangsbereich – einladend sauberes Pflaster",
      },
    ],
    gallery: [
      {
        src: `${BASE}/bodenreinigung-aussenflaeche-pflaster.avif`,
        alt: "Bodenreinigung einer gepflasterten Außenfläche",
      },
      {
        src: `${BASE}/flaechenreinigung-hochdruck-mitarbeiter.avif`,
        alt: "Mitarbeiter bei der Flächenreinigung mit dem Hochdruckreiniger",
      },
      {
        src: `${BASE}/einfahrt-komplett-gereinigt-sauber.avif`,
        alt: "Komplett gereinigte und saubere Pflaster-Einfahrt",
      },
      {
        src: `${BASE}/natursteinplatten-nach-reinigung.avif`,
        alt: "Natursteinplatten nach der professionellen Reinigung",
      },
      {
        src: `${BASE}/eingangstreppe-steinreinigung-sauber.avif`,
        alt: "Saubere Eingangstreppe nach der Steinreinigung",
      },
      {
        src: `${BASE}/carport-dach-gereinigt-ergebnis.avif`,
        alt: "Gereinigtes Carport-Dach als Ergebnis der Reinigung",
      },
      {
        src: `${BASE}/dachueberstand-reinigung-naturstein.avif`,
        alt: "Gereinigter Dachüberstand aus Naturstein",
      },
    ],
  },

  industriereinigung: {
    hero: {
      src: `${BASE}/industriereinigung-produktionshalle-sauber.avif`,
      alt: "Saubere Produktionshalle nach professioneller Industriereinigung",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/hallenboden-verschmutzt-vor-industriereinigung.avif`,
        afterSrc: `${BASE}/hallenboden-sauber-nach-industriereinigung.avif`,
        beforeAlt: "Verschmutzter Industrie-Hallenboden mit Ölflecken vor der Reinigung",
        afterAlt: "Sauberer, gereinigter Industrie-Hallenboden nach der Reinigung",
        caption: "Hallenboden – Öl, Staub und Reifenspuren entfernt",
      },
      {
        beforeSrc: `${BASE}/lagerhalle-verschmutzt-vor-reinigung.avif`,
        afterSrc: `${BASE}/lagerhalle-gereinigt-nach-reinigung.avif`,
        beforeAlt: "Verschmutzte und verstaubte Lagerhalle vor der Industriereinigung",
        afterAlt: "Aufgeräumte und saubere Lagerhalle nach der Industriereinigung",
        caption: "Lagerhalle – staubfrei und einsatzbereit",
      },
    ],
    gallery: [
      {
        src: `${BASE}/industriereinigung-hallenreinigung-boden.avif`,
        alt: "Bodenreinigung bei der Hallenreinigung im Industriebereich",
      },
      {
        src: `${BASE}/industrieanlage-tankreinigung-ergebnis.avif`,
        alt: "Saubere Edelstahltanks und Rohrleitungen nach der Industrieanlagenreinigung",
      },
      {
        src: `${BASE}/flaechenreinigung-hochdruck-mitarbeiter.avif`,
        alt: "Mitarbeiter bei der industriellen Flächenreinigung mit dem Hochdruckreiniger",
      },
    ],
  },
}

export function getServiceMedia(slug: string): ServiceMedia | undefined {
  return serviceMedia[slug]
}
