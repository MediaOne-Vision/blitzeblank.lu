import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Privacy policy of Blitzeblank building cleaning. Information on the processing of your personal data in accordance with the GDPR.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/datenschutz",
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
    title: "Data Protection at a Glance",
    blocks: [
      { type: "sub", text: "General Information" },
      {
        type: "p",
        text: "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally. Detailed information on the subject of data protection can be found in our privacy policy set out below this text.",
      },
      { type: "sub", text: "Data Collection on This Website" },
      {
        type: "p",
        text: "Who is responsible for data collection on this website? Data processing on this website is carried out by the website operator. You can find their contact details in the section \"Notice Regarding the Responsible Party\" in this privacy policy.",
      },
      {
        type: "p",
        text: "How do we collect your data? Your data is collected on the one hand by you providing it to us. This can be, for example, data you enter in a contact form. Other data is collected automatically or after you give your consent when you visit the website, by our IT systems. This is primarily technical data (e.g. internet browser, operating system or time of the page visit). This data is collected automatically as soon as you access this website.",
      },
      {
        type: "p",
        text: "What do we use your data for? Some of the data is collected to ensure that the website is provided without errors. Other data may be used to analyze your user behavior. If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders or other requests for services.",
      },
      {
        type: "p",
        text: "What rights do you have regarding your data? You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right, under certain circumstances, to request the restriction of the processing of your personal data. Furthermore, you have the right to lodge a complaint with the competent supervisory authority. You can contact us at any time regarding this and any other questions on the subject of data protection.",
      },
      { type: "sub", text: "Analysis Tools and Third-Party Tools" },
      {
        type: "p",
        text: "When you visit this website, your surfing behavior may be statistically evaluated. This is done primarily using so-called analysis programs. Detailed information on these analysis programs can be found in the following privacy policy.",
      },
    ],
  },
  {
    number: "2",
    title: "Hosting",
    blocks: [
      { type: "p", text: "We host the content of our website with the following provider:" },
      { type: "sub", text: "External Hosting" },
      {
        type: "p",
        text: "This website is hosted externally. The personal data collected on this website is stored on the servers of the hosting provider(s). This may primarily include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website access data and other data generated via a website.",
      },
      {
        type: "p",
        text: "External hosting is carried out for the purpose of fulfilling contracts with our potential and existing customers (Art. 6(1)(b) GDPR) and in the interest of a secure, fast and efficient provision of our online offering by a professional provider (Art. 6(1)(f) GDPR). If corresponding consent was requested, the processing is carried out exclusively on the basis of Art. 6(1)(a) GDPR and Section 25(1) TDDDG, insofar as the consent includes the storage of cookies or access to information in the user's end device (e.g. device fingerprinting) within the meaning of the TDDDG. Consent can be revoked at any time.",
      },
      {
        type: "p",
        text: "Our hosting provider(s) will only process your data to the extent necessary to fulfill their contractual obligations and will follow our instructions with regard to this data. We use the following hosting provider(s):",
      },
      { type: "list", items: ["Mittwald CM Service GmbH & Co. KG", "Königsberger Straße 4-6", "32339 Espelkamp, Germany"] },
    ],
  },
  {
    number: "3",
    title: "General Information and Mandatory Disclosures",
    blocks: [
      { type: "sub", text: "Data Protection" },
      {
        type: "p",
        text: "The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.",
      },
      {
        type: "p",
        text: "When you use this website, various personal data is collected. Personal data is data that can be used to identify you personally. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.",
      },
      {
        type: "p",
        text: "We would like to point out that data transmission over the internet (e.g. when communicating by email) can have security gaps. Complete protection of data against access by third parties is not possible.",
      },
      { type: "sub", text: "Notice Regarding the Responsible Party" },
      {
        type: "p",
        text: "The party responsible for data processing on this website is:",
      },
      {
        type: "list",
        items: [
          "Mustapha El-Ali",
          "6A, Rue Michel Rodange",
          "7681 Waldbillig",
          "Phone: +352 661 830 493",
          "Email: info@blitzeblank.lu",
        ],
      },
      {
        type: "p",
        text: "The responsible party is the natural or legal person who, alone or jointly with others, determines the purposes and means of processing personal data (e.g. names, email addresses, etc.).",
      },
      { type: "sub", text: "Storage Duration" },
      {
        type: "p",
        text: "Unless a more specific storage period is mentioned within this privacy policy, your personal data will remain with us until the purpose for the data processing no longer applies. If you assert a legitimate request for deletion or revoke your consent to data processing, your data will be deleted, unless we have other legally permissible reasons for storing your personal data (e.g. tax or commercial law retention periods); in the latter case, the deletion will take place after these reasons no longer apply.",
      },
      { type: "sub", text: "General Information on the Legal Basis for Data Processing on This Website" },
      {
        type: "p",
        text: "If you have consented to data processing, we process your personal data on the basis of Art. 6(1)(a) GDPR or Art. 9(2)(a) GDPR, if special categories of data are processed pursuant to Art. 9(1) GDPR. In the event of explicit consent to the transfer of personal data to third countries, data processing is also carried out on the basis of Art. 49(1)(a) GDPR. If you have consented to the storage of cookies or access to information on your end device (e.g. via device fingerprinting), data processing is additionally carried out on the basis of Section 25(1) TDDDG. Consent can be revoked at any time. If your data is required to fulfill a contract or to carry out pre-contractual measures, we process your data on the basis of Art. 6(1)(b) GDPR. Furthermore, we process your data if this is necessary to fulfill a legal obligation, on the basis of Art. 6(1)(c) GDPR. Data processing may also be carried out on the basis of our legitimate interest pursuant to Art. 6(1)(f) GDPR. Information on the relevant legal basis in each individual case is provided in the following paragraphs of this privacy policy.",
      },
      { type: "sub", text: "Recipients of Personal Data" },
      {
        type: "p",
        text: "As part of our business activities, we work with various external parties. This sometimes requires the transfer of personal data to these external parties. We only disclose personal data to external parties if this is necessary to fulfill a contract, if we are legally obliged to do so (e.g. disclosure of data to tax authorities), if we have a legitimate interest pursuant to Art. 6(1)(f) GDPR in the disclosure, or if another legal basis permits the disclosure of data. When using processors, we only pass on personal data of our customers on the basis of a valid contract for data processing. In the event of joint processing, a contract for joint processing is concluded.",
      },
      { type: "sub", text: "Revocation of Your Consent to Data Processing" },
      {
        type: "p",
        text: "Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of the data processing carried out until the revocation remains unaffected by the revocation.",
      },
      { type: "sub", text: "Right to Object to Data Collection in Special Cases and to Direct Marketing (Art. 21 GDPR)" },
      {
        type: "p",
        text: "If data processing is carried out on the basis of Art. 6(1)(e) or (f) GDPR, you have the right at any time to object to the processing of your personal data for reasons arising from your particular situation; this also applies to profiling based on these provisions. The relevant legal basis on which processing is based can be found in this privacy policy. If you object, we will no longer process your affected personal data, unless we can demonstrate compelling legitimate grounds for the processing that outweigh your interests, rights and freedoms, or the processing serves to assert, exercise or defend legal claims (objection pursuant to Art. 21(1) GDPR).",
      },
      {
        type: "p",
        text: "If your personal data is processed for the purpose of direct marketing, you have the right to object at any time to the processing of personal data concerning you for the purpose of such marketing; this also applies to profiling to the extent that it is associated with such direct marketing. If you object, your personal data will no longer be used for the purpose of direct marketing (objection pursuant to Art. 21(2) GDPR).",
      },
      { type: "sub", text: "Right to Lodge a Complaint with the Competent Supervisory Authority" },
      {
        type: "p",
        text: "In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the member state of their habitual residence, place of work or place of the alleged violation. The right to lodge a complaint exists without prejudice to any other administrative or judicial remedy.",
      },
      { type: "sub", text: "Right to Data Portability" },
      {
        type: "p",
        text: "You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another controller, this will only be done to the extent technically feasible.",
      },
      { type: "sub", text: "Information, Correction and Deletion" },
      {
        type: "p",
        text: "Within the scope of the applicable statutory provisions, you have the right at any time to free information about your stored personal data, its origin and recipients, and the purpose of the data processing, and, if applicable, a right to correction or deletion of this data. You can contact us at any time regarding this and any other questions about personal data.",
      },
      { type: "sub", text: "Right to Restriction of Processing" },
      {
        type: "p",
        text: "You have the right to request the restriction of the processing of your personal data. You can contact us at any time for this purpose. The right to restriction of processing exists in the following cases:",
      },
      {
        type: "list",
        items: [
          "If you dispute the accuracy of your personal data stored by us, we generally need time to verify this. For the duration of the verification, you have the right to request the restriction of the processing of your personal data.",
          "If the processing of your personal data was/is unlawful, you can request the restriction of data processing instead of deletion.",
          "If we no longer need your personal data, but you need it to assert, exercise or defend legal claims, you have the right to request the restriction of the processing of your personal data instead of deletion.",
          "If you have lodged an objection pursuant to Art. 21(1) GDPR, a balance must be struck between your interests and ours. As long as it has not yet been determined whose interests prevail, you have the right to request the restriction of the processing of your personal data.",
        ],
      },
      {
        type: "p",
        text: "If you have restricted the processing of your personal data, this data - apart from being stored - may only be processed with your consent or for the assertion, exercise or defense of legal claims, or to protect the rights of another natural or legal person, or for reasons of important public interest of the European Union or a member state.",
      },
      { type: "sub", text: "SSL/TLS Encryption" },
      {
        type: "p",
        text: "For security reasons and to protect the transmission of confidential content, such as orders or inquiries that you send to us as the site operator, this site uses SSL/TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from \"http://\" to \"https://\" and by the lock symbol in your browser line. When SSL/TLS encryption is activated, the data you transmit to us cannot be read by third parties.",
      },
    ],
  },
  {
    number: "4",
    title: "Data Collection on This Website",
    blocks: [
      { type: "sub", text: "Cookies" },
      {
        type: "p",
        text: "Our websites use so-called \"cookies\". Cookies are small data packages and do not cause any damage to your end device. They are stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your end device. Session cookies are automatically deleted after your visit ends. Permanent cookies remain stored on your end device until you delete them yourself or they are automatically deleted by your web browser.",
      },
      {
        type: "p",
        text: "Cookies can come from us (first-party cookies) or from third-party companies (so-called third-party cookies). Third-party cookies enable the integration of certain services from third-party companies within websites (e.g. cookies for processing payment services). Cookies have various functions. Many cookies are technically necessary, as certain website functions would not work without them (e.g. the shopping cart function or the display of videos). Other cookies can be used to evaluate user behavior or for advertising purposes.",
      },
      {
        type: "p",
        text: "Cookies that are necessary to carry out the electronic communication process, to provide certain functions you desire (e.g. for the shopping cart function) or to optimize the website (e.g. cookies to measure the web audience) (necessary cookies) are stored on the basis of Art. 6(1)(f) GDPR, unless another legal basis is specified. The website operator has a legitimate interest in storing necessary cookies for the technically error-free and optimized provision of its services. If consent to the storage of cookies and comparable recognition technologies was requested, processing is carried out exclusively on the basis of this consent (Art. 6(1)(a) GDPR and Section 25(1) TDDDG); consent can be revoked at any time.",
      },
      {
        type: "p",
        text: "You can set your browser so that you are informed about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate automatic deletion of cookies when closing the browser. Disabling cookies may limit the functionality of this website. Information on which further cookies and services are used on this website can be found in this privacy policy.",
      },
      { type: "sub", text: "Consent with Usercentrics" },
      {
        type: "p",
        text: "This website uses the consent technology of Usercentrics to obtain your consent to the storage of certain cookies on your end device or to the use of certain technologies, and to document this in a manner compliant with data protection law. The provider of this technology is Usercentrics GmbH, Sendlinger Straße 7, 80331 Munich, website: https://usercentrics.com/de/ (hereinafter \"Usercentrics\").",
      },
      {
        type: "p",
        text: "When you access our website, the following personal data is transmitted to Usercentrics: your consent(s) or the revocation of your consent(s), your IP address, information about your browser, information about your end device, the time of your visit to the website, and geolocation. In addition, Usercentrics stores a cookie in your browser in order to be able to assign the consents given or their revocation to you. The data collected in this way is stored until you request us to delete it, you delete the Usercentrics cookie yourself, or the purpose for the data storage no longer applies. Mandatory statutory retention obligations remain unaffected.",
      },
      {
        type: "p",
        text: "The use of Usercentrics is carried out to obtain the legally required consents for the use of certain technologies. The legal basis for this is Art. 6(1)(c) GDPR. We have concluded a data processing agreement (DPA) for the use of the above-mentioned service.",
      },
      { type: "sub", text: "Server Log Files" },
      {
        type: "p",
        text: "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:",
      },
      {
        type: "list",
        items: [
          "Browser type and browser version",
          "Operating system used",
          "Referrer URL",
          "Hostname of the accessing computer",
          "Time of the server request",
          "IP address",
        ],
      },
      {
        type: "p",
        text: "This data is not combined with other data sources. This data is collected on the basis of Art. 6(1)(f) GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of its website - for this purpose, the server log files must be collected.",
      },
      { type: "sub", text: "Contact Form" },
      {
        type: "p",
        text: "If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and for any follow-up questions. We do not pass on this data without your consent.",
      },
      {
        type: "p",
        text: "The processing of this data is carried out on the basis of Art. 6(1)(b) GDPR, if your inquiry is related to the fulfillment of a contract or is necessary to carry out pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective handling of inquiries addressed to us (Art. 6(1)(f) GDPR) or on your consent (Art. 6(1)(a) GDPR) if this was requested; consent can be revoked at any time.",
      },
      {
        type: "p",
        text: "The data you enter in the contact form will remain with us until you request us to delete it, you revoke your consent to storage, or the purpose for the data storage no longer applies (e.g. after your inquiry has been processed). Mandatory statutory provisions - in particular retention periods - remain unaffected.",
      },
      { type: "sub", text: "Use of AI on the Website" },
      {
        type: "p",
        text: "We use AI-powered services and/or applications on our website. We use artificial intelligence (AI) on our website as follows: v0, to create the website. If you interact with or come into contact with elements on our website that use artificial intelligence (e.g. a chatbot), your input, including metadata, will be processed in order to generate a suitable response or reaction.",
      },
      {
        type: "p",
        text: "The use of these AI-powered functions is carried out on the basis of Art. 6(1)(f) GDPR. We have a legitimate interest in using modern technologies on our website in order to improve our services and to identify new potential from interactions with our customers. If consent is required, processing is carried out exclusively on the basis of Art. 6(1)(a) GDPR and Section 25(1) TDDDG. You can revoke your consent at any time.",
      },
      { type: "sub", text: "Inquiries by Email, Phone or Fax" },
      {
        type: "p",
        text: "If you contact us by email, phone or fax, your inquiry, including all personal data resulting from it (name, inquiry), will be stored and processed by us for the purpose of handling your request. We do not pass on this data without your consent.",
      },
      {
        type: "p",
        text: "The processing of this data is carried out on the basis of Art. 6(1)(b) GDPR, if your inquiry is related to the fulfillment of a contract or is necessary to carry out pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective handling of inquiries addressed to us (Art. 6(1)(f) GDPR) or on your consent (Art. 6(1)(a) GDPR) if this was requested; consent can be revoked at any time.",
      },
      {
        type: "p",
        text: "The data you send us via contact inquiries will remain with us until you request us to delete it, you revoke your consent to storage, or the purpose for the data storage no longer applies (e.g. after your request has been processed). Mandatory statutory provisions - in particular statutory retention periods - remain unaffected.",
      },
      { type: "sub", text: "Communication via WhatsApp" },
      {
        type: "p",
        text: "For communication with our customers and other third parties, we use, among other things, the instant messaging service WhatsApp. The provider is WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland.",
      },
      {
        type: "p",
        text: "Communication is carried out via end-to-end encryption (peer-to-peer), which prevents WhatsApp or other third parties from gaining access to the content of the communication. However, WhatsApp receives access to metadata generated during the communication process (e.g. sender, recipient and time). We would also like to point out that, according to its own statement, WhatsApp shares personal data of its users with its US-based parent company Meta. Further details on data processing can be found in WhatsApp's privacy policy at: https://www.whatsapp.com/legal/#privacy-policy.",
      },
      {
        type: "p",
        text: "The use of WhatsApp is carried out on the basis of our legitimate interest in the fastest and most effective communication possible with customers, prospective customers and other business and contractual partners (Art. 6(1)(f) GDPR). If corresponding consent was requested, data processing is carried out exclusively on the basis of consent; this can be revoked at any time with effect for the future. We use WhatsApp in the \"WhatsApp Business\" variant. We have concluded a data processing agreement (DPA) with the aforementioned provider.",
      },
    ],
  },
  {
    number: "5",
    title: "Social Media",
    blocks: [
      { type: "sub", text: "eRecht24 Safe Sharing Tool" },
      {
        type: "p",
        text: "The content on this website can be shared on social networks such as Facebook, X & Co. in a manner compliant with data protection law. This site uses the eRecht24 Safe Sharing Tool for this purpose. This tool only establishes direct contact between the networks and users when the user actively clicks on one of these buttons. Clicking the button constitutes consent within the meaning of Art. 6(1)(a) GDPR and Section 25(1) TDDDG. This consent can be revoked at any time with effect for the future.",
      },
      {
        type: "p",
        text: "This tool does not automatically transmit user data to the operators of these platforms. If the user is logged in to one of the social networks, an information window appears when using the social media elements of Facebook, X & Co., in which the user can confirm the text before sending. The use of the service is carried out to obtain the legally required consents for the use of certain technologies. The legal basis for this is Art. 6(1)(c) GDPR.",
      },
      { type: "sub", text: "Facebook" },
      {
        type: "p",
        text: "Elements of the social network Facebook are integrated on this website. The provider of this service is Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland. However, according to Facebook, the collected data is also transferred to the USA and other third countries. An overview of the Facebook social media elements can be found here: https://developers.facebook.com/docs/plugins/?locale=de_DE.",
      },
      {
        type: "p",
        text: "When the social media element is active, a direct connection is established between your end device and the Facebook server. Facebook thereby receives the information that you have visited this website with your IP address. If you click the Facebook \"Like\" button while logged into your Facebook account, you can link the content of this website to your Facebook profile. This allows Facebook to associate your visit to this website with your user account. We would like to point out that, as the provider of the pages, we have no knowledge of the content of the transmitted data or its use by Facebook. Further information on this can be found in Facebook's privacy policy at: https://de-de.facebook.com/privacy/explanation.",
      },
      {
        type: "p",
        text: "The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time. Insofar as personal data is collected on our website with the help of the tool described here and forwarded to Facebook, we and Meta Platforms Ireland Limited are jointly responsible for this data processing (Art. 26 GDPR). This joint responsibility is limited exclusively to the collection of the data and its transfer to Facebook. The data transfer to the USA is based on the standard contractual clauses of the EU Commission. The company holds a certification under the \"EU-US Data Privacy Framework\" (DPF).",
      },
      { type: "sub", text: "Instagram" },
      {
        type: "p",
        text: "Functions of the Instagram service are integrated on this website. These functions are offered by Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland. When the social media element is active, a direct connection is established between your end device and the Instagram server. Instagram thereby receives information about your visit to this website.",
      },
      {
        type: "p",
        text: "If you are logged into your Instagram account, you can link the content of this website to your Instagram profile by clicking the Instagram button. This allows Instagram to associate your visit to this website with your user account. We would like to point out that, as the provider of the pages, we have no knowledge of the content of the transmitted data or its use by Instagram. The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time. Further information can be found in Instagram's privacy policy: https://privacycenter.instagram.com/policy/.",
      },
    ],
  },
  {
    number: "6",
    title: "Analysis Tools and Advertising",
    blocks: [
      { type: "sub", text: "Google Tag Manager" },
      {
        type: "p",
        text: "We use Google Tag Manager. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google Tag Manager is a tool that helps us integrate tracking or statistics tools and other technologies on our website. Google Tag Manager itself does not create any user profiles, does not store cookies, and does not carry out any independent analyses. It is only used to manage and deliver the tools integrated via it. However, Google Tag Manager does collect your IP address, which may also be transferred to Google's parent company in the United States.",
      },
      {
        type: "p",
        text: "The use of Google Tag Manager is carried out on the basis of Art. 6(1)(f) GDPR. The website operator has a legitimate interest in the fast and uncomplicated integration and management of various tools on its website. If corresponding consent was requested, processing is carried out exclusively on the basis of Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.",
      },
      { type: "sub", text: "Google Analytics" },
      {
        type: "p",
        text: "This website uses functions of the web analytics service Google Analytics. The provider is Google Ireland Limited (\"Google\"), Gordon House, Barrow Street, Dublin 4, Ireland. Google Analytics enables the website operator to analyze the behavior of website visitors. In doing so, the website operator receives various usage data, such as page views, length of stay, operating systems used and the origin of the user. This data is combined into a user ID and assigned to the respective end device of the website visitor.",
      },
      {
        type: "p",
        text: "Google Analytics uses technologies that enable the recognition of the user for the purpose of analyzing user behavior (e.g. cookies or device fingerprinting). The information collected by Google about the use of this website is generally transmitted to and stored on a Google server in the USA. The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time. Google Analytics IP anonymization is activated. We have concluded a data processing agreement with Google.",
      },
      { type: "sub", text: "Google Ads" },
      {
        type: "p",
        text: "The website operator uses Google Ads. Google Ads is an online advertising program by Google Ireland Limited (\"Google\"), Gordon House, Barrow Street, Dublin 4, Ireland. Google Ads enables us to display advertisements in the Google search engine or on third-party websites when the user enters certain search terms on Google (keyword targeting). Furthermore, targeted advertisements can be displayed based on user data available at Google (e.g. location data and interests) (audience targeting). The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.",
      },
      { type: "sub", text: "Google Ads Remarketing" },
      {
        type: "p",
        text: "This website uses the functions of Google Ads Remarketing. The provider is Google Ireland Limited (\"Google\"), Gordon House, Barrow Street, Dublin 4, Ireland. With Google Ads Remarketing, we can assign people who interact with our online offering to specific target groups in order to subsequently show them interest-based advertising within the Google advertising network (remarketing or retargeting). The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.",
      },
      { type: "sub", text: "Google Conversion Tracking" },
      {
        type: "p",
        text: "This website uses Google Conversion Tracking. The provider is Google Ireland Limited (\"Google\"), Gordon House, Barrow Street, Dublin 4, Ireland. With the help of Google Conversion Tracking, Google and we can recognize whether the user has performed certain actions. This information is used to create conversion statistics. We do not receive any information that would allow us to personally identify the user. The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.",
      },
      { type: "sub", text: "Meta Pixel (formerly Facebook Pixel)" },
      {
        type: "p",
        text: "This website uses Meta's visitor action pixel for conversion measurement. The provider of this service is Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Ireland. However, according to Meta, the collected data is also transferred to the USA and other third countries. This makes it possible to track the behavior of site visitors after they have been redirected to the provider's website by clicking on a Meta advertisement. This allows the effectiveness of Meta advertisements to be evaluated for statistical and market research purposes.",
      },
      {
        type: "p",
        text: "The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time. We use the advanced matching function within the Meta Pixel. Insofar as personal data is collected using the tool and forwarded to Meta, we and Meta Platforms Ireland Limited are jointly responsible (Art. 26 GDPR). The data transfer to the USA is based on the standard contractual clauses of the EU Commission.",
      },
      { type: "sub", text: "Meta Conversion API" },
      {
        type: "p",
        text: "We have integrated the Meta Conversion API on this website. The provider of this service is Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Ireland. The Meta Conversion API enables us to record the interactions of website visitors with our website and pass them on to Meta in order to improve advertising performance on Facebook and Instagram. In particular, the time of the visit, the page visited, your IP address and your user agent are collected for this purpose. The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.",
      },
      { type: "sub", text: "Meta Custom Audiences" },
      {
        type: "p",
        text: "We use Meta Custom Audiences. The provider of this service is Meta Platforms Ireland Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Ireland. When you visit or use our websites and apps, or interact with our company's Facebook or Instagram content, we collect your personal data in the process. If you give us consent to use Meta Custom Audiences, we will transmit this data to Meta, with which Meta can display suitable advertising to you. The use of this service is carried out on the basis of your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.",
      },
    ],
  },
  {
    number: "7",
    title: "Use of AI-Powered Services",
    blocks: [
      {
        type: "p",
        text: "We use AI-powered services. Inputs are transmitted to the provider. Use for training purposes is excluded.",
      },
    ],
  },
]

export default function DatenschutzEnPage() {
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
              Legal
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Information on the processing of your personal data in accordance with the GDPR.
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
