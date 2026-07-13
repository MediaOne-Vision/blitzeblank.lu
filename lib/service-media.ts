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
      src: `${BASE}/fassadenreinigung-mehrfamilienhaus-sauber-nachher.avif`,
      alt: "Saubere, helle Mehrfamilienhaus-Fassade nach der Fassadenreinigung in Luxemburg",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/fassadenreinigung-mehrfamilienhaus-veralgt-vorher.avif`,
        afterSrc: `${BASE}/fassadenreinigung-mehrfamilienhaus-sauber-nachher.avif`,
        beforeAlt: "Veralgte und verschmutzte Mehrfamilienhaus-Fassade mit Schmutzstreifen vor der Reinigung",
        afterAlt: "Saubere, helle Mehrfamilienhaus-Fassade nach der Fassadenreinigung",
        caption: "Mehrfamilienhaus – Algen, Grünbelag und Schmutzstreifen restlos entfernt",
      },
      {
        beforeSrc: `${BASE}/fassadenreinigung-einfamilienhaus-veralgt-vorher.avif`,
        afterSrc: `${BASE}/fassadenreinigung-einfamilienhaus-gereinigt-nachher.avif`,
        beforeAlt: "Gelbe Einfamilienhaus-Fassade mit veralgtem, verschmutztem Giebel vor der Reinigung",
        afterAlt: "Saubere gelbe Einfamilienhaus-Fassade nach der Fassadenreinigung",
        caption: "Einfamilienhaus – veralgter Giebel wieder strahlend sauber",
      },
      {
        beforeSrc: `${BASE}/fassadenreinigung-putzfassade-fensterband-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/fassadenreinigung-putzfassade-fensterband-sauber-nachher.avif`,
        beforeAlt: "Verschmutzte Putzfassade mit Fensterband und dunklen Ablagerungen vor der Reinigung",
        afterAlt: "Gereinigte, helle Putzfassade mit Fensterband nach der Reinigung",
        caption: "Putzfassade – Umweltablagerungen schonend entfernt",
      },
      {
        beforeSrc: `${BASE}/fassadenreinigung-industriehalle-trennwand-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/fassadenreinigung-industriehalle-trennwand-sauber-nachher.avif`,
        beforeAlt: "Vergilbte, verschmutzte Trennwand in einer Industriehalle vor der Reinigung",
        afterAlt: "Gereinigte, helle Trennwand in einer Industriehalle nach der Reinigung",
        caption: "Industriehalle – Wandflächen wieder hell und gepflegt",
      },
    ],
    gallery: [],
  },

  steinreinigung: {
    hero: {
      src: `${BASE}/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif`,
      alt: "Gereinigte Naturstein-Terrasse mit Polygonalplatten als Ergebnis der Steinreinigung",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/steinreinigung-natursteinterrasse-polygonalplatten-veralgt-vorher.avif`,
        afterSrc: `${BASE}/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif`,
        beforeAlt: "Veralgte und vermooste Naturstein-Terrasse aus Polygonalplatten vor der Reinigung",
        afterAlt: "Saubere Naturstein-Terrasse aus Polygonalplatten in warmen Sandtönen nach der Reinigung",
        caption: "Natursteinterrasse – Algen und Moos aus den Fugen restlos entfernt",
      },
      {
        beforeSrc: `${BASE}/steinreinigung-granit-eingangsweg-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/steinreinigung-granit-eingangsweg-sauber-nachher.avif`,
        beforeAlt: "Verschmutzter und veralgter Granit-Eingangsweg zur Haustür vor der Reinigung",
        afterAlt: "Sauberer, dunkler Granit-Eingangsweg zur Haustür nach der Reinigung",
        caption: "Eingangsweg – Granitpflaster wieder tiefdunkel und gepflegt",
      },
      {
        beforeSrc: `${BASE}/steinreinigung-sandstein-eingangsstufen-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/steinreinigung-sandstein-eingangsstufen-sauber-nachher.avif`,
        beforeAlt: "Sandstein-Eingangsstufen mit Flecken und Verschmutzungen vor der Reinigung",
        afterAlt: "Saubere, helle Sandstein-Eingangsstufen nach der Reinigung",
        caption: "Sandstein-Stufen – Flecken entfernt, Naturstein aufgehellt",
      },
    ],
    gallery: [
      {
        src: `${BASE}/steinreinigung-gartenweg-pflaster-sauber-nachher.avif`,
        alt: "Sauberer geschwungener Gartenweg aus anthrazitfarbenem Pflaster nach der Steinreinigung",
      },
      {
        src: `${BASE}/steinreinigung-granit-plattenweg-haustuer-sauber.avif`,
        alt: "Gereinigter Granit-Plattenweg zur Haustür nach der Steinreinigung",
      },
      {
        src: `${BASE}/steinreinigung-terrassenfliesen-grossformat-sauber.avif`,
        alt: "Saubere großformatige Terrassenfliesen nach der Reinigung",
      },
      {
        src: `${BASE}/steinreinigung-kleinpflaster-eingang-gereinigt.avif`,
        alt: "Gereinigtes Kleinpflaster im Eingangsbereich nach der Steinreinigung",
      },
      {
        src: `${BASE}/steinreinigung-verbundpflaster-detail-gereinigt.avif`,
        alt: "Detailaufnahme von gereinigtem rot-schwarzem Verbundpflaster",
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
