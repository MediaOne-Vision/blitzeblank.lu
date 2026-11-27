import type { Locale } from "@/lib/i18n"

export type SeoCopy = { title: string; description: string }

/** Titles 30-60 Zeichen, Descriptions 120-155 Zeichen. Schlüssel = kanonischer (deutscher) Pfad. */
export const SEO_COPY: Record<string, Record<Locale, SeoCopy>> = {
  "/": {
    de: {
      title: "Reinigungsfirma Luxemburg, Trier & Bitburg | Blitzeblank",
      description:
        "Professionelle Industrie-, Fenster-, Stein- und Fassadenreinigung in Luxemburg, Trier und Bitburg. Jetzt kostenlose Besichtigung anfragen.",
    },
    en: {
      title: "Cleaning Company Luxembourg, Trier & Bitburg | Blitzeblank",
      description:
        "Professional industrial, window, stone and facade cleaning in Luxembourg, Trier and Bitburg. Request your free on-site assessment today.",
    },
    fr: {
      title: "Entreprise de nettoyage Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage professionnel industriel, de vitres, de pierre et de façades à Luxembourg, Trèves et Bitbourg. Demandez votre visite gratuite.",
    },
  },
  "/leistungen": {
    de: {
      title: "Reinigungsleistungen in Luxemburg & Trier | Blitzeblank",
      description:
        "Industrie-, Fenster-, Stein- und Fassadenreinigung aus einer Hand. Entdecken Sie alle Leistungen und fordern Sie Ihr kostenloses Angebot an.",
    },
    en: {
      title: "Cleaning Services in Luxembourg & Trier | Blitzeblank",
      description:
        "Industrial, window, stone and facade cleaning from a single source. Explore all our services and request your free, no-obligation quote.",
    },
    fr: {
      title: "Prestations de nettoyage Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage industriel, de vitres, de pierre et de façades par un seul prestataire. Découvrez nos prestations et demandez votre devis gratuit.",
    },
  },
  "/leistungen/industriereinigung": {
    de: {
      title: "Industriereinigung Trier, Bitburg & Luxemburg | Blitzeblank",
      description:
        "Professionelle Industriereinigung für Produktionshallen, Lager und Werkstätten in Trier, Bitburg und Luxemburg. Jetzt Besichtigung anfragen.",
    },
    en: {
      title: "Industrial Cleaning in Luxembourg & Trier | Blitzeblank",
      description:
        "Professional industrial cleaning for production halls, warehouses and workshops in Luxembourg. Request your free on-site assessment today.",
    },
    fr: {
      title: "Nettoyage industriel au Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage industriel professionnel pour halls de production, entrepôts et ateliers au Luxembourg. Demandez votre visite gratuite sur place.",
    },
  },
  "/leistungen/unterhaltsreinigung": {
    de: {
      title: "Unterhaltsreinigung Luxemburg, Trier & Bitburg | Blitzeblank",
      description:
        "Regelmäßige Unterhaltsreinigung für Büros, Gastronomie, Schulen und Praxen in Luxemburg, Trier und Bitburg. Jetzt Festangebot anfordern.",
    },
    en: {
      title: "Maintenance Cleaning Luxembourg & Trier | Blitzeblank",
      description:
        "Regular maintenance cleaning for offices, restaurants, shops and schools in Luxembourg, Trier and Bitburg. Request your fixed-price quote now.",
    },
    fr: {
      title: "Nettoyage d'entretien Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage d'entretien régulier pour bureaux, restaurants, commerces et écoles à Luxembourg, Trèves et Bitburg. Demandez votre offre ferme.",
    },
  },
  "/leistungen/treppenhausreinigung": {
    de: {
      title: "Treppenhausreinigung Trier, Bitburg & Umgebung | Blitzeblank",
      description:
        "Zuverlässige Treppenhausreinigung für Mehrfamilienhäuser und Hausverwaltungen in Trier und Bitburg. Feste Intervalle, klares Angebot anfordern.",
    },
    en: {
      title: "Stairwell Cleaning in Trier & Bitburg | Blitzeblank",
      description:
        "Reliable stairwell cleaning for apartment buildings and property managers in Trier, Bitburg and surroundings. Fixed intervals, clear quote.",
    },
    fr: {
      title: "Nettoyage de cages d'escalier Trèves | Blitzeblank",
      description:
        "Nettoyage fiable de cages d'escalier pour immeubles et syndics à Trèves, Bitburg et environs. Intervalles fixes, demandez votre offre claire.",
    },
  },
  "/leistungen/spezialreinigung": {
    de: {
      title: "Spezialreinigung Luxemburg, Trier & Bitburg | Blitzeblank",
      description:
        "Grund-, Bau-, Polster- und Eventreinigung sowie Entrümpelung in Luxemburg, Trier und Bitburg. Jetzt kostenlos und unverbindlich anfragen.",
    },
    en: {
      title: "Special & Deep Cleaning Luxembourg & Trier | Blitzeblank",
      description:
        "Deep, post-construction, upholstery and event cleaning plus clearance in Luxembourg, Trier and Bitburg. Request a free, no-obligation quote.",
    },
    fr: {
      title: "Nettoyage spécialisé Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage de fond, de fin de chantier, de rembourrages et d'événements à Luxembourg, Trèves et Bitburg. Demandez votre offre sans engagement.",
    },
  },
  "/leistungen/solarreinigung": {
    de: {
      title: "Solarreinigung Luxemburg & Deutschland | Blitzeblank",
      description:
        "Schonende Reinigung von Solar- und Photovoltaikanlagen in Luxemburg und Deutschland. Jetzt kostenloses und unverbindliches Angebot anfordern.",
    },
    en: {
      title: "Solar Panel Cleaning Luxembourg & Germany | Blitzeblank",
      description:
        "Gentle cleaning of solar and photovoltaic systems in Luxembourg and Germany. Request your free, no-obligation quote today.",
    },
    fr: {
      title: "Nettoyage solaire Luxembourg & Allemagne | Blitzeblank",
      description:
        "Nettoyage soigneux d'installations solaires et photovoltaïques au Luxembourg et en Allemagne. Demandez votre devis gratuit sans engagement.",
    },
  },
  "/leistungen/reinigungsnotdienst": {
    de: {
      title: "Reinigungsnotdienst Luxemburg & Deutschland | Blitzeblank",
      description:
        "Schnelle Hilfe bei akutem Reinigungsbedarf in Luxemburg und Deutschland – flexibel und kurzfristig. Rufen Sie uns jetzt an oder schreiben Sie uns.",
    },
    en: {
      title: "Emergency Cleaning Luxembourg & Germany | Blitzeblank",
      description:
        "Fast help for urgent cleaning needs in Luxembourg and Germany – flexible and at short notice. Call us now or send us a message.",
    },
    fr: {
      title: "Nettoyage d'urgence Luxembourg & Allemagne | Blitzeblank",
      description:
        "Aide rapide pour vos besoins urgents de nettoyage au Luxembourg et en Allemagne, avec souplesse. Appelez-nous dès maintenant.",
    },
  },
  "/leistungen/fensterreinigung": {
    de: {
      title: "Fensterreinigung Trier, Bitburg & Luxemburg | Blitzeblank",
      description:
        "Professionelle Fensterreinigung für Privat- und Gewerbekunden in Trier, Bitburg und Luxemburg. Kostenlose Besichtigung, klares Festangebot.",
    },
    en: {
      title: "Window Cleaning Luxembourg, Trier & Bitburg | Blitzeblank",
      description:
        "Professional window cleaning for homes, offices and shops in Luxembourg, Trier and Bitburg. Free site visit and a clear fixed-price quote.",
    },
    fr: {
      title: "Nettoyage de vitres Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage de vitres professionnel pour domiciles, bureaux et commerces à Luxembourg, Trèves et Bitburg. Visite gratuite, offre ferme claire.",
    },
  },
  "/leistungen/steinreinigung": {
    de: {
      title: "Steinreinigung Trier, Bitburg & Luxemburg | Blitzeblank",
      description:
        "Fachgerechte Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen in Trier, Bitburg und Luxemburg. Jetzt Angebot anfragen.",
    },
    en: {
      title: "Stone Cleaning in Luxembourg & Trier | Blitzeblank",
      description:
        "Expert cleaning of natural stone, paving, terraces and outdoor areas in Luxembourg, Trier and Bitburg. Request your free quote today.",
    },
    fr: {
      title: "Nettoyage de pierre Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage expert de la pierre naturelle, des pavés, terrasses et espaces extérieurs à Luxembourg et Trèves. Demandez votre devis gratuit.",
    },
  },
  "/leistungen/fassadenreinigung": {
    de: {
      title: "Fassadenreinigung Trier, Bitburg & Luxemburg | Blitzeblank",
      description:
        "Professionelle Fassaden- und Dachrinnenreinigung für Privat- und Gewerbekunden in Trier, Bitburg und Luxemburg. Jetzt Angebot anfragen.",
    },
    en: {
      title: "Facade Cleaning in Luxembourg & Trier | Blitzeblank",
      description:
        "Professional facade cleaning for office buildings and industrial sites in Luxembourg. Request your free on-site assessment and quote today.",
    },
    fr: {
      title: "Nettoyage de façades Luxembourg & Trèves | Blitzeblank",
      description:
        "Nettoyage de façades professionnel pour immeubles de bureaux et sites industriels au Luxembourg. Demandez votre visite et devis gratuits.",
    },
  },
  "/ueber-uns": {
    de: {
      title: "Über uns – Ihr Reinigungsteam in Luxemburg | Blitzeblank",
      description:
        "Lernen Sie Blitzeblank und Gründer Mustapha El-Ali kennen. Erfahren Sie mehr über unsere Werte für professionelle, zuverlässige Reinigung.",
    },
    en: {
      title: "About Us – Your Cleaning Team in Luxembourg | Blitzeblank",
      description:
        "Get to know Blitzeblank and founder Mustapha El-Ali. Learn more about our values for professional and reliable cleaning services.",
    },
    fr: {
      title: "À propos – Votre équipe de nettoyage | Blitzeblank",
      description:
        "Faites connaissance avec Blitzeblank et son fondateur Mustapha El-Ali. Découvrez nos valeurs pour un nettoyage professionnel et fiable.",
    },
  },
  "/kontakt": {
    de: {
      title: "Kontakt – Reinigung Luxemburg & Trier | Blitzeblank",
      description:
        "Fragen zu Industrie-, Fenster-, Stein- oder Fassadenreinigung? Wir melden uns schnell und vereinbaren einen kostenlosen Besichtigungstermin.",
    },
    en: {
      title: "Contact – Cleaning Luxembourg & Trier | Blitzeblank",
      description:
        "Questions about industrial, window, stone or facade cleaning? We reply quickly and arrange a free on-site inspection appointment.",
    },
    fr: {
      title: "Contact – Nettoyage Luxembourg & Trèves | Blitzeblank",
      description:
        "Des questions sur le nettoyage industriel, de vitres, de pierre ou de façades ? Nous répondons vite et organisons une visite gratuite.",
    },
  },
  "/angebot": {
    de: {
      title: "Kostenloses Angebot für Ihre Reinigung | Blitzeblank",
      description:
        "Berechnen Sie in wenigen Schritten Ihren unverbindlichen Richtpreis und fordern Sie ein kostenloses Angebot für Ihre Reinigung an.",
    },
    en: {
      title: "Free Cleaning Quote Online | Blitzeblank Luxembourg",
      description:
        "Calculate your no-obligation price estimate in just a few steps and request a free quote for your cleaning in Luxembourg, Trier and Bitburg.",
    },
    fr: {
      title: "Devis de nettoyage gratuit en ligne | Blitzeblank",
      description:
        "Calculez votre estimation sans engagement en quelques étapes et demandez un devis gratuit pour votre nettoyage à Luxembourg et Trèves.",
    },
  },
  "/stein-angebot": {
    de: {
      title: "Steinpflege-Rechner für Pflaster & Terrasse | Blitzeblank",
      description:
        "Konfigurieren Sie Ihre Pflasterflächen- und Steinpflege Schritt für Schritt – Fläche, Fuge, Schutz und mehr. Kostenlos und unverbindlich.",
    },
    en: {
      title: "Stone Care Calculator for Paving | Blitzeblank",
      description:
        "Configure your paving and stone care step by step – area, joints, protection and weed removal. Free and without obligation.",
    },
    fr: {
      title: "Calculateur d'entretien de pierre | Blitzeblank",
      description:
        "Configurez votre entretien de pavés et de pierre étape par étape – surface, joints, protection et plus. Gratuit et sans engagement.",
    },
  },
  "/impressum": {
    de: {
      title: "Impressum – Angaben zum Anbieter | Blitzeblank",
      description:
        "Impressum und rechtliche Angaben von BLITZEBLANK S.à r.l., Mustapha El-Ali, 6A Rue Michel Rodange, 7681 Waldbillig, Luxemburg.",
    },
    en: {
      title: "Legal Notice – Provider Information | Blitzeblank",
      description:
        "Legal notice and company information for BLITZEBLANK S.à r.l., Mustapha El-Ali, 6A Rue Michel Rodange, 7681 Waldbillig, Luxembourg.",
    },
    fr: {
      title: "Mentions légales – Informations légales | Blitzeblank",
      description:
        "Mentions légales de BLITZEBLANK S.à r.l., Mustapha El-Ali, 6A Rue Michel Rodange, 7681 Waldbillig, Luxembourg. Informations sur l'éditeur.",
    },
  },
  "/datenschutz": {
    de: {
      title: "Datenschutzerklärung – Ihre Daten bei Blitzeblank",
      description:
        "Datenschutzerklärung von Blitzeblank Gebäudereinigung: Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.",
    },
    en: {
      title: "Privacy Policy – Your Data at Blitzeblank",
      description:
        "Privacy policy of Blitzeblank building cleaning: information on how we process your personal data in accordance with the GDPR.",
    },
    fr: {
      title: "Confidentialité – Vos données chez Blitzeblank",
      description:
        "Politique de confidentialité de Blitzeblank, nettoyage de bâtiments : informations sur le traitement de vos données selon le RGPD.",
    },
  },
}
