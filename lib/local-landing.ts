import type { Audience, LocationId } from "@/lib/locations"

export type CityId = "trier" | "bitburg" | "luxemburg"

export interface City {
  id: CityId
  name: string
  location: LocationId
  /** Orte rund um die Stadt, die ebenfalls bedient werden. */
  nearby: string[]
  /** Kurzer Hinweis zur Betreibergesellschaft/Region, wird auf der Seite angezeigt. */
  operatorNote: string
}

export const CITY_IDS: CityId[] = ["trier", "bitburg", "luxemburg"]

export const cities: Record<CityId, City> = {
  trier: {
    id: "trier",
    name: "Trier",
    location: "de",
    nearby: ["Konz", "Schweich", "Igel", "Trierweiler", "Longuich", "Saarburg", "Ehrang", "Olewig"],
    operatorNote: "Einsätze in Trier und der Region organisieren wir direkt für Sie, mit festen Ansprechpartnern.",
  },
  bitburg: {
    id: "bitburg",
    name: "Bitburg",
    location: "de",
    nearby: ["Speicher", "Kyllburg", "Neuerburg", "Irrel", "Prüm", "Mettendorf", "Echternacherbrück"],
    operatorNote: "Einsätze in Bitburg und der Südeifel organisieren wir direkt für Sie, mit festen Ansprechpartnern.",
  },
  luxemburg: {
    id: "luxemburg",
    name: "Luxemburg",
    location: "lu",
    nearby: [
      "Kirchberg",
      "Gasperich",
      "Bonnevoie",
      "Strassen",
      "Bertrange",
      "Esch-sur-Alzette",
      "Mersch",
      "Echternach",
      "Diekirch",
      "Waldbillig",
    ],
    operatorNote: "Aufträge in Luxemburg führen wir über die BLITZEBLANK S.à r.l. mit Sitz in Waldbillig aus.",
  },
}

export type LocalServiceSlug =
  | "fensterreinigung"
  | "fassadenreinigung"
  | "industriereinigung"
  | "unterhaltsreinigung"
  | "spezialreinigung"
  | "steinreinigung"
  | "solarreinigung"
  | "reinigungsnotdienst"
  | "treppenhausreinigung"

interface Faq {
  question: string
  answer: string
}

export interface LocalService {
  slug: LocalServiceSlug
  /** Hauptkeyword, z. B. "Fensterreinigung". */
  keyword: string
  audiences: Audience[]
  /** Städte, in denen diese Leistung angeboten wird. */
  cities: CityId[]
  /** Kurze Stichpunkte, was zur Leistung gehört. */
  topics: string[]
  /** Beschreibung der Leistung, gilt für alle Standorte. */
  block: string
  /** Leistungsspezifische FAQ; "{city}" wird durch den Ortsnamen ersetzt. */
  faq: Faq
  /** Optionaler Link zu einem eigenen Angebots-Tool. */
  quoteLink?: { href: string; label: string }
}

export interface LocalCombo {
  /** Einleitung für Hero und erste Sektion. */
  lead: string
  /** Individueller Text zu Standort, Zielgruppen und Besonderheiten. */
  local: string
}

