import type { Locale } from "@/lib/i18n"

export type ExtraServiceSlug = "unterhaltsreinigung" | "treppenhausreinigung"

interface ExtraServiceContent {
  title: string
  heading: string
  subtitle: string
  metaTitle: string
  metaDescription: string
  features: { title: string; description: string }[]
  benefits: string[]
  process: { step: string; description: string }[]
}

export const extraServiceContent: Record<ExtraServiceSlug, Record<Locale, ExtraServiceContent>> = {
  unterhaltsreinigung: {
    de: {
      title: "Unterhaltsreinigung",
      heading: "Unterhaltsreinigung für Büros, Praxen und Gewerbeflächen",
      subtitle:
        "Regelmäßig saubere Räume zu festen Terminen - zuverlässig, diskret und genau auf Ihren Betrieb abgestimmt. Für Gewerbekunden in Luxemburg und Deutschland.",
      metaTitle: "Unterhaltsreinigung für Gewerbe in Luxemburg & Deutschland | Blitzeblank",
      metaDescription:
        "Regelmäßige Unterhaltsreinigung für Büros, Praxen, Geschäfte und Gewerbeflächen in Luxemburg sowie in Trier, Bitburg und Region. Feste Termine, klares Festangebot.",
      features: [
        { title: "Büroreinigung", description: "Schreibtische, Böden, Küchen und Besprechungsräume - täglich, wöchentlich oder nach Bedarf." },
        { title: "Praxen und Kanzleien", description: "Hygienisch und diskret, abgestimmt auf Ihre Öffnungszeiten und Anforderungen." },
        { title: "Geschäfte und Verkaufsflächen", description: "Gepflegte Verkaufsräume, Eingangsbereiche und Schaufenster für einen guten ersten Eindruck." },
        { title: "Sanitär- und Sozialräume", description: "Gründliche Reinigung und Desinfektion von Toiletten, Küchen und Aufenthaltsräumen." },
        { title: "Bodenpflege", description: "Pflege von Hartböden, Teppichen und Treppen - von der Unterhaltsreinigung bis zur Grundreinigung." },
        { title: "Feste Ansprechperson", description: "Ein eingespieltes Team und ein direkter Kontakt für alle Fragen und Sonderwünsche." },
      ],
      benefits: [
        "Feste Reinigungsintervalle nach Ihrem Bedarf",
        "Diskrete Einsätze vor, nach oder während der Betriebszeiten",
        "Kostenlose Objektbesichtigung und klares Festangebot",
        "Geschultes, zuverlässiges Reinigungsteam",
        "Hochwertige, geprüfte Reinigungsmittel",
        "Eine Rechnung für alle Leistungen - auch kombinierbar mit Fenster- und Fassadenreinigung",
      ],
      process: [
        { step: "Anfrage", description: "Sie schildern uns Objekt, Größe und gewünschte Intervalle" },
        { step: "Besichtigung", description: "Kostenlose Begehung vor Ort und Aufnahme der Anforderungen" },
        { step: "Festangebot", description: "Transparentes Angebot mit festem Preis pro Einsatz oder Monat" },
        { step: "Start", description: "Einarbeitung des Teams und Beginn zum vereinbarten Termin" },
        { step: "Laufende Betreuung", description: "Regelmäßige Qualitätskontrolle und feste Ansprechperson" },
      ],
    },
    en: {
      title: "Maintenance Cleaning",
      heading: "Maintenance Cleaning for Offices, Practices and Commercial Spaces",
      subtitle:
        "Consistently clean premises on fixed schedules - reliable, discreet and tailored to your business. For business customers in Luxembourg and Germany.",
      metaTitle: "Maintenance Cleaning for Businesses in Luxembourg & Germany | Blitzeblank",
      metaDescription:
        "Regular maintenance cleaning for offices, practices, shops and commercial spaces in Luxembourg and in Trier, Bitburg and the region. Fixed schedules, clear fixed-price quote.",
      features: [
        { title: "Office Cleaning", description: "Desks, floors, kitchens and meeting rooms - daily, weekly or as needed." },
        { title: "Practices and Law Firms", description: "Hygienic and discreet, aligned with your opening hours and requirements." },
        { title: "Shops and Retail Space", description: "Well-kept sales areas, entrances and shop windows for a great first impression." },
        { title: "Sanitary and Staff Areas", description: "Thorough cleaning and disinfection of restrooms, kitchens and break rooms." },
        { title: "Floor Care", description: "Care for hard floors, carpets and stairs - from regular upkeep to deep cleaning." },
        { title: "Dedicated Contact", description: "A well-rehearsed team and a direct contact for all questions and special requests." },
      ],
      benefits: [
        "Fixed cleaning intervals based on your needs",
        "Discreet service before, after or during business hours",
        "Free on-site inspection and a clear fixed-price quote",
        "Trained, reliable cleaning team",
        "High-quality, tested cleaning products",
        "One invoice for all services - combinable with window and facade cleaning",
      ],
      process: [
        { step: "Inquiry", description: "You tell us about the property, its size and the desired intervals" },
        { step: "Inspection", description: "Free on-site walkthrough to capture your requirements" },
        { step: "Fixed Quote", description: "Transparent quote with a fixed price per visit or per month" },
        { step: "Start", description: "Team briefing and start on the agreed date" },
        { step: "Ongoing Support", description: "Regular quality checks and a dedicated contact person" },
      ],
    },
    fr: {
      title: "Nettoyage d'entretien",
      heading: "Nettoyage d'entretien pour bureaux, cabinets et locaux professionnels",
      subtitle:
        "Des locaux propres en continu, à dates fixes - fiable, discret et adapté à votre activité. Pour les entreprises au Luxembourg et en Allemagne.",
      metaTitle: "Nettoyage d'entretien pour entreprises au Luxembourg et en Allemagne | Blitzeblank",
      metaDescription:
        "Nettoyage d'entretien régulier pour bureaux, cabinets, commerces et locaux professionnels au Luxembourg ainsi qu'à Trèves, Bitburg et dans la région. Dates fixes, devis à prix fixe.",
      features: [
        { title: "Nettoyage de bureaux", description: "Bureaux, sols, cuisines et salles de réunion - tous les jours, chaque semaine ou selon vos besoins." },
        { title: "Cabinets et études", description: "Hygiénique et discret, adapté à vos horaires d'ouverture et à vos exigences." },
        { title: "Commerces et surfaces de vente", description: "Espaces de vente, entrées et vitrines soignés pour une excellente première impression." },
        { title: "Sanitaires et espaces du personnel", description: "Nettoyage minutieux et désinfection des toilettes, cuisines et salles de pause." },
        { title: "Entretien des sols", description: "Entretien des sols durs, moquettes et escaliers - du nettoyage régulier au nettoyage en profondeur." },
        { title: "Interlocuteur dédié", description: "Une équipe rodée et un contact direct pour toutes vos questions et demandes spéciales." },
      ],
      benefits: [
        "Intervalles de nettoyage fixes selon vos besoins",
        "Interventions discrètes avant, après ou pendant les heures d'activité",
        "Visite gratuite sur place et devis à prix fixe clair",
        "Équipe de nettoyage formée et fiable",
        "Produits de nettoyage de qualité et testés",
        "Une seule facture pour toutes les prestations - combinable avec le nettoyage de vitres et de façades",
      ],
      process: [
        { step: "Demande", description: "Vous nous décrivez le site, sa taille et les intervalles souhaités" },
        { step: "Visite", description: "Visite gratuite sur place pour recueillir vos exigences" },
        { step: "Devis fixe", description: "Devis transparent avec un prix fixe par intervention ou par mois" },
        { step: "Démarrage", description: "Briefing de l'équipe et début à la date convenue" },
        { step: "Suivi continu", description: "Contrôles qualité réguliers et interlocuteur dédié" },
      ],
    },
  },
  treppenhausreinigung: {
    de: {
      title: "Treppenhausreinigung",
      heading: "Treppenhausreinigung in Trier, Bitburg und Region",
      subtitle:
        "Saubere Treppenhäuser, Flure und Eingangsbereiche für Mehrfamilienhäuser, Eigentümergemeinschaften und Gewerbeobjekte. Aktuell in Deutschland.",
      metaTitle: "Treppenhausreinigung in Trier, Bitburg & Region | Blitzeblank",
      metaDescription:
        "Regelmäßige Treppenhausreinigung für Mehrfamilienhäuser, Hausverwaltungen und Gewerbeobjekte in Trier, Bitburg und Umgebung. Feste Intervalle, klares Angebot.",
      features: [
        { title: "Treppen und Flure", description: "Gründliche Reinigung von Stufen, Handläufen, Geländern und Fluren." },
        { title: "Eingangsbereiche", description: "Gepflegte Hauseingänge, Fußmatten, Briefkastenanlagen und Glasflächen." },
        { title: "Aufzüge und Kellerzugänge", description: "Reinigung von Aufzugskabinen, Kellergängen und Gemeinschaftsflächen." },
        { title: "Fenster im Treppenhaus", description: "Streifenfreie Reinigung der Treppenhausfenster - auf Wunsch im selben Termin." },
        { title: "Winter- und Sonderdienste", description: "Zusatzleistungen wie Grundreinigung, Bodenpflege oder Entfernung von Verschmutzungen." },
        { title: "Flexible Intervalle", description: "Wöchentlich, 14-tägig oder monatlich - passend zu Ihrer Hausordnung." },
      ],
      benefits: [
        "Feste Reinigungstermine und zuverlässige Durchführung",
        "Für Hausverwaltungen, Eigentümer und Gewerbeobjekte",
        "Klares Festangebot nach kostenloser Besichtigung",
        "Schonende Reinigung für alle Bodenbeläge",
        "Kombinierbar mit Fenster- und Fassadenreinigung",
        "Persönlicher Ansprechpartner vor Ort",
      ],
      process: [
        { step: "Anfrage", description: "Adresse, Stockwerke und gewünschter Rhythmus" },
        { step: "Besichtigung", description: "Kostenlose Begehung des Treppenhauses" },
        { step: "Angebot", description: "Festpreis pro Reinigung oder pro Monat" },
        { step: "Reinigung", description: "Regelmäßige Durchführung zu festen Terminen" },
      ],
    },
    en: {
      title: "Stairwell Cleaning",
      heading: "Stairwell Cleaning in Trier, Bitburg and the Region",
      subtitle:
        "Clean stairwells, corridors and entrance areas for apartment buildings, owner associations and commercial properties. Currently available in Germany.",
      metaTitle: "Stairwell Cleaning in Trier, Bitburg & the Region | Blitzeblank",
      metaDescription:
        "Regular stairwell cleaning for apartment buildings, property managers and commercial properties in Trier, Bitburg and surroundings. Fixed intervals, clear quote.",
      features: [
        { title: "Stairs and Corridors", description: "Thorough cleaning of steps, handrails, banisters and corridors." },
        { title: "Entrance Areas", description: "Well-kept building entrances, doormats, mailbox areas and glass surfaces." },
        { title: "Lifts and Basement Access", description: "Cleaning of lift cabins, basement corridors and shared areas." },
        { title: "Stairwell Windows", description: "Streak-free cleaning of stairwell windows - on request in the same visit." },
        { title: "Special Services", description: "Extras such as deep cleaning, floor care or removal of heavy soiling." },
        { title: "Flexible Intervals", description: "Weekly, every two weeks or monthly - to match your house rules." },
      ],
      benefits: [
        "Fixed cleaning dates and reliable service",
        "For property managers, owners and commercial properties",
        "Clear fixed-price quote after a free inspection",
        "Gentle cleaning for all floor coverings",
        "Combinable with window and facade cleaning",
        "A personal contact on site",
      ],
      process: [
        { step: "Inquiry", description: "Address, number of floors and desired frequency" },
        { step: "Inspection", description: "Free walkthrough of the stairwell" },
        { step: "Quote", description: "Fixed price per cleaning or per month" },
        { step: "Cleaning", description: "Regular service on fixed dates" },
      ],
    },
    fr: {
      title: "Nettoyage de cages d'escalier",
      heading: "Nettoyage de cages d'escalier à Trèves, Bitburg et dans la région",
      subtitle:
        "Des cages d'escalier, couloirs et entrées propres pour les immeubles d'habitation, copropriétés et biens commerciaux. Actuellement disponible en Allemagne.",
      metaTitle: "Nettoyage de cages d'escalier à Trèves, Bitburg et région | Blitzeblank",
      metaDescription:
        "Nettoyage régulier de cages d'escalier pour immeubles, gestionnaires et biens commerciaux à Trèves, Bitburg et environs. Intervalles fixes, devis clair.",
      features: [
        { title: "Escaliers et couloirs", description: "Nettoyage minutieux des marches, mains courantes, rampes et couloirs." },
        { title: "Entrées d'immeuble", description: "Entrées soignées, paillassons, boîtes aux lettres et surfaces vitrées." },
        { title: "Ascenseurs et accès aux caves", description: "Nettoyage des cabines d'ascenseur, couloirs de cave et parties communes." },
        { title: "Fenêtres de la cage d'escalier", description: "Nettoyage sans traces des fenêtres - sur demande lors de la même intervention." },
        { title: "Prestations spéciales", description: "Compléments tels que nettoyage en profondeur, entretien des sols ou élimination de fortes salissures." },
        { title: "Intervalles flexibles", description: "Chaque semaine, tous les 14 jours ou chaque mois - selon votre règlement d'immeuble." },
      ],
      benefits: [
        "Dates de nettoyage fixes et exécution fiable",
        "Pour gestionnaires, propriétaires et biens commerciaux",
        "Devis à prix fixe clair après visite gratuite",
        "Nettoyage délicat pour tous les revêtements de sol",
        "Combinable avec le nettoyage de vitres et de façades",
        "Un interlocuteur personnel sur place",
      ],
      process: [
        { step: "Demande", description: "Adresse, nombre d'étages et fréquence souhaitée" },
        { step: "Visite", description: "Visite gratuite de la cage d'escalier" },
        { step: "Devis", description: "Prix fixe par nettoyage ou par mois" },
        { step: "Nettoyage", description: "Exécution régulière à dates fixes" },
      ],
    },
  },
}
