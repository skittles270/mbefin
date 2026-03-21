import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Terms() {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: 'Terms and Conditions',
      sections: [
        {
          heading: '1. Scope of Application',
          content: 'These General Terms and Conditions (Terms) apply to the use of the website of MobiHero GmbH, Braunstr. 7, 81545 München, Germany. This website is exclusively for business users in the sense of § 14 BGB (B2B).',
        },
        {
          heading: '2. Website Contents',
          content: 'The contents provided on this website serve exclusively for general information about the company, its activities and service portfolio. All displayed information does not constitute binding offers in the legal sense.',
        },
        {
          heading: '3. No Contract Conclusion via Website',
          content: 'No contract conclusion is possible via this website. Inquiries via the contact form are not binding offers but serve only for non-binding contact.',
        },
        {
          heading: '4. Website Usage',
          content: 'Website usage is only permitted within the scope of applicable law. Prohibited in particular: abusive use of contents, automated data extraction, disruption of operations, and unauthorized use of contents, trademarks or data.',
        },
        {
          heading: '5. Intellectual Property',
          content: 'All contents of this website (texts, images, logos, trademarks, etc.) are protected by copyright or otherwise legally protected. Use, reproduction or distribution is not permitted without express written consent of MobiHero GmbH.',
        },
        {
          heading: '6. Liability for Contents',
          content: 'The contents of this website were created with great care. However, MobiHero GmbH assumes no liability for the accuracy, completeness and timeliness of the contents provided.',
        },
        {
          heading: '7. Liability for Links',
          content: 'This website contains links to external websites of third parties. MobiHero GmbH has no influence on their contents and assumes no liability for them.',
        },
        {
          heading: '8. Limitation of Liability',
          content: 'The liability of MobiHero GmbH is excluded to the extent permitted by law. This does not apply to willful misconduct, gross negligence, or mandatory statutory liability.',
        },
        {
          heading: '9. Data Protection',
          content: 'Information on the processing of personal data is governed in the separate privacy policy of the website.',
        },
        {
          heading: '10. Applicable Law',
          content: 'EU law and supplementary German law apply, excluding the UN Convention on Contracts for the International Sale of Goods (CISG).',
        },
        {
          heading: '11. Jurisdiction',
          content: 'The place of jurisdiction for all disputes is the location of MobiHero GmbH in Munich, Germany.',
        },
        {
          heading: '12. Final Provisions',
          content: 'Should individual provisions of these Terms be invalid, the validity of the remaining provisions remains unaffected.',
        },
      ],
    },
    de: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      sections: [
        {
          heading: '1. Geltungsbereich',
          content: 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Website der MobiHero GmbH, Braunstr. 7, 81545 München, Deutschland. Diese Website richtet sich ausschließlich an Unternehmer im Sinne von § 14 BGB (B2B).',
        },
        {
          heading: '2. Inhalte der Website',
          content: 'Die auf dieser Website bereitgestellten Inhalte dienen ausschließlich der allgemeinen Information über das Unternehmen, dessen Tätigkeiten sowie dessen Leistungsportfolio. Alle dargestellten Informationen stellen keine verbindlichen Angebote im rechtlichen Sinne dar.',
        },
        {
          heading: '3. Kein Vertragsschluss über die Website',
          content: 'Ein Vertragsschluss über diese Website ist nicht möglich. Anfragen über das bereitgestellte Kontaktformular stellen keine Angebote zum Vertragsschluss dar, sondern dienen lediglich der unverbindlichen Kontaktaufnahme.',
        },
        {
          heading: '4. Nutzung der Website',
          content: 'Die Nutzung der Website ist nur im Rahmen der geltenden Gesetze zulässig. Untersagt ist insbesondere: die missbräuchliche Nutzung der Inhalte, das automatisierte Auslesen (Scraping), die Nutzung zur Störung des Betriebs, und die unbefugte Verwendung von Inhalten, Marken oder Daten.',
        },
        {
          heading: '5. Geistiges Eigentum',
          content: 'Sämtliche Inhalte dieser Website (Texte, Bilder, Logos, Marken etc.) sind urheberrechtlich geschützt oder anderweitig rechtlich geschützt. Eine Nutzung, Vervielfältigung oder Weitergabe ist ohne ausdrückliche schriftliche Zustimmung der MobiHero GmbH nicht gestattet.',
        },
        {
          heading: '6. Haftung für Inhalte',
          content: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Dennoch übernimmt die MobiHero GmbH keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte.',
        },
        {
          heading: '7. Haftung für Links',
          content: 'Diese Website enthält Verlinkungen zu externen Websites Dritter. Auf deren Inhalte hat die MobiHero GmbH keinen Einfluss. Für diese Inhalte wird daher keine Haftung übernommen.',
        },
        {
          heading: '8. Haftungsbeschränkung',
          content: 'Die Haftung der MobiHero GmbH ist, soweit gesetzlich zulässig, ausgeschlossen. Dies gilt nicht bei Vorsatz oder grober Fahrlässigkeit oder zwingenden gesetzlichen Haftungstatbeständen.',
        },
        {
          heading: '9. Datenschutz',
          content: 'Informationen zur Verarbeitung personenbezogener Daten sind in der separaten Datenschutzerklärung der Website geregelt.',
        },
        {
          heading: '10. Anwendbares Recht',
          content: 'Es gilt das Recht der Europäischen Union sowie ergänzend das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).',
        },
        {
          heading: '11. Gerichtsstand',
          content: 'Gerichtsstand für alle Streitigkeiten ist der Sitz der MobiHero GmbH in München, Deutschland.',
        },
        {
          heading: '12. Schlussbestimmungen',
          content: 'Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
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