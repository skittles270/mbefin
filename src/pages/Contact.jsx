import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import SectionLabel from '@/components/shared/SectionLabel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const data = new FormData();
      data.append('access_key', '40f7ee43-ce7b-454e-939a-bb46d3d888ff');
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('company', form.company);
      data.append('message', form.message);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      toast.success(t.contact.success);
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <SectionLabel>{t.contact.sectionLabel}</SectionLabel>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3">
            
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.nameLabel}</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">{t.contact.companyLabel}</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.messageLabel}</Label>
                <Textarea
                  id="message"
                  placeholder={t.contact.messagePlaceholder}
                  className="h-32 resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12 text-base">
                {sending ?
                <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    {t.contact.sending}
                  </span> :
                <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {t.contact.submit}
                  </span>
                }
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2 space-y-6">
            
            {[
            { icon: Mail, label: t.contact.emailLabel, value: 'proc@mbe-group.com' },
            { icon: MapPin, label: t.contact.visitLabel, value: 'Munich, Germany - Bremen, Germany' },
            { icon: Clock, label: t.contact.responseLabel, value: '< 24 hours' }].
            map((item, i) =>
            <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-foreground font-medium mt-0.5">{item.value}</p>
                </div>
              </div>
            )}

            




            
          </motion.div>
        </div>
      </div>
    </section>);

}