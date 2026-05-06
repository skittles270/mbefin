import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const VIDEOS = [
  'https://videos.pexels.com/video-files/4477613/4477613-hd_1920_1080_30fps.mp4',    // interior warehouse aerial
  'https://videos.pexels.com/video-files/30605375/13104774_2560_1440_25fps.mp4',      // aerial outdoor warehouse & parking lot
  'https://videos.pexels.com/video-files/15978611/15978611-uhd_2560_1440_30fps.mp4', // trucks on highway aerial
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(() => {});
    }
  }, []);

  const handleEnded = () => {
    const next = (currentIndex + 1) % VIDEOS.length;
    setNextIndex(next);
    if (videoRefs.current[next]) {
      videoRefs.current[next].currentTime = 0;
      videoRefs.current[next].play().catch(() => {});
    }
    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
    }, 1500);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* All videos rendered, only current/next are visible */}
      {VIDEOS.map((src, i) => {
        const isCurrent = i === currentIndex;
        const isNext = i === nextIndex;
        return (
          <video
            key={src}
            ref={(el) => (videoRefs.current[i] = el)}
            muted
            playsInline
            autoPlay={isCurrent}
            onEnded={isCurrent ? handleEnded : undefined}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{
              filter: 'blur(4px)',
              transform: 'scale(1.05)',
              opacity: isCurrent || isNext ? 1 : 0,
              zIndex: isNext ? 1 : isCurrent ? 0 : -1,
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        );
      })}
      <div className="absolute inset-0 bg-black/55" style={{ zIndex: 2 }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center" style={{ zIndex: 3 }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-8 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/Contact" onClick={() => window.scrollTo(0, 0)}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base">
              {t.hero.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/About" onClick={() => window.scrollTo(0, 0)}>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium">
              {t.hero.learnMore}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground/50 mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}