export const localServices: Record<LocalServiceSlug, LocalService> = {
  fensterreinigung: {
    slug: "fensterreinigung",
    keyword: "Fensterreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: [
      "Fenster und Rahmen inklusive Fensterbänken",
      "Pergolen und Wintergärten",
      "Glasüberdachungen und Vordächer",
      "Rollläden, Jalousien und Raffstores",
      "Fliegengitter",
    ],
    block:
      "Bei der Fensterreinigung arbeiten wir mit professionellem Equipment: Glas, Rahmen und Fensterbänke werden gründlich gereinigt, damit am Ende weder Streifen noch Wasserränder zurückbleiben. Für hohe oder schwer zugängliche Glasflächen setzen wir passendes Zubehör ein, sodass Sie sich nicht selbst auf die Leiter stellen müssen. Sie entscheiden, ob wir einmalig kommen oder in festen Intervallen, zum Beispiel monatlich, quartalsweise oder zweimal im Jahr.",
    faq: {
      question: "Wie oft sollten Fenster professionell gereinigt werden?",
      answer:
        "Für Wohnhäuser genügt häufig ein Rhythmus von ein- bis zweimal pro Jahr. Büros, Geschäfte und Schaufenster werden oft monatlich oder quartalsweise gereinigt. Nach der Besichtigung empfehlen wir Ihnen einen passenden Turnus für Ihr Objekt in {city}.",
    },
  },
  fassadenreinigung: {
    slug: "fassadenreinigung",
    keyword: "Fassadenreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: [
      "Reinigung von Putz-, Klinker- und Natursteinfassaden",
      "Entfernung von Algen, Moos und Grünbelag",
      "Dachrinnenreinigung",
      "Dachrinneninspektion",
    ],
    block:
      "Wetter, Staub und Feuchtigkeit hinterlassen mit der Zeit Spuren an jeder Fassade: Grünbelag, Algen und graue Schleier lassen ein Gebäude ungepflegt wirken. Wir prüfen zuerst Material und Zustand der Fläche und wählen dann ein passendes, möglichst schonendes Reinigungsverfahren. Zusätzlich reinigen und kontrollieren wir Ihre Dachrinnen, damit Wasser sicher abläuft und keine Feuchtigkeitsschäden entstehen.",
    faq: {
      question: "Welche Fassaden können Sie reinigen?",
      answer:
        "Wir reinigen Putz-, Klinker-, Naturstein- und Verbundfassaden bei Wohnhäusern und Gewerbeobjekten. Welches Verfahren geeignet ist, klären wir bei der Besichtigung vor Ort in {city}.",
    },
  },
  industriereinigung: {
    slug: "industriereinigung",
    keyword: "Industriereinigung",
    audiences: ["gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: [
      "Zertifizierte Reinraumreinigung",
      "Reinigung von Produktionshallen und Industrieflächen",
      "Maschinenreinigung",
      "Hallenböden, Lager und Werkstätten",
      "Decken-, Wand- und Lüftungsreinigung",
    ],
    block:
      "Industriereinigung bedeutet, dass Hygiene, Sicherheit und Betriebsablauf zusammenpassen müssen. Wir stimmen die Einsatzzeiten so ab, dass Ihre Produktion möglichst wenig unterbrochen wird, und halten die Sicherheits- und Hygienevorschriften Ihres Betriebs ein. Ob Hallenboden, Maschinenpark, Lager oder Reinraum: Wir planen Umfang, Intervalle und Verfahren gemeinsam mit Ihnen und führen nach dem Einsatz eine dokumentierte Qualitätskontrolle durch.",
    faq: {
      question: "Reinigen Sie auch während des laufenden Betriebs?",
      answer:
        "Je nach Bereich ist das möglich. Wir stimmen die Einsatzzeiten mit Ihnen ab, etwa in Randzeiten oder am Wochenende, damit Ihre Abläufe in {city} möglichst wenig gestört werden.",
    },
  },
  unterhaltsreinigung: {
    slug: "unterhaltsreinigung",
    keyword: "Unterhaltsreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: [
      "Bürogebäude",
      "Bildungs- und Gesundheitseinrichtungen",
      "Gastronomiebetriebe",
      "Geschäfte und Verkaufsflächen",
      "Kindergärten und Schulen",
      "Privathaushalte",
      "Individuell vereinbarte Reinigungsintervalle",
    ],
    block:
      "Unterhaltsreinigung bedeutet: Sie bekommen feste Termine und ein gleichbleibend sauberes Ergebnis, ohne sich jedes Mal um die Organisation kümmern zu müssen. Wir legen gemeinsam fest, welche Räume, Flächen und Aufgaben zum Leistungsumfang gehören und in welchem Rhythmus wir kommen, vom täglichen Einsatz bis zur wöchentlichen Reinigung. Feste Ansprechpartner und ein klar definierter Leistungsumfang sorgen für verlässliche Qualität.",
    faq: {
      question: "Können wir den Reinigungsrhythmus selbst festlegen?",
      answer:
        "Ja. Die Intervalle vereinbaren wir individuell, von mehrmals pro Woche bis zu wöchentlichen oder monatlichen Einsätzen. Auch Reinigungszeiten außerhalb Ihrer Öffnungszeiten sind in {city} möglich.",
    },
  },
  spezialreinigung: {
    slug: "spezialreinigung",
    keyword: "Spezialreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: [
      "Grundreinigung",
      "Bauendreinigung",
      "Polsterreinigung",
      "Entrümpelung",
      "Reinigung nach Veranstaltungen und Feiern",
    ],
    block:
      "Nicht jede Reinigung ist Routine. Beim Einzug, nach einem Umbau, nach einer Feier oder wenn ein Raum entrümpelt werden muss, braucht es einen Einsatz, der über die normale Unterhaltsreinigung hinausgeht. Wir besichtigen die Situation, schätzen den Aufwand realistisch ein und erledigen die Arbeit zu einem vereinbarten Termin, damit Räume danach wieder sofort genutzt werden können.",
    faq: {
      question: "Wann lohnt sich eine Grundreinigung?",
      answer:
        "Zum Beispiel vor einem Einzug oder Auszug, nach einer Renovierung oder wenn sich über Jahre Schmutz festgesetzt hat. Wir beraten Sie in {city} gern, welche Maßnahme sinnvoll ist.",
    },
  },
  steinreinigung: {
    slug: "steinreinigung",
    keyword: "Steinreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: [
      "Naturstein- und Pflastersteinreinigung",
      "Reinigung von Steinmauern",
      "Terrassenreinigung",
      "Entfernung von Ölflecken auf geeigneten Steinflächen",
    ],
    block:
      "Grünbelag, Moos, Ablagerungen und Flecken lassen Terrassen, Einfahrten und Mauern schnell ungepflegt aussehen und machen glatte Stellen rutschig. Wir reinigen Naturstein, Pflaster und Mauern fachgerecht und wählen das Verfahren passend zu Material und Verschmutzung, sodass Fugen und Oberfläche geschont werden. Auf Wunsch erhalten Sie vorab eine Einschätzung des Aufwands.",
    faq: {
      question: "Wie lange hält das Ergebnis einer Terrassenreinigung?",
      answer:
        "Das hängt von Lage, Material und Witterung ab: Schattige, feuchte Bereiche bewachsen schneller. Nach der Reinigung geben wir Ihnen Hinweise, wie Sie das Ergebnis in {city} möglichst lange erhalten.",
    },
    quoteLink: { href: "/stein-angebot", label: "Zum Online-Angebotsersteller für Steinreinigung" },
  },
  solarreinigung: {
    slug: "solarreinigung",
    keyword: "Solarreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: ["Reinigung von Solaranlagen", "Reinigung von Photovoltaikanlagen", "Dachanlagen und Freiflächenanlagen"],
    block:
      "Staub, Pollen, Vogelkot und Moos setzen sich auf Modulen ab und können die Leistung Ihrer Anlage mindern. Wir reinigen Solar- und Photovoltaikanlagen schonend, mit passendem Verfahren und ohne die Modulflächen zu beschädigen. Sie erhalten eine saubere Anlage, die wieder gleichmäßig Licht aufnehmen kann, sowohl bei Dachanlagen als auch bei größeren Freiflächen.",
    faq: {
      question: "Wie oft sollte eine Photovoltaikanlage gereinigt werden?",
      answer:
        "Das hängt von Neigung, Umgebung und Verschmutzung ab. Häufig reicht eine Reinigung alle ein bis zwei Jahre, bei starkem Bewuchs oder Vogelkot kann eine frühere Reinigung sinnvoll sein. Wir schauen uns Ihre Anlage in {city} gern an.",
    },
  },
  reinigungsnotdienst: {
    slug: "reinigungsnotdienst",
    keyword: "Reinigungsnotdienst",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg", "luxemburg"],
    topics: ["Hilfe bei dringendem Reinigungsbedarf", "Kurzfristige Einsätze nach Verfügbarkeit"],
    block:
      "Manchmal kann Reinigung nicht warten: vor einem wichtigen Termin, nach einem Vorfall im Betrieb, nach einer Feier oder wenn kurzfristig Räume übergeben werden müssen. Unser Reinigungsnotdienst unterstützt Sie bei dringendem Bedarf. Wir übernehmen kurzfristige Einsätze nach Verfügbarkeit, klären am Telefon, was nötig ist, und sagen Ihnen offen, wann wir bei Ihnen sein können.",
    faq: {
      question: "Wie schnell können Sie kommen?",
      answer:
        "Kurzfristige Einsätze übernehmen wir nach Verfügbarkeit. Rufen Sie uns an, dann nennen wir Ihnen ehrlich, wann ein Einsatz in {city} möglich ist.",
    },
  },
  treppenhausreinigung: {
    slug: "treppenhausreinigung",
    keyword: "Treppenhausreinigung",
    audiences: ["privat", "gewerbe"],
    cities: ["trier", "bitburg"],
    topics: [
      "Treppenstufen und Podeste",
      "Eingangsbereiche und Flure",
      "Handläufe und Geländer",
      "Regelmäßige Reinigung nach festem Plan",
    ],
    block:
      "Ein gepflegtes Treppenhaus ist die Visitenkarte jedes Hauses. Wir reinigen Stufen, Podeste, Handläufe, Eingangsbereiche und Flure nach einem festen Plan, den wir gemeinsam mit Hausverwaltung, Eigentümern oder Vermietern festlegen. So bleibt der Gemeinschaftsbereich dauerhaft sauber, ohne dass sich Bewohner um Putzpläne kümmern müssen.",
    faq: {
      question: "In welchen Regionen bieten Sie Treppenhausreinigung an?",
      answer:
        "Derzeit in Deutschland, also in {city} und Umgebung. In Luxemburg bieten wir diese Leistung aktuell nicht an.",
    },
  },
}

