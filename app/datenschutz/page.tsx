import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Blitzeblank",
  description:
    "Datenschutzerklärung von Blitzeblank Gebäudereinigung. Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.",
  alternates: {
    canonical: "https://blitzeblank.lu/datenschutz",
    languages: {
      de: "/datenschutz",
      en: "/en/datenschutz",
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
    title: "Datenschutz auf einen Blick",
    blocks: [
      { type: "sub", text: "Allgemeine Hinweise" },
      {
        type: "p",
        text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
      },
      { type: "sub", text: "Datenerfassung auf dieser Website" },
      {
        type: "p",
        text: "Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.",
      },
      {
        type: "p",
        text: "Wie erfassen wir Ihre Daten? Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.",
      },
      {
        type: "p",
        text: "Wofür nutzen wir Ihre Daten? Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.",
      },
      {
        type: "p",
        text: "Welche Rechte haben Sie bezüglich Ihrer Daten? Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.",
      },
      { type: "sub", text: "Analyse-Tools und Tools von Drittanbietern" },
      {
        type: "p",
        text: "Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.",
      },
    ],
  },
  {
    number: "2",
    title: "Hosting",
    blocks: [
      { type: "p", text: "Wir hosten die Inhalte unserer Website bei folgendem Anbieter:" },
      { type: "sub", text: "Externes Hosting" },
      {
        type: "p",
        text: "Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
      },
      {
        type: "p",
        text: "Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.",
      },
      {
        type: "p",
        text: "Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen. Wir setzen folgende(n) Hoster ein:",
      },
      { type: "list", items: ["Mittwald CM Service GmbH & Co. KG", "Königsberger Straße 4-6", "32339 Espelkamp, Deutschland"] },
    ],
  },
  {
    number: "3",
    title: "Allgemeine Hinweise und Pflichtinformationen",
    blocks: [
      { type: "sub", text: "Datenschutz" },
      {
        type: "p",
        text: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
      },
      {
        type: "p",
        text: "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
      },
      {
        type: "p",
        text: "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
      },
      { type: "sub", text: "Hinweis zur verantwortlichen Stelle" },
      {
        type: "p",
        text: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
      },
      {
        type: "list",
        items: [
          "BLITZEBLANK S.à r.l.",
          "Mustapha El-Ali",
          "6A, Rue Michel Rodange",
          "7681 Waldbillig",
          "Telefon: +352 661 830 493",
          "E-Mail: info@blitzeblank.lu",
        ],
      },
      {
        type: "p",
        text: "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.",
      },
      { type: "sub", text: "Speicherdauer" },
      {
        type: "p",
        text: "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.",
      },
      { type: "sub", text: "Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website" },
      {
        type: "p",
        text: "Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.",
      },
      { type: "sub", text: "Empfänger von personenbezogenen Daten" },
      {
        type: "p",
        text: "Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.",
      },
      { type: "sub", text: "Widerruf Ihrer Einwilligung zur Datenverarbeitung" },
      {
        type: "p",
        text: "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
      },
      { type: "sub", text: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)" },
      {
        type: "p",
        text: "Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).",
      },
      {
        type: "p",
        text: "Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).",
      },
      { type: "sub", text: "Beschwerderecht bei der zuständigen Aufsichtsbehörde" },
      {
        type: "p",
        text: "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.",
      },
      { type: "sub", text: "Recht auf Datenübertragbarkeit" },
      {
        type: "p",
        text: "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
      },
      { type: "sub", text: "Auskunft, Berichtigung und Löschung" },
      {
        type: "p",
        text: "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.",
      },
      { type: "sub", text: "Recht auf Einschränkung der Verarbeitung" },
      {
        type: "p",
        text: "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
      },
      {
        type: "list",
        items: [
          "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
          "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
          "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
          "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
        ],
      },
      {
        type: "p",
        text: "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
      },
      { type: "sub", text: "SSL- bzw. TLS-Verschlüsselung" },
      {
        type: "p",
        text: "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
      },
    ],
  },
  {
    number: "4",
    title: "Datenerfassung auf dieser Website",
    blocks: [
      { type: "sub", text: "Cookies" },
      {
        type: "p",
        text: "Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.",
      },
      {
        type: "p",
        text: "Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen). Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.",
      },
      {
        type: "p",
        text: "Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.",
      },
      {
        type: "p",
        text: "Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein. Sofern weitere Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dies dieser Datenschutzerklärung entnehmen.",
      },
      { type: "sub", text: "Einwilligung mit Usercentrics" },
      {
        type: "p",
        text: "Diese Website nutzt die Consent-Technologie von Usercentrics, um Ihre Einwilligung zur Speicherung bestimmter Cookies auf Ihrem Endgerät oder zum Einsatz bestimmter Technologien einzuholen und diese datenschutzkonform zu dokumentieren. Anbieter dieser Technologie ist die Usercentrics GmbH, Sendlinger Straße 7, 80331 München, Website: https://usercentrics.com/de/ (im Folgenden „Usercentrics“).",
      },
      {
        type: "p",
        text: "Wenn Sie unsere Website betreten, werden folgende personenbezogene Daten an Usercentrics übertragen: Ihre Einwilligung(en) bzw. der Widerruf Ihrer Einwilligung(en), Ihre IP-Adresse, Informationen über Ihren Browser, Informationen über Ihr Endgerät, Zeitpunkt Ihres Besuchs auf der Website sowie Geolocation. Des Weiteren speichert Usercentrics ein Cookie in Ihrem Browser, um Ihnen die erteilten Einwilligungen bzw. deren Widerruf zuordnen zu können. Die so erfassten Daten werden gespeichert, bis Sie uns zur Löschung auffordern, das Usercentrics-Cookie selbst löschen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungspflichten bleiben unberührt.",
      },
      {
        type: "p",
        text: "Der Einsatz von Usercentrics erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz bestimmter Technologien einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. c DSGVO. Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen.",
      },
      { type: "sub", text: "Server-Log-Dateien" },
      {
        type: "p",
        text: "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:",
      },
      {
        type: "list",
        items: [
          "Browsertyp und Browserversion",
          "verwendetes Betriebssystem",
          "Referrer URL",
          "Hostname des zugreifenden Rechners",
          "Uhrzeit der Serveranfrage",
          "IP-Adresse",
        ],
      },
      {
        type: "p",
        text: "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.",
      },
      { type: "sub", text: "Kontaktformular" },
      {
        type: "p",
        text: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
      },
      {
        type: "p",
        text: "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.",
      },
      {
        type: "p",
        text: "Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.",
      },
      { type: "sub", text: "Einsatz von KI auf der Website" },
      {
        type: "p",
        text: "Wir nutzen KI-gestützte Dienste und / oder Anwendungen auf unserer Website. Wir setzen Künstliche Intelligenz (KI) auf unserer Website wie folgt ein: v0 zur Erstellung der Website. Wenn Sie auf unserer Website mit Elementen interagieren oder in Berührung kommen, in denen künstliche Intelligenz zum Einsatz kommt (z. B. Chatbot), werden Ihre Eingaben inklusive Metadaten verarbeitet, um eine passende Antwort oder Reaktion zu generieren.",
      },
      {
        type: "p",
        text: "Die Nutzung dieser KI-gestützten Funktionen erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse daran, moderne Technologien auf unserer Website einzusetzen, um unsere Leistungen und Services zu verbessern und um neue Potenziale aus der Interaktion mit unseren Kunden zu erkennen. Falls eine Einwilligung erforderlich ist, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ihre Einwilligung können Sie jederzeit widerrufen.",
      },
      { type: "sub", text: "Anfrage per E-Mail, Telefon oder Telefax" },
      {
        type: "p",
        text: "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
      },
      {
        type: "p",
        text: "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.",
      },
      {
        type: "p",
        text: "Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.",
      },
      { type: "sub", text: "Kommunikation via WhatsApp" },
      {
        type: "p",
        text: "Für die Kommunikation mit unseren Kunden und sonstigen Dritten nutzen wir unter anderem den Instant-Messaging-Dienst WhatsApp. Anbieter ist die WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.",
      },
      {
        type: "p",
        text: "Die Kommunikation erfolgt über eine Ende-zu-Ende-Verschlüsselung (Peer-to-Peer), die verhindert, dass WhatsApp oder sonstige Dritte Zugriff auf die Kommunikationsinhalte erlangen können. WhatsApp erhält jedoch Zugriff auf Metadaten, die im Zuge des Kommunikationsvorgangs entstehen (z. B. Absender, Empfänger und Zeitpunkt). Wir weisen ferner darauf hin, dass WhatsApp nach eigener Aussage, personenbezogene Daten seiner Nutzer mit seiner in den USA ansässigen Konzernmutter Meta teilt. Weitere Details zur Datenverarbeitung finden Sie in der Datenschutzrichtlinie von WhatsApp unter: https://www.whatsapp.com/legal/#privacy-policy.",
      },
      {
        type: "p",
        text: "Der Einsatz von WhatsApp erfolgt auf Grundlage unseres berechtigten Interesses an einer möglichst schnellen und effektiven Kommunikation mit Kunden, Interessenten und sonstigen Geschäfts- und Vertragspartnern (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Datenverarbeitung ausschließlich auf Grundlage der Einwilligung; diese ist jederzeit mit Wirkung für die Zukunft widerrufbar. Wir nutzen WhatsApp in der Variante „WhatsApp Business“. Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Anbieter geschlossen.",
      },
    ],
  },
  {
    number: "5",
    title: "Soziale Medien",
    blocks: [
      { type: "sub", text: "eRecht24 Safe Sharing Tool" },
      {
        type: "p",
        text: "Die Inhalte auf dieser Website können datenschutzkonform in sozialen Netzwerken wie Facebook, X & Co. geteilt werden. Diese Seite nutzt dafür das eRecht24 Safe Sharing Tool. Dieses Tool stellt den direkten Kontakt zwischen den Netzwerken und Nutzern erst dann her, wenn der Nutzer aktiv auf einen dieser Button klickt. Der Klick auf den Button stellt eine Einwilligung im Sinne des Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG dar. Diese Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.",
      },
      {
        type: "p",
        text: "Eine automatische Übertragung von Nutzerdaten an die Betreiber dieser Plattformen erfolgt durch dieses Tool nicht. Ist der Nutzer bei einem der sozialen Netzwerke angemeldet, erscheint bei der Nutzung der Social-Media-Elemente von Facebook, X & Co. ein Informations-Fenster, in dem der Nutzer den Text vor dem Absenden bestätigen kann. Der Einsatz des Dienstes erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz bestimmter Technologien einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. c DSGVO.",
      },
      { type: "sub", text: "Facebook" },
      {
        type: "p",
        text: "Auf dieser Website sind Elemente des sozialen Netzwerks Facebook integriert. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland. Die erfassten Daten werden nach Aussage von Facebook jedoch auch in die USA und in andere Drittländer übertragen. Eine Übersicht über die Facebook Social-Media-Elemente finden Sie hier: https://developers.facebook.com/docs/plugins/?locale=de_DE.",
      },
      {
        type: "p",
        text: "Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse diese Website besucht haben. Wenn Sie den Facebook „Like-Button“ anklicken, während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte dieser Website auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter: https://de-de.facebook.com/privacy/explanation.",
      },
      {
        type: "p",
        text: "Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Soweit mit Hilfe des hier beschriebenen Tools personenbezogene Daten auf unserer Website erfasst und an Facebook weitergeleitet werden, sind wir und die Meta Platforms Ireland Limited gemeinsam für diese Datenverarbeitung verantwortlich (Art. 26 DSGVO). Die gemeinsame Verantwortlichkeit beschränkt sich dabei ausschließlich auf die Erfassung der Daten und deren Weitergabe an Facebook. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF).",
      },
      { type: "sub", text: "Instagram" },
      {
        type: "p",
        text: "Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland. Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Instagram-Server hergestellt. Instagram erhält dadurch Informationen ��ber den Besuch dieser Website durch Sie.",
      },
      {
        type: "p",
        text: "Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des Instagram-Buttons die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Weitere Informationen finden Sie in der Datenschutzerklärung von Instagram: https://privacycenter.instagram.com/policy/.",
      },
    ],
  },
  {
    number: "6",
    title: "Analyse-Tools und Werbung",
    blocks: [
      { type: "sub", text: "Google Tag Manager" },
      {
        type: "p",
        text: "Wir setzen den Google Tag Manager ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Google Tag Manager ist ein Tool, mit dessen Hilfe wir Tracking- oder Statistik-Tools und andere Technologien auf unserer Website einbinden können. Der Google Tag Manager selbst erstellt keine Nutzerprofile, speichert keine Cookies und nimmt keine eigenständigen Analysen vor. Er dient lediglich der Verwaltung und Ausspielung der über ihn eingebundenen Tools. Der Google Tag Manager erfasst jedoch Ihre IP-Adresse, die auch an das Mutterunternehmen von Google in die Vereinigten Staaten übertragen werden kann.",
      },
      {
        type: "p",
        text: "Der Einsatz des Google Tag Managers erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer schnellen und unkomplizierten Einbindung und Verwaltung verschiedener Tools auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
      },
      { type: "sub", text: "Google Analytics" },
      {
        type: "p",
        text: "Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z. B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden in einer User-ID zusammengefasst und dem jeweiligen Endgerät des Websitebesuchers zugeordnet.",
      },
      {
        type: "p",
        text: "Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z. B. Cookies oder Device-Fingerprinting). Die von Google erfassten Informationen über die Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Die Google Analytics IP-Anonymisierung ist aktiviert. Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen.",
      },
      { type: "sub", text: "Google Ads" },
      {
        type: "p",
        text: "Der Websitebetreiber verwendet Google Ads. Google Ads ist ein Online-Werbeprogramm der Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Google Ads ermöglicht es uns Werbeanzeigen in der Google-Suchmaschine oder auf Drittwebseiten auszuspielen, wenn der Nutzer bestimmte Suchbegriffe bei Google eingibt (Keyword-Targeting). Ferner können zielgerichtete Werbeanzeigen anhand der bei Google vorhandenen Nutzerdaten (z. B. Standortdaten und Interessen) ausgespielt werden (Zielgruppen-Targeting). Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
      },
      { type: "sub", text: "Google Ads Remarketing" },
      {
        type: "p",
        text: "Diese Website nutzt die Funktionen von Google Ads Remarketing. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Mit Google Ads Remarketing können wir Personen, die mit unserem Online-Angebot interagieren, bestimmten Zielgruppen zuordnen, um ihnen anschließend interessenbezogene Werbung im Google-Werbenetzwerk anzeigen zu lassen (Remarketing bzw. Retargeting). Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
      },
      { type: "sub", text: "Google Conversion-Tracking" },
      {
        type: "p",
        text: "Diese Website nutzt Google Conversion Tracking. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Mit Hilfe von Google-Conversion-Tracking können Google und wir erkennen, ob der Nutzer bestimmte Aktionen durchgeführt hat. Diese Informationen dienen dazu, Conversion-Statistiken zu erstellen. Wir erhalten keine Informationen, mit denen wir den Nutzer persönlich identifizieren können. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
      },
      { type: "sub", text: "Meta-Pixel (ehemals Facebook Pixel)" },
      {
        type: "p",
        text: "Diese Website nutzt zur Konversionsmessung den Besucheraktions-Pixel von Meta. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irland. Die erfassten Daten werden nach Aussage von Meta jedoch auch in die USA und in andere Drittländer übertragen. So kann das Verhalten der Seitenbesucher nachverfolgt werden, nachdem diese durch Klick auf eine Meta-Werbeanzeige auf die Website des Anbieters weitergeleitet wurden. Dadurch kann die Wirksamkeit der Meta-Werbeanzeigen für statistische und Marktforschungszwecke ausgewertet werden.",
      },
      {
        type: "p",
        text: "Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Wir nutzen die Funktion des erweiterten Abgleichs innerhalb der Meta-Pixel. Soweit mit Hilfe des Tools personenbezogene Daten erfasst und an Meta weitergeleitet werden, sind wir und die Meta Platforms Ireland Limited gemeinsam verantwortlich (Art. 26 DSGVO). Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.",
      },
      { type: "sub", text: "Meta Conversion API" },
      {
        type: "p",
        text: "Wir haben die Meta Conversion API auf dieser Website eingebunden. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irland. Die Meta Conversion API ermöglicht es uns, die Interaktionen des Websitebesuchers mit unserer Website zu erfassen und an Meta weiterzugeben, um die Werbeperformance bei Facebook und Instagram zu verbessern. Hierzu werden insbesondere Zeitpunkt des Aufrufes, die aufgerufene Webseite, Ihre IP-Adresse und Ihr User-Agent erfasst. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
      },
      { type: "sub", text: "Meta Custom Audiences" },
      {
        type: "p",
        text: "Wir nutzen Meta Custom Audiences. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irland. Wenn Sie unsere Webseiten und Apps besuchen bzw. nutzen oder mit den Facebook- oder Instagram-Inhalten unseres Unternehmens interagieren, erfassen wir hierbei Ihre personenbezogenen Daten. Sofern Sie uns eine Einwilligung zur Nutzung von Meta Custom Audiences erteilen, werden wir diese Daten an Meta übermitteln, mit denen Meta Ihnen passende Werbung ausspielen kann. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
      },
    ],
  },
  {
    number: "7",
    title: "Einsatz von KI-gestützten Diensten",
    blocks: [
      {
        type: "p",
        text: "Wir setzen KI-gestützte Dienste ein. Eingaben werden an den Anbieter übermittelt. Eine Nutzung zu Trainingszwecken ist ausgeschlossen.",
      },
    ],
  },
]

export default function DatenschutzPage() {
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
              Rechtliches
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Datenschutzerklärung
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.
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
                          <h3
                            key={i}
                            className="pt-2 font-display text-lg font-bold text-brand-navy"
                          >
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
