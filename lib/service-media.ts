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
  unterhaltsreinigung: {
    hero: {
      src: `${BASE}/unterhaltsreinigung-buero-sauber-gepflegt.png`,
      alt: "Sauberes, gepflegtes Büro nach der Unterhaltsreinigung",
    },
    beforeAfter: [],
    gallery: [],
  },
  treppenhausreinigung: {
    hero: {
      src: `${BASE}/treppenhausreinigung-mehrfamilienhaus-treppenhaus-sauber.png`,
      alt: "Sauberes Treppenhaus eines Mehrfamilienhauses nach der Treppenhausreinigung",
    },
    beforeAfter: [],
    gallery: [],
  },
  fensterreinigung: {
    hero: {
      src: `${BASE}/fensterreinigung-terrassenueberdachung-glasdach-gereinigt-nachher.avif`,
      alt: "Streifenfrei gereinigtes Glasdach einer Terrassenüberdachung nach der Fensterreinigung",
    },
    beforeAfter: [
      {
        beforeSrc: `${BASE}/fensterreinigung-dachfenster-oberlicht-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/fensterreinigung-dachfenster-oberlicht-gereinigt-nachher.avif`,
        beforeAlt: "Verschmutztes Dachfenster-Oberlicht mit Flecken vor der Reinigung",
        afterAlt: "Sauber gereinigtes, klares Dachfenster-Oberlicht nach der Reinigung",
        caption: "Dachfenster & Oberlichter – vom Schmutzfilm zur klaren Sicht",
      },
      {
        beforeSrc: `${BASE}/fensterreinigung-terrassenueberdachung-glasdach-verschmutzt-vorher.avif`,
        afterSrc: `${BASE}/fensterreinigung-terrassenueberdachung-glasdach-gereinigt-nachher.avif`,
        beforeAlt: "Verschmutztes Glasdach einer Terrassenüberdachung mit Wasserflecken vor der Reinigung",
        afterAlt: "Klares, streifenfreies Glasdach einer Terrassenüberdachung nach der Reinigung",
        caption: "Terrassenüberdachung – Glasdach wieder glasklar",
      },
      {
        beforeSrc: `${BASE}/fensterreinigung-solaranlage-photovoltaik-veralgt-vorher.avif`,
        afterSrc: `${BASE}/fensterreinigung-solaranlage-photovoltaik-gereinigt-nachher.avif`,
        beforeAlt: "Veralgte und verschmutzte Photovoltaik-Module auf dem Dach vor der Reinigung",
        afterAlt: "Saubere, dunkle Photovoltaik-Module auf dem Dach nach der Reinigung",
        caption: "Photovoltaik & Solarmodule – mehr Ertrag durch saubere Glasflächen",
      },
    ],
    gallery: [
      {
        src: `${BASE}/fensterreinigung-wintergarten-glasanbau-gereinigt.avif`,
        alt: "Gereinigter Glas-Wintergarten mit klaren Glasflächen an einem Wohnhaus",
      },
      {
        src: `${BASE}/fensterreinigung-glasdach-terrasse-gereinigt.avif`,
        alt: "Gereinigtes Glasdach über einer Terrasse mit klarer Sicht in den Himmel",
      },
      {
        src: `${BASE}/fensterreinigung-glasgelaender-sporthalle-gereinigt.avif`,
        alt: "Streifenfrei gereinigtes Glasgeländer und Glaswände in einer Sporthalle",
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
        beforeSrc: `${BASE}/fassadenreinigung-hausfassade-veralgt-schmutzstreifen-vorher.avif`,
        afterSrc: `${BASE}/fassadenreinigung-hausfassade-gelb-gereinigt-nachher.avif`,
        beforeAlt:
          "Verschmutzte Hausfassade mit Algen, Grünbelag und Schmutzstreifen am Sockel vor der Fassadenreinigung",
        afterAlt: "Frisch gereinigte, leuchtend gelbe Hausfassade mit sauberem Sockel nach der Fassadenreinigung",
        caption: "Hausfassade – Algen und Schmutzstreifen entfernt, Putz wieder strahlend",
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
      src: `${BASE}/industriereinigung-reinraum-doppelboden-absaugung.avif`,
      alt: "Mitarbeiter im Schutzanzug bei der Reinraumreinigung und Absaugung unter dem Doppelboden",
    },
    beforeAfter: [],
    gallery: [
      {
        src: `${BASE}/industriereinigung-reinraum-doppelboden-absaugung.avif`,
        alt: "Fachkraft im Reinraum saugt Kabel- und Installationsschächte unter dem Doppelboden ab",
      },
      {
        src: `${BASE}/industriereinigung-reinraum-industriesauger-skyvac.avif`,
        alt: "Industriesauger im Reinraum mit Warnschild „Achtung Stolpergefahr“ während der Reinigung",
      },
    ],
  },
}

export function getServiceMedia(slug: string): ServiceMedia | undefined {
  return serviceMedia[slug]
}