export const localCombos: Record<LocalServiceSlug, Partial<Record<CityId, LocalCombo>>> = {
  fensterreinigung: {
    trier: {
      lead: "Sie suchen eine zuverlässige Fensterreinigung in Trier? Wir reinigen Fenster, Glasflächen und Zubehör für Privathaushalte, Büros, Praxen und Geschäfte in der Stadt und im Umland, streifenfrei und zu festen Terminen.",
      local:
        "In Trier prägen Altbauten mit vielen kleinen Fenstern, Sprossenfenster in der Innenstadt und große Schaufenster in der Fußgängerzone das Bild. Das verlangt unterschiedliche Vorgehensweisen: Schaufenster sollen zu den Öffnungszeiten makellos sein, Altbaufenster brauchen Sorgfalt an Rahmen und Fensterbänken. Auch in Wohngebieten wie Trier-Süd, Olewig oder Ehrang reinigen wir Fenster, Wintergärten und Rollläden für Eigentümer und Mieter.",
    },
    bitburg: {
      lead: "Fensterreinigung in Bitburg und der Südeifel: Wir reinigen Fenster, Glasflächen, Wintergärten und Rollläden für Wohnhäuser, Betriebe und öffentliche Einrichtungen, wahlweise einmalig oder regelmäßig.",
      local:
        "In Bitburg und den umliegenden Gemeinden dominieren Einfamilienhäuser mit großen Fensterfronten, Wintergärten und Terrassentüren, daneben Geschäfte in der Innenstadt, Arztpraxen und Betriebe in den Gewerbegebieten. Gerade bei freistehenden Häusern mit viel Glas lohnt sich ein fester Reinigungsrhythmus. Die Eifel bringt Pollen, Staub und Regen mit sich, weshalb viele Kunden ihre Fenster nach dem Winter und im Spätsommer reinigen lassen.",
    },
    luxemburg: {
      lead: "Fensterreinigung in Luxemburg für Büros, Geschäfte, Praxen und Privathaushalte: Über unsere Gesellschaft BLITZEBLANK S.à r.l. reinigen wir Glasflächen jeder Größe zuverlässig und mit festen Terminen.",
      local:
        "Luxemburg ist geprägt von modernen Büro- und Geschäftsgebäuden mit großen Glasfassaden, etwa in Kirchberg, Gasperich oder in der Innenstadt, und gleichzeitig von Wohnhäusern und Residenzen mit Wintergärten und Terrassen. Für Büros und Geschäfte vereinbaren wir feste Intervalle, damit Eingangsbereiche und Schaufenster immer einen gepflegten Eindruck machen. Privatkunden profitieren von klar vereinbarten Terminen, auch in den Gemeinden rund um die Hauptstadt.",
    },
  },
  fassadenreinigung: {
    trier: {
      lead: "Fassadenreinigung in Trier für Wohnhäuser, Mehrfamilienhäuser und Gewerbeobjekte: Wir entfernen Grünbelag, Algen und Schmutz und reinigen auf Wunsch gleich die Dachrinnen mit.",
      local:
        "In Trier und im Moseltal sorgen Feuchtigkeit und die Nähe zu Wald und Weinbergen dafür, dass Fassaden, vor allem auf der Wetterseite und im Schatten, schnell Grünbelag ansetzen. Dazu kommen Sandsteinsockel sowie Putz- und Klinkerflächen an Altbauten und Neubauten. Wir prüfen vorab Material und Zustand und empfehlen ein Verfahren, das zur Fläche passt. Typische Aufträge sind Reihen- und Mehrfamilienhäuser, Geschäftshäuser in der Innenstadt und Wohnhäuser im Trierer Umland.",
    },
    bitburg: {
      lead: "Fassadenreinigung in Bitburg und Umgebung: Wir reinigen Putz-, Klinker- und Steinfassaden sowie Dachrinnen an Wohnhäusern, Höfen und Betriebsgebäuden.",
      local:
        "Die Eifel ist feucht und windig, Fassaden an freistehenden Häusern, Scheunen und Hallen bekommen viel Wetter ab. Moos, Algen und Staub setzen sich dort schnell fest, und verstopfte Dachrinnen unter Laub und Nadeln können Feuchtigkeitsschäden begünstigen. Deshalb kombinieren wir in Bitburg und Umgebung gern Fassadenreinigung mit Dachrinnenreinigung und Dachrinneninspektion und stimmen den Einsatz mit der Jahreszeit ab.",
    },
    luxemburg: {
      lead: "Fassadenreinigung in Luxemburg für Gewerbeimmobilien, Wohnanlagen und Einfamilienhäuser: gründlich, materialgerecht und mit klaren Terminen.",
      local:
        "In Luxemburg stehen Fassaden besonders im Blick: Bürogebäude, Geschäftshäuser und gepflegte Wohnanlagen prägen das Stadtbild, und ein sauberes Gebäude ist für Eigentümer und Verwaltungen Teil des Auftritts. Wir reinigen Putz-, Stein- und Verbundfassaden und kontrollieren bei Bedarf gleich die Dachrinnen. Für Hausverwaltungen und Eigentümergemeinschaften erstellen wir ein klares Angebot, das Fläche, Verfahren und Termin transparent ausweist.",
    },
  },
  industriereinigung: {
    trier: {
      lead: "Industriereinigung in Trier für Produktionsbetriebe, Lager, Werkstätten und Logistik: Wir reinigen Hallenböden, Maschinen und Industrieflächen nach Ihren Hygiene- und Sicherheitsvorgaben.",
      local:
        "Trier und die Region verbinden Handwerk, Mittelstand, Logistik und Zulieferbetriebe. Für solche Betriebe zählen verlässliche Einsatzzeiten: Wir reinigen in Randzeiten oder am Wochenende, damit Produktion und Auslieferung nicht stehen. Typische Einsätze in Trier sind die regelmäßige Hallenbodenreinigung, die Reinigung von Maschinen und Werkstätten sowie Grundreinigungen vor Umzügen oder Umbauten. Nach dem Einsatz stimmen wir die Qualität gemeinsam mit Ihnen ab.",
    },
    bitburg: {
      lead: "Industriereinigung in Bitburg und der Eifel: Wir reinigen Produktionshallen, Lager, Werkstätten und Industrieflächen für Betriebe in der Region.",
      local:
        "Bitburg ist ein wichtiger Wirtschaftsstandort der Eifel mit Lebensmittel- und Getränkeherstellung, Zulieferbetrieben, Handwerk und Logistik. Gerade in der Lebensmittel- und Getränkebranche gelten hohe Hygieneanforderungen, die wir bei Planung und Durchführung berücksichtigen. Wir stimmen mit Ihrer Betriebsleitung ab, welche Bereiche in welchem Rhythmus gereinigt werden, und arbeiten so, dass Ihre Abläufe möglichst ungestört bleiben. Auch Betriebe in den umliegenden Gemeinden betreuen wir.",
    },
    luxemburg: {
      lead: "Industriereinigung in Luxemburg für Industrie, Logistik und Technologiebetriebe: Reinraum-, Hallen- und Maschinenreinigung über unsere Gesellschaft BLITZEBLANK S.à r.l.",
      local:
        "Luxemburgs Wirtschaft reicht von Industrie und Logistik in Gewerbezonen wie Contern oder Bettemburg bis zu Laboren, Technologie- und Pharmabetrieben, in denen strenge Hygieneregeln gelten. Hier ist die zertifizierte Reinraumreinigung ebenso gefragt wie die regelmäßige Reinigung von Produktionshallen und Maschinen. Wir stimmen Umfang, Intervalle und Einsatzzeiten mit Ihnen ab und stellen sicher, dass Dokumentation und Qualitätskontrolle zu Ihren internen Vorgaben passen.",
    },
  },
  unterhaltsreinigung: {
    trier: {
      lead: "Unterhaltsreinigung in Trier: regelmäßige Reinigung von Büros, Praxen, Geschäften, Gastronomie, Schulen und Privathaushalten zu festen Terminen.",
      local:
        "Für Büros und Praxen in Trier zählt, dass morgens alles sauber ist, wenn der Betrieb startet. Wir reinigen deshalb außerhalb Ihrer Arbeitszeiten und legen den Rhythmus gemeinsam fest, vom täglichen Einsatz bis zur wöchentlichen Reinigung. Als Universitäts- und Touristenstadt hat Trier außerdem viele Gastronomiebetriebe, Geschäfte und Einrichtungen mit hohem Publikumsverkehr, bei denen regelmäßige Pflege den Unterschied macht. Auch Privathaushalte in Trier und Umgebung können Unterhaltsreinigung bei uns buchen.",
    },
    bitburg: {
      lead: "Unterhaltsreinigung in Bitburg und Umgebung: feste Reinigungstermine für Büros, Praxen, Schulen, Kindergärten, Geschäfte und Haushalte.",
      local:
        "Als Kreisstadt hat Bitburg viele Verwaltungen, Arztpraxen, Schulen und Kindergärten sowie Geschäfte und Gastronomiebetriebe, die regelmäßig gereinigt werden wollen. Wir arbeiten nach einem festen Plan mit klar definiertem Leistungsumfang und festen Ansprechpartnern. Die Intervalle legen wir individuell mit Ihnen fest. Auch in den umliegenden Orten der Südeifel übernehmen wir Unterhaltsreinigung für Betriebe und Privathaushalte.",
    },
    luxemburg: {
      lead: "Unterhaltsreinigung in Luxemburg für Büros, Kanzleien, Geschäfte, Restaurants und Privathaushalte: verlässlich, diskret und zu festen Terminen.",
      local:
        "In Luxemburg arbeiten viele Unternehmen mit Büros, Kanzleien und Praxen, in denen ein gepflegtes Umfeld zum professionellen Auftritt gehört. Wir reinigen außerhalb der Arbeitszeiten, arbeiten diskret und vereinbaren feste Termine und Intervalle. Die Abstimmung läuft unkompliziert und mit einem festen Ansprechpartner, damit Sie sich auf das Tagesgeschäft konzentrieren können. Auch Privathaushalte in der Hauptstadt und Umgebung betreuen wir.",
    },
  },
  spezialreinigung: {
    trier: {
      lead: "Spezialreinigung in Trier: Grundreinigung, Bauendreinigung, Polsterreinigung, Entrümpelung und Reinigung nach Veranstaltungen für Privat- und Gewerbekunden.",
      local:
        "In Trier sind einmalige Reinigungseinsätze oft mit Umzügen, Wohnungsübergaben, Renovierungen oder Veranstaltungen verbunden. Vermieter, Hausverwaltungen und Mieter brauchen eine Grundreinigung zur Übergabe, Bauunternehmen und Eigentümer eine Bauendreinigung nach dem Umbau, Gastronomie und Veranstalter eine Reinigung nach Feiern und Events. Wir besichtigen die Situation, nennen Ihnen einen klaren Preis und führen den Einsatz zum vereinbarten Termin aus.",
    },
    bitburg: {
      lead: "Spezialreinigung in Bitburg und Umgebung: einmalige Reinigungseinsätze wie Grundreinigung, Bauendreinigung, Polsterreinigung und Entrümpelung.",
      local:
        "Rund um Bitburg wird viel gebaut, saniert und umgezogen, vom Einfamilienhaus bis zum Betriebsgebäude. Dabei fallen Aufgaben an, die kein Alltagsputz sind: die Bauendreinigung nach dem Umbau, die Grundreinigung vor dem Einzug, die Polsterreinigung oder eine Entrümpelung von Keller, Dachboden oder Lager. Wir kommen in Bitburg und den umliegenden Orten zum vereinbarten Termin, damit Räume danach wieder genutzt werden können.",
    },
    luxemburg: {
      lead: "Spezialreinigung in Luxemburg: Grundreinigung, Bauendreinigung, Polsterreinigung, Entrümpelung und Reinigung nach Veranstaltungen.",
      local:
        "Luxemburg ist eine Stadt in Bewegung: Büros werden umgebaut, Wohnungen gewechselt, Neubauten fertiggestellt. Dafür bieten wir einmalige Spezialreinigungen an, etwa die Bauendreinigung nach der Fertigstellung, die Grundreinigung bei Ein- oder Auszug, die Polsterreinigung oder die Reinigung nach Veranstaltungen und Feiern. Wir schätzen den Aufwand bei einer Besichtigung ein und halten die vereinbarten Termine ein, damit Übergaben pünktlich klappen.",
    },
  },
  steinreinigung: {
    trier: {
      lead: "Steinreinigung in Trier: Wir reinigen Naturstein, Pflaster, Mauern und Terrassen für Hauseigentümer, Hausverwaltungen und Gewerbe.",
      local:
        "Stein ist in Trier allgegenwärtig, von der Römerzeit bis zu den Sandstein- und Natursteinmauern in Gärten und an Hängen. Auch private Terrassen, Einfahrten und Hofflächen bestehen oft aus Pflaster oder Naturstein und setzen im feuchten Moselklima schnell Grünbelag an. Wir reinigen solche Flächen materialgerecht, entfernen auf geeigneten Steinflächen Ölflecken und geben Hinweise zur Pflege.",
    },
    bitburg: {
      lead: "Steinreinigung in Bitburg und der Eifel: Terrassen, Hofeinfahrten, Pflasterflächen und Natursteinmauern fachgerecht reinigen lassen.",
      local:
        "In der Eifel gehören Natursteinmauern, gepflasterte Hofeinfahrten und große Terrassen zu vielen Häusern. Regen, Laub und Schatten lassen Grünbelag und Moos entstehen, die Flächen rutschig machen. Wir reinigen Pflaster, Naturstein und Mauern in Bitburg und Umgebung materialgerecht und schonen dabei Fugen und Oberfläche. Auch Firmengelände, Parkplätze und Eingangsbereiche reinigen wir auf Anfrage.",
    },
    luxemburg: {
      lead: "Steinreinigung in Luxemburg: Terrassen, Natursteinflächen, Pflaster und Mauern für Privathäuser, Residenzen und Firmengelände.",
      local:
        "In Luxemburg sind hochwertige Naturstein- und Pflasterflächen an Einfahrten, Terrassen und Eingängen weit verbreitet. Damit sie dauerhaft gepflegt wirken, reinigen wir sie materialgerecht, ohne die Oberfläche zu beschädigen. Wir arbeiten für Hauseigentümer, Hausverwaltungen und Unternehmen und vereinbaren vorab Umfang und Termin. Auch Ölflecken auf geeigneten Steinflächen entfernen wir.",
    },
  },
  solarreinigung: {
    trier: {
      lead: "Solarreinigung in Trier: Wir reinigen Photovoltaik- und Solaranlagen auf Dächern und Freiflächen schonend und fachgerecht.",
      local:
        "Immer mehr Hausdächer in Trier und Umgebung tragen Photovoltaikanlagen. Gerade in der Nähe von Bäumen, Weinbergen und Hängen sammeln sich Pollen, Laub, Staub und Vogelkot auf den Modulen. Wir reinigen die Anlagen so, dass die Oberfläche geschont wird, und besprechen vorher Zugang und Sicherheit auf dem Dach. Für Eigentümer von Einfamilienhäusern ebenso wie für Betreiber von Gewerbedächern bieten wir feste Termine.",
    },
    bitburg: {
      lead: "Solarreinigung in Bitburg und Umgebung: Reinigung von Photovoltaikanlagen auf Wohn-, Landwirtschafts- und Gewerbedächern.",
      local:
        "In der Südeifel sind Photovoltaikanlagen auf Wohnhäusern, Hallen und landwirtschaftlichen Gebäuden weit verbreitet. Staub vom Feld, Pollen, Laub und Vogelkot lagern sich auf den Modulen ab, besonders bei flacher Neigung. Wir reinigen Ihre Anlage in Bitburg und den umliegenden Orten schonend und stimmen Zeitpunkt und Intervall mit Ihnen ab, damit Ihre Module wieder gleichmäßig Licht aufnehmen.",
    },
    luxemburg: {
      lead: "Solarreinigung in Luxemburg: Reinigung von Solar- und Photovoltaikanlagen auf Dächern von Wohnhäusern, Betrieben und Wohnanlagen.",
      local:
        "Auch in Luxemburg investieren Eigentümer und Unternehmen in Solaranlagen auf Wohn- und Gewerbedächern. Damit die Anlage ihr Potenzial ausschöpfen kann, sollten die Module sauber bleiben. Wir reinigen Solar- und Photovoltaikanlagen schonend, besprechen vorab Zugang und Sicherheit und vereinbaren Termine, die zu Ihrem Betrieb oder Alltag passen. Das gilt für Einfamilienhäuser ebenso wie für größere Dachflächen.",
    },
  },
  reinigungsnotdienst: {
    trier: {
      lead: "Reinigungsnotdienst in Trier: Hilfe bei dringendem Reinigungsbedarf, mit kurzfristigen Einsätzen nach Verfügbarkeit.",
      local:
        "Wenn in Trier kurzfristig Räume übergeben werden, ein Restaurant vor der Eröffnung sauber sein muss oder nach einer Veranstaltung schnell aufgeräumt werden soll, zählt jede Stunde. Rufen Sie uns an: Wir klären am Telefon, was nötig ist, und nennen Ihnen offen, wann wir einen Einsatz in Trier und Umgebung einplanen können. Dringende Einsätze übernehmen wir nach Verfügbarkeit.",
    },
    bitburg: {
      lead: "Reinigungsnotdienst in Bitburg: kurzfristige Reinigungseinsätze für Betriebe, Praxen und Privathaushalte nach Verfügbarkeit.",
      local:
        "Auch in Bitburg und der Südeifel gibt es Situationen, in denen Reinigung nicht warten kann: eine kurzfristige Übergabe, ein Termin mit Kundschaft, ein Vorfall im Betrieb oder eine Feier mit anschließendem Aufräumen. Wir unterstützen Betriebe, Praxen, Gastronomie und Privathaushalte bei dringendem Bedarf. Schildern Sie uns die Lage kurz, und wir melden uns mit einer ehrlichen Einschätzung, wann wir bei Ihnen sein können.",
    },
    luxemburg: {
      lead: "Reinigungsnotdienst in Luxemburg: Unterstützung bei dringendem Reinigungsbedarf, kurzfristige Einsätze nach Verfügbarkeit.",
      local:
        "In Luxemburg laufen Übergaben, Eröffnungen und Termine oft eng getaktet. Wenn ein Büro, ein Geschäft oder eine Wohnung kurzfristig gereinigt werden muss, unterstützen wir Sie über unsere Gesellschaft BLITZEBLANK S.à r.l. Wir übernehmen dringende Einsätze nach Verfügbarkeit, klären den Umfang telefonisch und geben Ihnen eine klare Rückmeldung zu Termin und Ablauf.",
    },
  },
  treppenhausreinigung: {
    trier: {
      lead: "Treppenhausreinigung in Trier: regelmäßige Reinigung von Treppenhäusern, Eingangsbereichen und Fluren für Hausverwaltungen, Eigentümergemeinschaften und Vermieter.",
      local:
        "In Trier gibt es viele Mehrfamilienhäuser und Wohnanlagen, von Altbauten in der Innenstadt bis zu Mietshäusern in Trier-West, Trier-Nord oder Ehrang. Hausverwaltungen und Eigentümergemeinschaften schätzen einen festen Reinigungsplan, der Treppen, Podeste, Handläufe und Eingänge dauerhaft gepflegt hält. Wir kommen zu festen Terminen, stimmen den Rhythmus mit der Verwaltung ab und sorgen für einen Eindruck, der Mieter und Besucher überzeugt.",
    },
    bitburg: {
      lead: "Treppenhausreinigung in Bitburg: feste Reinigungstermine für Mehrfamilienhäuser, Wohnanlagen und Geschäftshäuser.",
      local:
        "In Bitburg und den umliegenden Orten gibt es Mehrfamilienhäuser, Wohnanlagen und Geschäftshäuser, deren Treppenhäuser regelmäßig gepflegt werden müssen. Wir reinigen Stufen, Flure, Eingänge und Handläufe nach einem festen Plan, den wir mit Hausverwaltung oder Eigentümern abstimmen. Die Treppenhausreinigung bieten wir derzeit in Deutschland an, also in Bitburg, der Südeifel und im Raum Trier.",
    },
  },
}

export interface LocalLandingParam {
  slug: LocalServiceSlug
  ort: CityId
}

export function getLocalLandingParams(): LocalLandingParam[] {
  return (Object.keys(localServices) as LocalServiceSlug[]).flatMap((slug) =>
    localServices[slug].cities.map((ort) => ({ slug, ort })),
  )
}

export function getLocalLanding(slug: string, ort: string) {
  const service = localServices[slug as LocalServiceSlug]
  const city = cities[ort as CityId]
  if (!service || !city || !service.cities.includes(city.id)) return null
  const combo = localCombos[service.slug][city.id]
  if (!combo) return null
  return { service, city, combo }
}

export function getLocalLandingPath(slug: LocalServiceSlug, ort: CityId) {
  return `/leistungen/${slug}/${ort}`
}

export function audienceText(audiences: Audience[]) {
  return audiences.length > 1 ? "Privat- und Gewerbekunden" : audiences[0] === "gewerbe" ? "Unternehmen und Gewerbekunden" : "Privatkunden"
}
