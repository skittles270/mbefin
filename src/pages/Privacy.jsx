import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Privacy() {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      intro: 'MobiHero operates this website to provide you with an individual user experience. This privacy policy describes how we collect, use, or share personal data when you visit, use, or communicate with us.',
      sections: [
        {
          heading: 'What Personal Data Do We Collect or Process?',
          content: 'Depending on how you interact with the Services and your location, we may collect or process the following categories of personal data: Contact data including name, postal address, telephone number and email address; Communication data including information you provide when communicating with us; Device information including information about your device, browser, network connection, IP address and other unique identifiers; Usage information including information about your interaction with the website.',
        },
        {
          heading: 'Sources of Personal Data',
          content: 'We collect personal data directly from you when you communicate with us, automatically through the website via cookies and similar technologies, from our service providers, and from our partners and other third parties.',
        },
        {
          heading: 'How Do We Use Your Personal Data?',
          content: 'We use personal data for providing and improving the website, marketing and advertising (where legally permitted), security and fraud prevention, communication with you, and to comply with legal obligations.',
        },
        {
          heading: 'How Do We Share Personal Data?',
          content: 'We may share personal data with service providers, business and marketing partners (where legally permitted), with your consent, within our corporate group, in compliance with legal obligations, and to protect our rights.',
        },
        {
          heading: 'Third-Party Websites and Links',
          content: 'The website may contain links to third-party websites. We assume no responsibility for their contents and data protection practices.',
        },
        {
          heading: 'Children\'s Data',
          content: 'The website is not intended for children. We do not knowingly collect personal data from minors.',
        },
        {
          heading: 'Data Security and Retention',
          content: 'We implement appropriate technical and organizational measures to protect your data. Personal data is stored only as long as necessary for the respective purposes or as required by law.',
        },
        {
          heading: 'Your Rights',
          content: 'Depending on applicable law, you have the right to access, correct, delete, restrict processing, data portability, and object to processing of your data. You can exercise these rights by contacting us at any time.',
        },
        {
          heading: 'International Transfers',
          content: 'Personal data may be transferred to countries outside the EU if appropriate safeguards exist.',
        },
        {
          heading: 'Changes to This Policy',
          content: 'We reserve the right to update this privacy policy at any time.',
        },
        {
          heading: 'Contact',
          content: 'For questions about the processing of your personal data, please contact: MobiHero GmbH, Braunstr. 7, 81545 München, Germany. Email: support@mobihero.de, Phone: +49 176 550 64000',
        },
      ],
    },
    de: {
      title: 'Datenschutzerklärung',
      intro: 'MobiHero betreibt diese Website, um Ihnen ein individuelles Nutzungserlebnis bereitzustellen. In dieser Datenschutzerklärung wird beschrieben, wie wir personenbezogene Daten erfassen, verwenden oder weitergeben, wenn Sie die Website besuchen, nutzen oder mit uns kommunizieren.',
      sections: [
        {
          heading: 'Welche personenbezogenen Daten erfassen oder verarbeiten wir?',
          content: 'Je nachdem, wie Sie mit den Services interagieren und wo Sie wohnen, können wir die folgenden Kategorien personenbezogener Daten erfassen oder verarbeiten: Kontaktdaten einschließlich Name, Postanschrift, Telefonnummer und E-Mail-Adresse; Kommunikationsdaten einschließlich der Informationen, die Sie bei der Kommunikation mit uns angeben; Geräteinformationen einschließlich Informationen über Gerät, Browser, Netzwerkverbindung, IP-Adresse und andere eindeutige Identifikatoren; Nutzungsinformationen einschließlich Informationen über Ihre Interaktion mit der Website.',
        },
        {
          heading: 'Quellen von personenbezogenen Daten',
          content: 'Wir erfassen Daten direkt von Ihnen, wenn Sie mit uns kommunizieren, automatisch über die Website durch Cookies und ähnliche Technologien, von unseren Dienstanbietern, und von unseren Partnern und anderen Drittanbietern.',
        },
        {
          heading: 'Wie verwenden wir Ihre personenbezogenen Daten?',
          content: 'Wir verwenden personenbezogene Daten zur Bereitstellung und Verbesserung der Website, für Marketing und Werbung (soweit rechtlich zulässig), zur Sicherheit und Betrugsprävention, zur Kommunikation mit Ihnen und zur Einhaltung gesetzlicher Verpflichtungen.',
        },
        {
          heading: 'Wie geben wir personenbezogene Daten weiter?',
          content: 'Wir können personenbezogene Daten an Dienstleister, Geschäfts- und Marketingpartner (soweit rechtlich zulässig), mit Ihrer Einwilligung, innerhalb unserer Unternehmensgruppe, im Rahmen gesetzlicher Verpflichtungen und zum Schutz unserer Rechte weitergeben.',
        },
        {
          heading: 'Websites und Links von Drittanbietern',
          content: 'Die Website kann Links zu Websites oder Plattformen Dritter enthalten. Für deren Inhalte und Datenschutzpraktiken übernehmen wir keine Verantwortung.',
        },
        {
          heading: 'Daten von Kindern',
          content: 'Die Website ist nicht für Kinder bestimmt. Wir erfassen wissentlich keine personenbezogenen Daten von Minderjährigen.',
        },
        {
          heading: 'Sicherheit und Aufbewahrung Ihrer Daten',
          content: 'Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen. Personenbezogene Daten werden nur so lange gespeichert, wie dies erforderlich ist oder gesetzliche Verpflichtungen bestehen.',
        },
        {
          heading: 'Ihre Rechte',
          content: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Sie können diese Rechte jederzeit durch Kontaktaufnahme mit uns ausüben.',
        },
        {
          heading: 'Internationale Übertragungen',
          content: 'Personenbezogene Daten können in Länder außerhalb der EU übertragen werden, sofern geeignete Schutzmaßnahmen bestehen.',
        },
        {
          heading: 'Änderungen an dieser Datenschutzerklärung',
          content: 'Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen.',
        },
        {
          heading: 'Kontakt',
          content: 'Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten: MobiHero GmbH, Braunstr. 7, 81545 München, Deutschland. E-Mail: support@mobihero.de, Telefon: +49 176 550 64000',
        },
      ],
    },
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{t.intro}</p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              {t.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border pb-6 last:border-b-0"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-3">{section.heading}</h2>
                  <p>{section.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}