import type { Locale } from "@/lib/i18n"

export type ExtraServiceSlug =
  | "unterhaltsreinigung"
  | "treppenhausreinigung"
  | "spezialreinigung"
  | "solarreinigung"
  | "reinigungsnotdienst"

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
      heading: "Unterhaltsreinigung für Gewerbe, Einrichtungen und Privathaushalte",
      subtitle:
        "Regelmäßig saubere Räume zu festen Terminen - zuverlässig, diskret und genau auf Ihren Bedarf abgestimmt. Für Gewerbe- und Privatkunden in Luxemburg und Deutschland.",
      metaTitle: "Unterhaltsreinigung für Gewerbe & Privathaushalte in Luxemburg & Deutschland | Blitzeblank",
      metaDescription:
        "Regelmäßige Unterhaltsreinigung für Büros, Gastronomie, Geschäfte, Schulen, Gesundheitseinrichtungen und Privathaushalte in Luxemburg sowie in Trier, Bitburg und Region. Individuelle Intervalle, klares Festangebot.",
      features: [
        { title: "Bürogebäude", description: "Schreibtische, Böden, Küchen und Besprechungsräume - täglich, wöchentlich oder nach Bedarf." },
        { title: "Bildungs- und Gesundheitseinrichtungen", description: "Hygienisch und diskret, abgestimmt auf Betriebsabläufe und Anforderungen Ihrer Einrichtung." },
        { title: "Gastronomiebetriebe", description: "Gepflegte Gasträume, Küchenbereiche und Sanitäranlagen - angepasst an Ihre Öffnungszeiten." },
        { title: "Geschäfte und Verkaufsflächen", description: "Gepflegte Verkaufsräume, Eingangsbereiche und Schaufenster für einen guten ersten Eindruck." },
        { title: "Kindergärten und Schulen", description: "Gründliche Reinigung von Klassen-, Gruppen- und Sanitärräumen für ein sauberes Umfeld." },
        { title: "Privathaushalte", description: "Regelmäßige Reinigung Ihres Zuhauses - zuverlässig, vertrauensvoll und zu Ihrem Rhythmus." },
        { title: "Individuelle Reinigungsintervalle", description: "Täglich, wöchentlich, 14-tägig oder monatlich - Sie bestimmen, wie oft wir kommen." },
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
      heading: "Maintenance Cleaning for Businesses, Institutions and Private Households",
      subtitle:
        "Consistently clean premises on fixed schedules - reliable, discreet and tailored to your needs. For business and private customers in Luxembourg and Germany.",
      metaTitle: "Maintenance Cleaning for Businesses & Households in Luxembourg & Germany | Blitzeblank",
      metaDescription:
        "Regular maintenance cleaning for offices, restaurants, shops, schools, healthcare facilities and private households in Luxembourg and in Trier, Bitburg and the region. Individual intervals, clear fixed-price quote.",
      features: [
        { title: "Office Buildings", description: "Desks, floors, kitchens and meeting rooms - daily, weekly or as needed." },
        { title: "Educational and Healthcare Facilities", description: "Hygienic and discreet, aligned with the operations and requirements of your facility." },
        { title: "Restaurants and Catering", description: "Well-kept dining areas, kitchens and restrooms - adapted to your opening hours." },
        { title: "Shops and Retail Spaces", description: "Well-kept sales areas, entrances and shop windows for a great first impression." },
        { title: "Kindergartens and Schools", description: "Thorough cleaning of classrooms, group rooms and restrooms for a clean environment." },
        { title: "Private Households", description: "Regular cleaning of your home - reliable, trustworthy and to your rhythm." },
        { title: "Individual Cleaning Intervals", description: "Daily, weekly, every two weeks or monthly - you decide how often we come." },
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
      heading: "Nettoyage d'entretien pour entreprises, établissements et ménages privés",
      subtitle:
        "Des locaux propres en continu, à dates fixes - fiable, discret et adapté à vos besoins. Pour entreprises et particuliers au Luxembourg et en Allemagne.",
      metaTitle: "Nettoyage d'entretien pour entreprises et particuliers au Luxembourg et en Allemagne | Blitzeblank",
      metaDescription:
        "Nettoyage d'entretien régulier pour bureaux, restaurants, commerces, écoles, établissements de santé et ménages privés au Luxembourg ainsi qu'à Trèves, Bitburg et dans la région. Intervalles individuels, devis à prix fixe.",
      features: [
        { title: "Bâtiments de bureaux", description: "Bureaux, sols, cuisines et salles de réunion - tous les jours, chaque semaine ou selon vos besoins." },
        { title: "Établissements d'enseignement et de santé", description: "Hygiénique et discret, adapté au fonctionnement et aux exigences de votre établissement." },
        { title: "Établissements de restauration", description: "Salles, cuisines et sanitaires soignés - adaptés à vos horaires d'ouverture." },
        { title: "Commerces et surfaces de vente", description: "Espaces de vente, entrées et vitrines soignés pour une excellente première impression." },
        { title: "Crèches et écoles", description: "Nettoyage minutieux des salles de classe, de groupe et des sanitaires pour un environnement propre." },
        { title: "Ménages privés", description: "Nettoyage régulier de votre domicile - fiable, de confiance et à votre rythme." },
        { title: "Intervalles individuels", description: "Tous les jours, chaque semaine, tous les 14 jours ou chaque mois - vous décidez de la fréquence." },
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
  spezialreinigung: {
    de: {
      title: "Spezialreinigung & ergänzende Dienstleistungen",
      heading: "Spezialreinigung und ergänzende Dienstleistungen",
      subtitle:
        "Für besondere Anlässe und einmalige Einsätze: von der Grundreinigung bis zur Entrümpelung. Für Privat- und Gewerbekunden in Luxemburg und Deutschland.",
      metaTitle: "Spezialreinigung, Grundreinigung & Bauendreinigung | Blitzeblank",
      metaDescription:
        "Treppenhausreinigung, Grundreinigung, Bauendreinigung, Polsterreinigung, Entrümpelung und Reinigung nach Veranstaltungen in Luxemburg sowie in Trier, Bitburg und Region.",
      features: [
        { title: "Treppenhausreinigung", description: "Regelmäßig saubere Treppenhäuser, Flure und Eingänge. Aktuell in Deutschland." },
        { title: "Grundreinigung", description: "Gründliche Reinigung von Räumen und Flächen - beim Einzug, Auszug oder als Neustart." },
        { title: "Bauendreinigung", description: "Feinreinigung nach Neubau, Umbau oder Renovierung - bezugsfertig übergeben." },
        { title: "Polsterreinigung", description: "Schonende Reinigung von Sofas, Sesseln, Stühlen und weiteren Polstermöbeln." },
        { title: "Entrümpelung", description: "Räumung von Wohnungen, Kellern, Dachböden und Gewerbeflächen." },
        { title: "Reinigung nach Veranstaltungen und Feiern", description: "Wir bringen Räume und Außenflächen nach Ihrem Event wieder in Ordnung." },
      ],
      benefits: [
        "Eine Ansprechperson für alle Zusatzleistungen",
        "Einmalige Einsätze oder kombinierbar mit regelmäßiger Reinigung",
        "Kostenlose Besichtigung und klares Angebot",
        "Für Privat- und Gewerbekunden",
        "Kombinierbar mit Fenster-, Fassaden- und Unterhaltsreinigung",
      ],
      process: [
        { step: "Anfrage", description: "Sie beschreiben Objekt, Umfang und Wunschtermin" },
        { step: "Besichtigung", description: "Bei Bedarf kostenlose Begehung vor Ort" },
        { step: "Angebot", description: "Transparentes Angebot mit klarem Preis" },
        { step: "Durchführung", description: "Zuverlässige Umsetzung zum vereinbarten Termin" },
      ],
    },
    en: {
      title: "Special Cleaning & Additional Services",
      heading: "Special Cleaning and Additional Services",
      subtitle:
        "For special occasions and one-off jobs: from deep cleaning to clearance. For private and business customers in Luxembourg and Germany.",
      metaTitle: "Special Cleaning, Deep Cleaning & Post-Construction Cleaning | Blitzeblank",
      metaDescription:
        "Stairwell cleaning, deep cleaning, post-construction cleaning, upholstery cleaning, clearance and cleaning after events in Luxembourg and in Trier, Bitburg and the region.",
      features: [
        { title: "Stairwell Cleaning", description: "Regularly clean stairwells, corridors and entrances. Currently in Germany." },
        { title: "Deep Cleaning", description: "Thorough cleaning of rooms and surfaces - for moving in, moving out or a fresh start." },
        { title: "Post-Construction Cleaning", description: "Fine cleaning after new builds, conversions or renovations - handed over ready to move in." },
        { title: "Upholstery Cleaning", description: "Gentle cleaning of sofas, armchairs, chairs and other upholstered furniture." },
        { title: "Clearance", description: "Clearing of apartments, basements, attics and commercial spaces." },
        { title: "Cleaning After Events and Celebrations", description: "We put rooms and outdoor areas back in order after your event." },
      ],
      benefits: [
        "One contact for all additional services",
        "One-off jobs or combinable with regular cleaning",
        "Free inspection and a clear quote",
        "For private and business customers",
        "Combinable with window, facade and maintenance cleaning",
      ],
      process: [
        { step: "Inquiry", description: "You describe the property, scope and preferred date" },
        { step: "Inspection", description: "Free on-site walkthrough if needed" },
        { step: "Quote", description: "Transparent quote with a clear price" },
        { step: "Execution", description: "Reliable service on the agreed date" },
      ],
    },
    fr: {
      title: "Nettoyage spécial et prestations complémentaires",
      heading: "Nettoyage spécial et prestations complémentaires",
      subtitle:
        "Pour les occasions spéciales et les interventions ponctuelles : du nettoyage en profondeur au débarras. Pour particuliers et entreprises au Luxembourg et en Allemagne.",
      metaTitle: "Nettoyage spécial, en profondeur et de fin de chantier | Blitzeblank",
      metaDescription:
        "Nettoyage de cages d'escalier, nettoyage en profondeur, de fin de chantier, de rembourrés, débarras et nettoyage après événements au Luxembourg ainsi qu'à Trèves, Bitburg et dans la région.",
      features: [
        { title: "Nettoyage de cages d'escalier", description: "Cages d'escalier, couloirs et entrées propres en continu. Actuellement en Allemagne." },
        { title: "Nettoyage en profondeur", description: "Nettoyage minutieux des pièces et surfaces - à l'emménagement, au déménagement ou pour un nouveau départ." },
        { title: "Nettoyage de fin de chantier", description: "Nettoyage fin après construction, transformation ou rénovation - livré prêt à l'emploi." },
        { title: "Nettoyage de rembourrés", description: "Nettoyage en douceur de canapés, fauteuils, chaises et autres meubles rembourrés." },
        { title: "Débarras", description: "Débarras d'appartements, de caves, de greniers et de locaux professionnels." },
        { title: "Nettoyage après événements et fêtes", description: "Nous remettons salles et espaces extérieurs en ordre après votre événement." },
      ],
      benefits: [
        "Un seul interlocuteur pour toutes les prestations complémentaires",
        "Interventions ponctuelles ou combinables avec un nettoyage régulier",
        "Visite gratuite et devis clair",
        "Pour particuliers et entreprises",
        "Combinable avec le nettoyage de vitres, de façades et d'entretien",
      ],
      process: [
        { step: "Demande", description: "Vous décrivez le site, l'étendue et la date souhaitée" },
        { step: "Visite", description: "Visite gratuite sur place si nécessaire" },
        { step: "Devis", description: "Devis transparent avec un prix clair" },
        { step: "Exécution", description: "Réalisation fiable à la date convenue" },
      ],
    },
  },
  solarreinigung: {
    de: {
      title: "Solar- & Photovoltaikreinigung",
      heading: "Reinigung von Solar- und Photovoltaikanlagen",
      subtitle:
        "Schonende Reinigung Ihrer Anlage auf Dach oder Freifläche - für Privat- und Gewerbekunden in Luxemburg und Deutschland.",
      metaTitle: "Solar- & Photovoltaikreinigung in Luxemburg & Deutschland | Blitzeblank",
      metaDescription:
        "Professionelle Reinigung von Solaranlagen und Photovoltaikanlagen für Privat- und Gewerbekunden in Luxemburg sowie in Trier, Bitburg und Region.",
      features: [
        { title: "Reinigung von Solaranlagen", description: "Schonende Reinigung von Solarmodulen auf Dächern und Freiflächen." },
        { title: "Reinigung von Photovoltaikanlagen", description: "Entfernung von Staub, Pollen, Vogelkot und Verschmutzungen von Photovoltaikmodulen." },
        { title: "Schonende Verfahren", description: "Arbeiten mit geeignetem Wasser und weichen Bürsten, abgestimmt auf Ihre Module." },
        { title: "Einfamilienhaus bis Gewerbedach", description: "Für kleine Dachanlagen ebenso wie für große Gewerbeflächen." },
      ],
      benefits: [
        "Schonend für Module und Montagesystem",
        "Für Privat- und Gewerbekunden",
        "Kombinierbar mit Fenster- und Fassadenreinigung",
        "Klares Angebot nach Rücksprache",
      ],
      process: [
        { step: "Anfrage", description: "Anlage, Standort und Zugang beschreiben" },
        { step: "Angebot", description: "Transparentes Angebot für Ihre Anlage" },
        { step: "Reinigung", description: "Fachgerechte Reinigung zum vereinbarten Termin" },
      ],
    },
    en: {
      title: "Solar & Photovoltaic Cleaning",
      heading: "Cleaning of Solar and Photovoltaic Systems",
      subtitle:
        "Gentle cleaning of your system on the roof or open site - for private and business customers in Luxembourg and Germany.",
      metaTitle: "Solar & Photovoltaic Cleaning in Luxembourg & Germany | Blitzeblank",
      metaDescription:
        "Professional cleaning of solar and photovoltaic systems for private and business customers in Luxembourg and in Trier, Bitburg and the region.",
      features: [
        { title: "Cleaning of Solar Systems", description: "Gentle cleaning of solar modules on roofs and open sites." },
        { title: "Cleaning of Photovoltaic Systems", description: "Removal of dust, pollen, bird droppings and soiling from photovoltaic modules." },
        { title: "Gentle Methods", description: "Working with suitable water and soft brushes, matched to your modules." },
        { title: "Family Homes to Commercial Roofs", description: "For small rooftop systems as well as large commercial areas." },
      ],
      benefits: [
        "Gentle on modules and mounting system",
        "For private and business customers",
        "Combinable with window and facade cleaning",
        "Clear quote after consultation",
      ],
      process: [
        { step: "Inquiry", description: "Describe the system, location and access" },
        { step: "Quote", description: "Transparent quote for your system" },
        { step: "Cleaning", description: "Professional cleaning on the agreed date" },
      ],
    },
    fr: {
      title: "Nettoyage solaire et photovoltaïque",
      heading: "Nettoyage d'installations solaires et photovoltaïques",
      subtitle:
        "Nettoyage en douceur de votre installation sur toiture ou terrain - pour particuliers et entreprises au Luxembourg et en Allemagne.",
      metaTitle: "Nettoyage solaire et photovoltaïque au Luxembourg et en Allemagne | Blitzeblank",
      metaDescription:
        "Nettoyage professionnel d'installations solaires et photovoltaïques pour particuliers et entreprises au Luxembourg ainsi qu'à Trèves, Bitburg et dans la région.",
      features: [
        { title: "Nettoyage d'installations solaires", description: "Nettoyage en douceur des modules solaires sur toitures et terrains." },
        { title: "Nettoyage d'installations photovoltaïques", description: "Élimination de la poussière, du pollen, des fientes et des salissures sur les modules photovoltaïques." },
        { title: "Méthodes douces", description: "Travail avec une eau adaptée et des brosses douces, selon vos modules." },
        { title: "De la maison au toit professionnel", description: "Pour les petites installations en toiture comme pour les grandes surfaces professionnelles." },
      ],
      benefits: [
        "Doux pour les modules et le système de fixation",
        "Pour particuliers et entreprises",
        "Combinable avec le nettoyage de vitres et de façades",
        "Devis clair après concertation",
      ],
      process: [
        { step: "Demande", description: "Décrivez l'installation, le lieu et l'accès" },
        { step: "Devis", description: "Devis transparent pour votre installation" },
        { step: "Nettoyage", description: "Nettoyage professionnel à la date convenue" },
      ],
    },
  },
  reinigungsnotdienst: {
    de: {
      title: "Reinigungsnotdienst",
      heading: "Reinigungsnotdienst bei dringendem Bedarf",
      subtitle:
        "Wenn es schnell gehen muss: Wir helfen bei dringendem Reinigungsbedarf und übernehmen kurzfristige Einsätze nach Verfügbarkeit. Für Privat- und Gewerbekunden.",
      metaTitle: "Reinigungsnotdienst in Luxemburg & Deutschland | Blitzeblank",
      metaDescription:
        "Kurzfristige Reinigungseinsätze bei dringendem Bedarf in Luxemburg sowie in Trier, Bitburg und Region. Einsätze nach Verfügbarkeit - jetzt anfragen.",
      features: [
        { title: "Hilfe bei dringendem Reinigungsbedarf", description: "Wir unterstützen Sie, wenn Räume oder Flächen schnellstmöglich gereinigt werden müssen." },
        { title: "Kurzfristige Einsätze", description: "Einsätze nach Verfügbarkeit - Sie schildern uns den Bedarf, wir melden uns zeitnah." },
        { title: "Für Privat- und Gewerbekunden", description: "Ob Wohnung, Büro, Geschäft oder Betrieb." },
      ],
      benefits: [
        "Schnelle Rückmeldung auf Ihre Anfrage",
        "Einsätze nach Verfügbarkeit",
        "Klare Absprache zu Umfang und Preis",
        "Bei Bedarf Übergang in regelmäßige Reinigung",
      ],
      process: [
        { step: "Anfrage", description: "Dringlichkeit, Ort und Umfang schildern" },
        { step: "Rückmeldung", description: "Wir prüfen die Verfügbarkeit und melden uns" },
        { step: "Einsatz", description: "Schnelle Durchführung nach Absprache" },
      ],
    },
    en: {
      title: "Emergency Cleaning Service",
      heading: "Emergency Cleaning for Urgent Needs",
      subtitle:
        "When it has to be quick: we help with urgent cleaning needs and take short-notice jobs subject to availability. For private and business customers.",
      metaTitle: "Emergency Cleaning Service in Luxembourg & Germany | Blitzeblank",
      metaDescription:
        "Short-notice cleaning jobs for urgent needs in Luxembourg and in Trier, Bitburg and the region. Jobs subject to availability - request now.",
      features: [
        { title: "Help with Urgent Cleaning Needs", description: "We support you when rooms or surfaces need to be cleaned as soon as possible." },
        { title: "Short-Notice Jobs", description: "Jobs subject to availability - tell us what you need and we will get back to you promptly." },
        { title: "For Private and Business Customers", description: "Whether apartment, office, shop or business." },
      ],
      benefits: [
        "Quick response to your inquiry",
        "Jobs subject to availability",
        "Clear agreement on scope and price",
        "Transition into regular cleaning if needed",
      ],
      process: [
        { step: "Inquiry", description: "Describe urgency, location and scope" },
        { step: "Response", description: "We check availability and get back to you" },
        { step: "Job", description: "Prompt execution as agreed" },
      ],
    },
    fr: {
      title: "Service de nettoyage d'urgence",
      heading: "Nettoyage d'urgence en cas de besoin pressant",
      subtitle:
        "Quand il faut aller vite : nous aidons en cas de besoin urgent de nettoyage et assurons des interventions à court terme selon disponibilité. Pour particuliers et entreprises.",
      metaTitle: "Service de nettoyage d'urgence au Luxembourg et en Allemagne | Blitzeblank",
      metaDescription:
        "Interventions de nettoyage à court terme en cas de besoin urgent au Luxembourg ainsi qu'à Trèves, Bitburg et dans la région. Selon disponibilité - demandez maintenant.",
      features: [
        { title: "Aide en cas de besoin urgent", description: "Nous vous aidons lorsque des locaux ou surfaces doivent être nettoyés au plus vite." },
        { title: "Interventions à court terme", description: "Selon disponibilité - décrivez votre besoin, nous revenons vers vous rapidement." },
        { title: "Pour particuliers et entreprises", description: "Appartement, bureau, commerce ou entreprise." },
      ],
      benefits: [
        "Réponse rapide à votre demande",
        "Interventions selon disponibilité",
        "Accord clair sur l'étendue et le prix",
        "Passage à un nettoyage régulier si nécessaire",
      ],
      process: [
        { step: "Demande", description: "Décrivez l'urgence, le lieu et l'étendue" },
        { step: "Réponse", description: "Nous vérifions la disponibilité et revenons vers vous" },
        { step: "Intervention", description: "Réalisation rapide selon accord" },
      ],
    },
  },
}
