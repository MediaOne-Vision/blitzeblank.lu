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
  /** interactive before/after comparison sliders */
  beforeAfter: BeforeAfterPair[]
  /** additional result images */
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
        src: `${BASE}/fenster-kalk-verschmutzung-reinigung.avif`,
        alt: "Entfernung von Kalk- und Wasserflecken bei der Fensterreinigung",
      },
      {
        src: `${BASE}/fensterrahmen-sauber-nahaufnahme.avif`,
        alt: "Saubere Fensterrahmen in Nahaufnahme nach der Reinigung",
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
        src: `${BASE}/einfahrt-pflaster-halbreinigung-ergebnis.avif`,
        alt: "Halb gereinigte Pflaster-Einfahrt zeigt den direkten Vorher-Nachher-Unterschied",
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

  fassadenreinigung: {
    hero: {
      src: `${BASE}/fassade-gebaeudereinigung-sauber.avif`,
      alt: "Saubere Gebäudefassade nach professioneller Fassadenreinigung",
    },
    beforeAfter: [],
    gallery: [
      {
        src: `${BASE}/fassadenreinigung-wohngebaeude-resultat.avif`,
        alt: "Ergebnis der Fassadenreinigung an einem Wohngebäude",
      },
      {
        src: `${BASE}/fassadenreinigung-wohnhaus-ergebnis.avif`,
        alt: "Gereinigte Fassade eines Wohnhauses als Endergebnis",
      },
      {
        src: `${BASE}/fassade-gebaeudereinigung-sauber.avif`,
        alt: "Saubere Gebäudefassade nach der Reinigung",
      },
    ],
  },
}

export function getServiceMedia(slug: string): ServiceMedia | undefined {
  return serviceMedia[slug]
}
