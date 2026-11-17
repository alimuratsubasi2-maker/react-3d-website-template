import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from './reactbits/SplitText'
import Aurora from './reactbits/Aurora'
import AnimatedContent from './reactbits/AnimatedContent'
import SpotlightCard from './reactbits/SpotlightCard'
import CountUp from './reactbits/CountUp'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Lenis yumuşak kaydırma, GSAP ScrollTrigger ile senkron
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0"><Aurora colorStops={['#f59e0b', '#38bdf8', '#a78bfa']} /></div>
        <SplitText text="Firmanız için yeni nesil web sitesi" className="relative z-10 px-6 text-center text-5xl font-bold md:text-7xl" />
      </section>
      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-32 md:grid-cols-3">
        {['Mobil uyumlu', 'Hızlı yüklenir', 'Teklif formu'].map((t, i) => (
          <AnimatedContent key={t} delay={i * 0.1}>
            <SpotlightCard className="p-8"><h3 className="text-xl font-semibold">{t}</h3></SpotlightCard>
          </AnimatedContent>
        ))}
      </section>
      <section className="py-32 text-center">
        <div className="text-6xl font-bold"><CountUp to={150} />+</div>
        <p className="mt-2 text-zinc-400">tamamlanan proje</p>
      </section>
    </main>
  )
}
