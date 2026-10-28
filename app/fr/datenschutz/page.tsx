import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Confidentialité | Blitzeblank",
  description:
    "Politique de confidentialité de Blitzeblank, nettoyage de bâtiments. Informations sur le traitement de vos données personnelles conformément au RGPD.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/datenschutz",
    languages: {
      de: "/datenschutz",
      en: "/en/datenschutz",
      fr: "/fr/datenschutz",
    },
  },
}

type Block =
  | { type: "p"; text: string }
  | { type: "sub"; text: string }
  | { type: "list"; items: string[] }

type Section = {
  number: string
  title: string
  blocks: Block[]
}

const sections: Section[] = [
  {
    number: "1",
    title: "La protection des données en bref",
    blocks: [
      { type: "sub", text: "Informations générales" },
      {
        type: "p",
        text: "Les informations suivantes donnent un aperçu simple de ce qu'il advient de vos données personnelles lorsque vous visitez ce site web. Les données personnelles sont toutes les données permettant de vous identifier personnellement. Vous trouverez des informations détaillées sur la protection des données dans notre politique de confidentialité figurant sous ce texte.",
      },
      { type: "sub", text: "Collecte de données sur ce site web" },
      {
        type: "p",
        text: "Qui est responsable de la collecte des données sur ce site web ? Le traitement des données sur ce site web est effectué par l'exploitant du site. Vous trouverez ses coordonnées dans la section « Mention relative au responsable du traitement » de cette politique de confidentialité.",
      },
      {
        type: "p",
        text: "Comment collectons-nous vos données ? D'une part, vos données sont collectées lorsque vous nous les communiquez, par exemple en saisissant des données dans un formulaire de contact. D'autres données sont collectées automatiquement ou après votre consentement lors de votre visite du site par nos systèmes informatiques. Il s'agit principalement de données techniques (par ex. navigateur internet, système d'exploitation ou heure de consultation de la page). Ces données sont collectées automatiquement dès que vous accédez à ce site web.",
      },
      {
        type: "p",
        text: "À quoi servent vos données ? Une partie des données est collectée pour garantir le bon fonctionnement du site web. D'autres données peuvent être utilisées pour analyser votre comportement d'utilisateur. Si des contrats peuvent être conclus ou initiés via le site web, les données transmises sont également traitées pour des offres de contrat, des commandes ou d'autres demandes de prestations.",
      },
      {
        type: "p",
        text: "Quels sont vos droits concernant vos données ? Vous avez à tout moment le droit d'obtenir gratuitement des informations sur l'origine, le destinataire et la finalité de vos données personnelles enregistrées. Vous avez également le droit de demander la rectification ou la suppression de ces données. Si vous avez donné votre consentement au traitement des données, vous pouvez le révoquer à tout moment pour l'avenir. Vous avez en outre le droit, dans certaines circonstances, de demander la limitation du traitement de vos données personnelles. Vous disposez par ailleurs d'un droit de réclamation auprès de l'autorité de contrôle compétente. Pour cela, ainsi que pour toute autre question relative à la protection des données, vous pouvez nous contacter à tout moment.",
      },
      { type: "sub", text: "Outils d'analyse et outils tiers" },
      {
        type: "p",
        text: "Lors de la visite de ce site web, votre comportement de navigation peut faire l'objet d'une évaluation statistique. Cela se fait principalement à l'aide de programmes d'analyse. Vous trouverez des informations détaillées sur ces programmes d'analyse dans la politique de confidentialité ci-dessous.",
      },
    ],
  },
  {
    number: "2",
    title: "Hébergement",
    blocks: [
      { type: "p", text: "Nous hébergeons le contenu de notre site web chez le prestataire suivant :" },
      { type: "sub", text: "Hébergement externe" },
      {
        type: "p",
        text: "Ce site web est hébergé en externe. Les données personnelles collectées sur ce site web sont stockées sur les serveurs du ou des prestataires d'hébergement. Il peut s'agir principalement d'adresses IP, de demandes de contact, de métadonnées et de données de communication, de données contractuelles, de coordonnées, de noms, de données d'accès au site web et d'autres données générées via un site web.",
      },
      {
        type: "p",
        text: "L'hébergement externe est réalisé aux fins d'exécution des contrats avec nos clients potentiels et existants (art. 6, par. 1, point b) du RGPD) et dans l'intérêt d'une mise à disposition sûre, rapide et efficace de notre offre en ligne par un prestataire professionnel (art. 6, par. 1, point f) du RGPD). Si un consentement correspondant a été demandé, le traitement est effectué exclusivement sur la base de l'art. 6, par. 1, point a) du RGPD et de l'art. 25, par. 1 du TDDDG, dans la mesure où le consentement inclut le stockage de cookies ou l'accès à des informations sur le terminal de l'utilisateur (par ex. empreinte numérique de l'appareil) au sens du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
      {
        type: "p",
        text: "Notre ou nos prestataires d'hébergement ne traiteront vos données que dans la mesure nécessaire à l'exécution de leurs obligations contractuelles et suivront nos instructions concernant ces données. Nous utilisons le ou les prestataires d'hébergement suivants :",
      },
      { type: "list", items: ["Mittwald CM Service GmbH & Co. KG", "Königsberger Straße 4-6", "32339 Espelkamp, Allemagne"] },
    ],
  },
  {
    number: "3",
    title: "Informations générales et mentions obligatoires",
    blocks: [
      { type: "sub", text: "Protection des données" },
      {
        type: "p",
        text: "Les exploitants de ces pages prennent la protection de vos données personnelles très au sérieux. Nous traitons vos données personnelles de manière confidentielle et conformément aux dispositions légales relatives à la protection des données ainsi qu'à la présente politique de confidentialité.",
      },
      {
        type: "p",
        text: "Lorsque vous utilisez ce site web, diverses données personnelles sont collectées. Les données personnelles sont des données permettant de vous identifier personnellement. La présente politique de confidentialité explique quelles données nous collectons et à quoi nous les utilisons. Elle explique également comment et dans quel but cela est fait.",
      },
      {
        type: "p",
        text: "Nous attirons votre attention sur le fait que la transmission de données sur Internet (par ex. lors de la communication par e-mail) peut présenter des failles de sécurité. Une protection complète des données contre l'accès par des tiers n'est pas possible.",
      },
      { type: "sub", text: "Mention relative au responsable du traitement" },
      {
        type: "p",
        text: "Le responsable du traitement des données sur ce site web est :",
      },
      {
        type: "list",
        items: [
          "BLITZEBLANK S.à r.l.",
          "Mustapha El-Ali",
          "6A, Rue Michel Rodange",
          "7681 Waldbillig",
          "Téléphone : +352 661 830 493",
          "E-mail : info@blitzeblank.lu",
        ],
      },
      {
        type: "p",
        text: "Le responsable du traitement est la personne physique ou morale qui, seule ou conjointement avec d'autres, détermine les finalités et les moyens du traitement de données personnelles (par ex. noms, adresses e-mail, etc.).",
      },
      { type: "sub", text: "Durée de conservation" },
      {
        type: "p",
        text: "Sauf si une durée de conservation plus précise est indiquée dans la présente politique de confidentialité, vos données personnelles restent chez nous jusqu'à ce que la finalité du traitement des données disparaisse. Si vous faites valoir une demande de suppression légitime ou révoquez votre consentement au traitement des données, vos données seront supprimées, à moins que nous ayons d'autres motifs légalement admissibles de conserver vos données personnelles (par ex. délais de conservation fiscaux ou commerciaux) ; dans ce dernier cas, la suppression intervient après la disparition de ces motifs.",
      },
      { type: "sub", text: "Remarques générales sur les bases juridiques du traitement des données sur ce site web" },
      {
        type: "p",
        text: "Si vous avez consenti au traitement des données, nous traitons vos données personnelles sur la base de l'art. 6, par. 1, point a) du RGPD ou de l'art. 9, par. 2, point a) du RGPD, si des catégories particulières de données sont traitées conformément à l'art. 9, par. 1 du RGPD. En cas de consentement explicite au transfert de données personnelles vers des pays tiers, le traitement est également effectué sur la base de l'art. 49, par. 1, point a) du RGPD. Si vous avez consenti au stockage de cookies ou à l'accès à des informations sur votre terminal (par ex. via l'empreinte numérique de l'appareil), le traitement est en outre effectué sur la base de l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment. Si vos données sont nécessaires à l'exécution d'un contrat ou à la mise en œuvre de mesures précontractuelles, nous traitons vos données sur la base de l'art. 6, par. 1, point b) du RGPD. Nous traitons en outre vos données lorsque cela est nécessaire au respect d'une obligation légale, sur la base de l'art. 6, par. 1, point c) du RGPD. Le traitement peut également être effectué sur la base de notre intérêt légitime conformément à l'art. 6, par. 1, point f) du RGPD. Les bases juridiques applicables dans chaque cas sont indiquées dans les paragraphes suivants de la présente politique de confidentialité.",
      },
      { type: "sub", text: "Destinataires des données personnelles" },
      {
        type: "p",
        text: "Dans le cadre de notre activité, nous collaborons avec différents prestataires externes. Cela nécessite parfois la transmission de données personnelles à ces prestataires. Nous ne transmettons des données personnelles à des tiers que si cela est nécessaire à l'exécution d'un contrat, si nous y sommes légalement tenus (par ex. transmission de données aux autorités fiscales), si nous avons un intérêt légitime à la transmission conformément à l'art. 6, par. 1, point f) du RGPD ou si une autre base juridique autorise la transmission. Lors du recours à des sous-traitants, nous ne transmettons les données personnelles de nos clients que sur la base d'un contrat valide de sous-traitance. En cas de traitement conjoint, un contrat de responsabilité conjointe est conclu.",
      },
      { type: "sub", text: "Révocation de votre consentement au traitement des données" },
      {
        type: "p",
        text: "De nombreux traitements de données ne sont possibles qu'avec votre consentement explicite. Vous pouvez révoquer à tout moment un consentement déjà donné. La licéité du traitement effectué jusqu'à la révocation n'est pas affectée par celle-ci.",
      },
      { type: "sub", text: "Droit d'opposition à la collecte de données dans des cas particuliers et à la prospection directe (art. 21 du RGPD)" },
      {
        type: "p",
        text: "Si le traitement des données est effectué sur la base de l'art. 6, par. 1, point e) ou f) du RGPD, vous avez à tout moment le droit de vous opposer, pour des raisons tenant à votre situation particulière, au traitement de vos données personnelles ; cela vaut également pour le profilage fondé sur ces dispositions. La base juridique respective sur laquelle repose le traitement figure dans la présente politique de confidentialité. Si vous vous opposez, nous ne traiterons plus vos données personnelles concernées, sauf si nous pouvons démontrer des motifs légitimes impérieux pour le traitement qui prévalent sur vos intérêts, droits et libertés, ou si le traitement sert à la constatation, à l'exercice ou à la défense de droits en justice (opposition conformément à l'art. 21, par. 1 du RGPD).",
      },
      {
        type: "p",
        text: "Si vos données personnelles sont traitées à des fins de prospection directe, vous avez le droit de vous opposer à tout moment au traitement des données personnelles vous concernant à de telles fins ; cela vaut également pour le profilage dans la mesure où il est lié à une telle prospection directe. Si vous vous opposez, vos données personnelles ne seront plus utilisées à des fins de prospection directe (opposition conformément à l'art. 21, par. 2 du RGPD).",
      },
      { type: "sub", text: "Droit d'introduire une réclamation auprès de l'autorité de contrôle compétente" },
      {
        type: "p",
        text: "En cas de violation du RGPD, les personnes concernées disposent d'un droit de réclamation auprès d'une autorité de contrôle, notamment dans l'État membre de leur résidence habituelle, de leur lieu de travail ou du lieu de la violation présumée. Le droit de réclamation existe sans préjudice de tout autre recours administratif ou judiciaire.",
      },
      { type: "sub", text: "Droit à la portabilité des données" },
      {
        type: "p",
        text: "Vous avez le droit de recevoir, ou de faire remettre à un tiers, dans un format courant et lisible par machine, les données que nous traitons de manière automatisée sur la base de votre consentement ou en exécution d'un contrat. Si vous demandez le transfert direct des données à un autre responsable du traitement, celui-ci n'aura lieu que dans la mesure où cela est techniquement possible.",
      },
      { type: "sub", text: "Accès, rectification et suppression" },
      {
        type: "p",
        text: "Dans le cadre des dispositions légales applicables, vous avez à tout moment le droit d'obtenir gratuitement des informations sur vos données personnelles enregistrées, leur origine et leurs destinataires ainsi que sur la finalité du traitement, et, le cas échéant, un droit de rectification ou de suppression de ces données. Pour cela, ainsi que pour toute autre question relative aux données personnelles, vous pouvez nous contacter à tout moment.",
      },
      { type: "sub", text: "Droit à la limitation du traitement" },
      {
        type: "p",
        text: "Vous avez le droit de demander la limitation du traitement de vos données personnelles. Vous pouvez pour cela nous contacter à tout moment. Le droit à la limitation du traitement existe dans les cas suivants :",
      },
      {
        type: "list",
        items: [
          "Si vous contestez l'exactitude de vos données personnelles enregistrées chez nous, nous avons généralement besoin de temps pour la vérifier. Pendant la durée de la vérification, vous avez le droit de demander la limitation du traitement de vos données personnelles.",
          "Si le traitement de vos données personnelles était/est illicite, vous pouvez demander la limitation du traitement au lieu de la suppression.",
          "Si nous n'avons plus besoin de vos données personnelles, mais que vous en avez besoin pour la constatation, l'exercice ou la défense de droits en justice, vous avez le droit de demander la limitation du traitement de vos données personnelles au lieu de leur suppression.",
          "Si vous avez formé une opposition conformément à l'art. 21, par. 1 du RGPD, une mise en balance de vos intérêts et des nôtres doit être effectuée. Tant qu'il n'est pas établi quels intérêts prévalent, vous avez le droit de demander la limitation du traitement de vos données personnelles.",
        ],
      },
      {
        type: "p",
        text: "Si vous avez limité le traitement de vos données personnelles, ces données – hormis leur conservation – ne peuvent être traitées qu'avec votre consentement ou pour la constatation, l'exercice ou la défense de droits en justice, ou pour protéger les droits d'une autre personne physique ou morale, ou pour des motifs d'intérêt public important de l'Union européenne ou d'un État membre.",
      },
      { type: "sub", text: "Chiffrement SSL/TLS" },
      {
        type: "p",
        text: "Pour des raisons de sécurité et pour protéger la transmission de contenus confidentiels, tels que des commandes ou des demandes que vous nous envoyez en tant qu'exploitant du site, ce site utilise un chiffrement SSL/TLS. Vous reconnaissez une connexion chiffrée au fait que la ligne d'adresse du navigateur passe de « http:// » à « https:// » et au symbole de cadenas dans votre navigateur. Lorsque le chiffrement SSL/TLS est activé, les données que vous nous transmettez ne peuvent pas être lues par des tiers.",
      },
    ],
  },
  {
    number: "4",
    title: "Collecte de données sur ce site web",
    blocks: [
      { type: "sub", text: "Cookies" },
      {
        type: "p",
        text: "Nos sites web utilisent des « cookies ». Les cookies sont de petits paquets de données et ne causent aucun dommage à votre terminal. Ils sont stockés sur votre terminal soit temporairement pour la durée d'une session (cookies de session), soit de manière permanente (cookies permanents). Les cookies de session sont automatiquement supprimés à la fin de votre visite. Les cookies permanents restent stockés sur votre terminal jusqu'à ce que vous les supprimiez vous-même ou qu'ils soient automatiquement supprimés par votre navigateur.",
      },
      {
        type: "p",
        text: "Les cookies peuvent provenir de nous (cookies propres) ou d'entreprises tierces (cookies tiers). Les cookies tiers permettent l'intégration de certains services d'entreprises tierces dans les sites web (par ex. cookies pour le traitement de services de paiement). Les cookies ont différentes fonctions. De nombreux cookies sont techniquement nécessaires, car certaines fonctions du site web ne fonctionneraient pas sans eux (par ex. la fonction panier ou l'affichage de vidéos). D'autres cookies peuvent servir à évaluer le comportement des utilisateurs ou à des fins publicitaires.",
      },
      {
        type: "p",
        text: "Les cookies nécessaires à la réalisation du processus de communication électronique, à la fourniture de certaines fonctions que vous souhaitez (par ex. pour la fonction panier) ou à l'optimisation du site web (par ex. cookies de mesure d'audience) (cookies nécessaires) sont stockés sur la base de l'art. 6, par. 1, point f) du RGPD, sauf indication d'une autre base juridique. L'exploitant du site a un intérêt légitime à stocker des cookies nécessaires afin de fournir ses services de manière techniquement correcte et optimisée. Si un consentement au stockage de cookies et de technologies de reconnaissance comparables a été demandé, le traitement est effectué exclusivement sur la base de ce consentement (art. 6, par. 1, point a) du RGPD et art. 25, par. 1 du TDDDG) ; le consentement peut être révoqué à tout moment.",
      },
      {
        type: "p",
        text: "Vous pouvez configurer votre navigateur de manière à être informé de l'installation de cookies et à n'autoriser les cookies qu'au cas par cas, à exclure l'acceptation des cookies dans certains cas ou de manière générale, et à activer la suppression automatique des cookies à la fermeture du navigateur. La désactivation des cookies peut limiter les fonctionnalités de ce site web. Vous trouverez dans la présente politique de confidentialité des informations sur les autres cookies et services utilisés sur ce site web.",
      },
      { type: "sub", text: "Consentement avec Usercentrics" },
      {
        type: "p",
        text: "Ce site web utilise la technologie de consentement d'Usercentrics afin d'obtenir votre consentement au stockage de certains cookies sur votre terminal ou à l'utilisation de certaines technologies et de le documenter conformément à la protection des données. Le fournisseur de cette technologie est Usercentrics GmbH, Sendlinger Straße 7, 80331 Munich, site web : https://usercentrics.com/de/ (ci-après « Usercentrics »).",
      },
      {
        type: "p",
        text: "Lorsque vous accédez à notre site web, les données personnelles suivantes sont transmises à Usercentrics : votre ou vos consentements ou la révocation de votre ou vos consentements, votre adresse IP, des informations sur votre navigateur, des informations sur votre terminal, l'heure de votre visite sur le site web et la géolocalisation. Usercentrics enregistre en outre un cookie dans votre navigateur afin de pouvoir vous attribuer les consentements donnés ou leur révocation. Les données ainsi collectées sont conservées jusqu'à ce que vous nous demandiez de les supprimer, que vous supprimiez vous-même le cookie Usercentrics ou que la finalité du stockage disparaisse. Les obligations légales de conservation impératives restent inchangées.",
      },
      {
        type: "p",
        text: "Usercentrics est utilisé pour obtenir les consentements légalement requis pour l'utilisation de certaines technologies. La base juridique est l'art. 6, par. 1, point c) du RGPD. Nous avons conclu un contrat de sous-traitance (DPA) pour l'utilisation du service précité.",
      },
      { type: "sub", text: "Fichiers journaux du serveur" },
      {
        type: "p",
        text: "Le fournisseur des pages collecte et enregistre automatiquement des informations dans des fichiers journaux du serveur, que votre navigateur nous transmet automatiquement. Il s'agit de :",
      },
      {
        type: "list",
        items: [
          "Type et version du navigateur",
          "Système d'exploitation utilisé",
          "URL de provenance (référent)",
          "Nom d'hôte de l'ordinateur accédant",
          "Heure de la requête au serveur",
          "Adresse IP",
        ],
      },
      {
        type: "p",
        text: "Ces données ne sont pas fusionnées avec d'autres sources de données. Ces données sont collectées sur la base de l'art. 6, par. 1, point f) du RGPD. L'exploitant du site a un intérêt légitime à la présentation techniquement correcte et à l'optimisation de son site web – à cette fin, les fichiers journaux du serveur doivent être collectés.",
      },
      { type: "sub", text: "Formulaire de contact" },
      {
        type: "p",
        text: "Si vous nous envoyez des demandes via le formulaire de contact, vos données issues du formulaire, y compris les coordonnées que vous y avez indiquées, sont enregistrées chez nous aux fins de traitement de la demande et en vue d'éventuelles questions complémentaires. Nous ne transmettons pas ces données sans votre consentement.",
      },
      {
        type: "p",
        text: "Le traitement de ces données est effectué sur la base de l'art. 6, par. 1, point b) du RGPD, si votre demande est liée à l'exécution d'un contrat ou nécessaire à la mise en œuvre de mesures précontractuelles. Dans tous les autres cas, le traitement repose sur notre intérêt légitime au traitement efficace des demandes qui nous sont adressées (art. 6, par. 1, point f) du RGPD) ou sur votre consentement (art. 6, par. 1, point a) du RGPD) s'il a été demandé ; le consentement peut être révoqué à tout moment.",
      },
      {
        type: "p",
        text: "Les données que vous saisissez dans le formulaire de contact restent chez nous jusqu'à ce que vous nous demandiez de les supprimer, que vous révoquiez votre consentement au stockage ou que la finalité du stockage disparaisse (par ex. après le traitement de votre demande). Les dispositions légales impératives – notamment les délais de conservation – restent inchangées.",
      },
      { type: "sub", text: "Utilisation de l'IA sur le site web" },
      {
        type: "p",
        text: "Nous utilisons sur notre site web des services et/ou applications reposant sur l'IA. Nous utilisons l'intelligence artificielle (IA) sur notre site web de la manière suivante : v0, pour la création du site web. Si vous interagissez avec des éléments de notre site web utilisant l'intelligence artificielle (par ex. un chatbot) ou entrez en contact avec eux, vos saisies, y compris les métadonnées, sont traitées afin de générer une réponse ou une réaction appropriée.",
      },
      {
        type: "p",
        text: "L'utilisation de ces fonctions reposant sur l'IA est effectuée sur la base de l'art. 6, par. 1, point f) du RGPD. Nous avons un intérêt légitime à utiliser des technologies modernes sur notre site web afin d'améliorer nos services et d'identifier de nouveaux potentiels à partir des interactions avec nos clients. Si un consentement est requis, le traitement est effectué exclusivement sur la base de l'art. 6, par. 1, point a) du RGPD et de l'art. 25, par. 1 du TDDDG. Vous pouvez révoquer votre consentement à tout moment.",
      },
      { type: "sub", text: "Demandes par e-mail, téléphone ou télécopie" },
      {
        type: "p",
        text: "Si vous nous contactez par e-mail, téléphone ou télécopie, votre demande, y compris toutes les données personnelles qui en résultent (nom, demande), sera enregistrée et traitée par nos soins aux fins de traitement de votre requête. Nous ne transmettons pas ces données sans votre consentement.",
      },
      {
        type: "p",
        text: "Le traitement de ces données est effectué sur la base de l'art. 6, par. 1, point b) du RGPD, si votre demande est liée à l'exécution d'un contrat ou nécessaire à la mise en œuvre de mesures précontractuelles. Dans tous les autres cas, le traitement repose sur notre intérêt légitime au traitement efficace des demandes qui nous sont adressées (art. 6, par. 1, point f) du RGPD) ou sur votre consentement (art. 6, par. 1, point a) du RGPD) s'il a été demandé ; le consentement peut être révoqué à tout moment.",
      },
      {
        type: "p",
        text: "Les données que vous nous envoyez par le biais de demandes de contact restent chez nous jusqu'à ce que vous nous demandiez de les supprimer, que vous révoquiez votre consentement au stockage ou que la finalité du stockage disparaisse (par ex. après le traitement de votre demande). Les dispositions légales impératives – notamment les délais légaux de conservation – restent inchangées.",
      },
      { type: "sub", text: "Communication via WhatsApp" },
      {
        type: "p",
        text: "Pour la communication avec nos clients et d'autres tiers, nous utilisons notamment le service de messagerie instantanée WhatsApp. Le fournisseur est WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irlande.",
      },
      {
        type: "p",
        text: "La communication s'effectue via un chiffrement de bout en bout (poste à poste), qui empêche WhatsApp ou d'autres tiers d'accéder au contenu de la communication. WhatsApp a toutefois accès aux métadonnées générées lors du processus de communication (par ex. expéditeur, destinataire et heure). Nous précisons également que, selon ses propres indications, WhatsApp partage des données personnelles de ses utilisateurs avec sa société mère Meta, établie aux États-Unis. Vous trouverez plus de détails sur le traitement des données dans la politique de confidentialité de WhatsApp : https://www.whatsapp.com/legal/#privacy-policy.",
      },
      {
        type: "p",
        text: "L'utilisation de WhatsApp est fondée sur notre intérêt légitime à une communication aussi rapide et efficace que possible avec les clients, prospects et autres partenaires commerciaux et contractuels (art. 6, par. 1, point f) du RGPD). Si un consentement correspondant a été demandé, le traitement des données est effectué exclusivement sur la base du consentement ; celui-ci peut être révoqué à tout moment avec effet pour l'avenir. Nous utilisons WhatsApp dans sa variante « WhatsApp Business ». Nous avons conclu un contrat de sous-traitance (DPA) avec le fournisseur précité.",
      },
    ],
  },
  {
    number: "5",
    title: "Réseaux sociaux",
    blocks: [
      { type: "sub", text: "Outil de partage sécurisé eRecht24" },
      {
        type: "p",
        text: "Les contenus de ce site web peuvent être partagés sur des réseaux sociaux tels que Facebook, X & Co. dans le respect de la protection des données. Ce site utilise à cet effet l'outil de partage sécurisé eRecht24. Cet outil n'établit un contact direct entre les réseaux et les utilisateurs que lorsque l'utilisateur clique activement sur l'un de ces boutons. Le clic sur le bouton vaut consentement au sens de l'art. 6, par. 1, point a) du RGPD et de l'art. 25, par. 1 du TDDDG. Ce consentement peut être révoqué à tout moment avec effet pour l'avenir.",
      },
      {
        type: "p",
        text: "Cet outil ne transmet pas automatiquement de données d'utilisateur aux exploitants de ces plateformes. Si l'utilisateur est connecté à l'un des réseaux sociaux, une fenêtre d'information apparaît lors de l'utilisation des éléments de réseaux sociaux de Facebook, X & Co., dans laquelle l'utilisateur peut confirmer le texte avant l'envoi. L'utilisation du service sert à obtenir les consentements légalement requis pour l'utilisation de certaines technologies. La base juridique est l'art. 6, par. 1, point c) du RGPD.",
      },
      { type: "sub", text: "Facebook" },
      {
        type: "p",
        text: "Des éléments du réseau social Facebook sont intégrés à ce site web. Le fournisseur de ce service est Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irlande. Selon Facebook, les données collectées sont toutefois également transmises aux États-Unis et à d'autres pays tiers. Un aperçu des éléments de réseaux sociaux de Facebook est disponible ici : https://developers.facebook.com/docs/plugins/?locale=de_DE.",
      },
      {
        type: "p",
        text: "Lorsque l'élément de réseau social est actif, une connexion directe est établie entre votre terminal et le serveur de Facebook. Facebook reçoit ainsi l'information que vous avez visité ce site web avec votre adresse IP. Si vous cliquez sur le bouton « J'aime » de Facebook alors que vous êtes connecté à votre compte Facebook, vous pouvez lier les contenus de ce site web à votre profil Facebook. Facebook peut ainsi associer votre visite de ce site web à votre compte utilisateur. Nous précisons qu'en tant que fournisseur des pages, nous n'avons aucune connaissance du contenu des données transmises ni de leur utilisation par Facebook. Vous trouverez de plus amples informations dans la politique de confidentialité de Facebook : https://de-de.facebook.com/privacy/explanation.",
      },
      {
        type: "p",
        text: "L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment. Dans la mesure où des données personnelles sont collectées sur notre site web à l'aide de l'outil décrit ici et transmises à Facebook, nous et Meta Platforms Ireland Limited sommes conjointement responsables de ce traitement (art. 26 du RGPD). Cette responsabilité conjointe se limite exclusivement à la collecte des données et à leur transmission à Facebook. Le transfert de données vers les États-Unis repose sur les clauses contractuelles types de la Commission européenne. L'entreprise est certifiée dans le cadre du « EU-US Data Privacy Framework » (DPF).",
      },
      { type: "sub", text: "Instagram" },
      {
        type: "p",
        text: "Des fonctions du service Instagram sont intégrées à ce site web. Ces fonctions sont proposées par Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irlande. Lorsque l'élément de réseau social est actif, une connexion directe est établie entre votre terminal et le serveur d'Instagram. Instagram reçoit ainsi des informations sur votre visite de ce site web.",
      },
      {
        type: "p",
        text: "Si vous êtes connecté à votre compte Instagram, vous pouvez lier les contenus de ce site web à votre profil Instagram en cliquant sur le bouton Instagram. Instagram peut ainsi associer votre visite de ce site web à votre compte utilisateur. Nous précisons qu'en tant que fournisseur des pages, nous n'avons aucune connaissance du contenu des données transmises ni de leur utilisation par Instagram. L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment. Vous trouverez de plus amples informations dans la politique de confidentialité d'Instagram : https://privacycenter.instagram.com/policy/.",
      },
    ],
  },
  {
    number: "6",
    title: "Outils d'analyse et publicité",
    blocks: [
      { type: "sub", text: "Google Tag Manager" },
      {
        type: "p",
        text: "Nous utilisons Google Tag Manager. Le fournisseur est Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande. Google Tag Manager est un outil qui nous aide à intégrer des outils de suivi ou de statistiques et d'autres technologies sur notre site web. Google Tag Manager lui-même ne crée aucun profil d'utilisateur, ne stocke aucun cookie et n'effectue aucune analyse autonome. Il sert uniquement à gérer et à diffuser les outils intégrés par son intermédiaire. Google Tag Manager collecte toutefois votre adresse IP, qui peut également être transmise à la société mère de Google aux États-Unis.",
      },
      {
        type: "p",
        text: "L'utilisation de Google Tag Manager est fondée sur l'art. 6, par. 1, point f) du RGPD. L'exploitant du site a un intérêt légitime à l'intégration et à la gestion rapides et simples de différents outils sur son site web. Si un consentement correspondant a été demandé, le traitement est effectué exclusivement sur la base de l'art. 6, par. 1, point a) du RGPD et de l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
      { type: "sub", text: "Google Analytics" },
      {
        type: "p",
        text: "Ce site web utilise des fonctions du service d'analyse web Google Analytics. Le fournisseur est Google Ireland Limited (« Google »), Gordon House, Barrow Street, Dublin 4, Irlande. Google Analytics permet à l'exploitant du site d'analyser le comportement des visiteurs du site. L'exploitant reçoit à cette occasion diverses données d'utilisation, telles que les pages vues, la durée de séjour, les systèmes d'exploitation utilisés et l'origine de l'utilisateur. Ces données sont regroupées dans un identifiant utilisateur et attribuées au terminal respectif du visiteur.",
      },
      {
        type: "p",
        text: "Google Analytics utilise des technologies qui permettent la reconnaissance de l'utilisateur à des fins d'analyse de son comportement (par ex. cookies ou empreinte numérique de l'appareil). Les informations collectées par Google sur l'utilisation de ce site web sont en règle générale transmises à un serveur de Google aux États-Unis et y sont stockées. L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment. L'anonymisation des adresses IP de Google Analytics est activée. Nous avons conclu un contrat de sous-traitance avec Google.",
      },
      { type: "sub", text: "Google Ads" },
      {
        type: "p",
        text: "L'exploitant du site utilise Google Ads. Google Ads est un programme de publicité en ligne de Google Ireland Limited (« Google »), Gordon House, Barrow Street, Dublin 4, Irlande. Google Ads nous permet d'afficher des annonces dans le moteur de recherche Google ou sur des sites tiers lorsque l'utilisateur saisit certains termes de recherche sur Google (ciblage par mots-clés). Des annonces ciblées peuvent en outre être affichées sur la base des données d'utilisateur dont dispose Google (par ex. données de localisation et centres d'intérêt) (ciblage d'audience). L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
      { type: "sub", text: "Remarketing Google Ads" },
      {
        type: "p",
        text: "Ce site web utilise les fonctions du remarketing Google Ads. Le fournisseur est Google Ireland Limited (« Google »), Gordon House, Barrow Street, Dublin 4, Irlande. Grâce au remarketing Google Ads, nous pouvons attribuer les personnes qui interagissent avec notre offre en ligne à des groupes cibles précis afin de leur présenter ensuite une publicité basée sur leurs centres d'intérêt au sein du réseau publicitaire de Google (remarketing ou reciblage). L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
      { type: "sub", text: "Suivi des conversions Google" },
      {
        type: "p",
        text: "Ce site web utilise le suivi des conversions Google. Le fournisseur est Google Ireland Limited (« Google »), Gordon House, Barrow Street, Dublin 4, Irlande. Grâce au suivi des conversions Google, Google et nous pouvons reconnaître si l'utilisateur a effectué certaines actions. Ces informations servent à établir des statistiques de conversion. Nous ne recevons aucune information permettant d'identifier personnellement l'utilisateur. L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
      { type: "sub", text: "Meta Pixel (anciennement Facebook Pixel)" },
      {
        type: "p",
        text: "Ce site web utilise le pixel d'action des visiteurs de Meta pour la mesure des conversions. Le fournisseur de ce service est Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irlande. Selon Meta, les données collectées sont toutefois également transmises aux États-Unis et à d'autres pays tiers. Cela permet de suivre le comportement des visiteurs du site après leur redirection vers le site du fournisseur en cliquant sur une annonce Meta. L'efficacité des annonces Meta peut ainsi être évaluée à des fins statistiques et d'études de marché.",
      },
      {
        type: "p",
        text: "L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment. Nous utilisons la fonction de mise en correspondance avancée au sein du Meta Pixel. Dans la mesure où des données personnelles sont collectées à l'aide de l'outil et transmises à Meta, nous et Meta Platforms Ireland Limited sommes conjointement responsables (art. 26 du RGPD). Le transfert de données vers les États-Unis repose sur les clauses contractuelles types de la Commission européenne.",
      },
      { type: "sub", text: "API de conversions Meta" },
      {
        type: "p",
        text: "Nous avons intégré l'API de conversions Meta sur ce site web. Le fournisseur de ce service est Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irlande. L'API de conversions Meta nous permet d'enregistrer les interactions des visiteurs avec notre site web et de les transmettre à Meta afin d'améliorer la performance publicitaire sur Facebook et Instagram. Sont notamment collectés à cette fin l'heure de la visite, la page consultée, votre adresse IP et votre agent utilisateur. L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
      { type: "sub", text: "Meta Custom Audiences" },
      {
        type: "p",
        text: "Nous utilisons Meta Custom Audiences. Le fournisseur de ce service est Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irlande. Lorsque vous visitez ou utilisez nos sites web et applications, ou interagissez avec les contenus Facebook ou Instagram de notre entreprise, nous collectons vos données personnelles à cette occasion. Si vous nous donnez votre consentement à l'utilisation de Meta Custom Audiences, nous transmettons ces données à Meta, qui peut ainsi vous présenter des publicités adaptées. L'utilisation de ce service est fondée sur votre consentement conformément à l'art. 6, par. 1, point a) du RGPD et à l'art. 25, par. 1 du TDDDG. Le consentement peut être révoqué à tout moment.",
      },
    ],
  },
  {
    number: "7",
    title: "Utilisation de services reposant sur l'IA",
    blocks: [
      {
        type: "p",
        text: "Nous utilisons des services reposant sur l'IA. Les saisies sont transmises au fournisseur. Une utilisation à des fins d'entraînement est exclue.",
      },
    ],
  },
]

export default function DatenschutzFrPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-20">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15">
              <Lock className="h-4 w-4" />
              Informations légales
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Politique de confidentialité
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Informations sur le traitement de vos données personnelles conformément au RGPD.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.number}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue font-display text-sm font-extrabold text-white">
                      {section.number}
                    </span>
                    <h2 className="font-display text-2xl font-extrabold text-brand-navy text-balance">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 rounded-2xl bg-brand-mint/40 p-6 lg:p-8">
                    {section.blocks.map((block, i) => {
                      if (block.type === "sub") {
                        return (
                          <h3 key={i} className="pt-2 font-display text-lg font-bold text-brand-navy">
                            {block.text}
                          </h3>
                        )
                      }
                      if (block.type === "list") {
                        return (
                          <ul key={i} className="ml-1 space-y-1.5">
                            {block.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2 text-[15px] leading-relaxed text-neutral-600"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      return (
                        <p key={i} className="text-[15px] leading-relaxed text-neutral-600 text-pretty">
                          {block.text}
                        </p>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
