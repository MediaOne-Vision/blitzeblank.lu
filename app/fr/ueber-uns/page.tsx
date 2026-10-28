import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote, Shield, Heart, Target, Handshake, Compass, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "À propos | Blitzeblank Luxembourg",
  description:
    "Faites connaissance avec Blitzeblank. Découvrez notre fondateur Mustapha El-Ali et nos valeurs pour des services de nettoyage professionnels.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/ueber-uns",
    languages: {
      de: "/ueber-uns",
      en: "/en/ueber-uns",
      fr: "/fr/ueber-uns",
    },
  },
}

const values = [
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Nous tenons nos promesses. Ponctualité et engagement vont de soi pour nous.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Le nettoyage n'est pas qu'un métier pour nous, c'est une vocation. Nous aimons ce que nous faisons.",
  },
  {
    icon: Target,
    title: "Qualité",
    description: "Notre travail n'est terminé que lorsque vous êtes entièrement satisfait. Nous ne faisons aucun compromis.",
  },
  {
    icon: Handshake,
    title: "Partenariat",
    description: "Nous nous considérons comme les partenaires de nos clients. Les relations durables sont notre objectif.",
  },
]

export default function UeberUnsFrPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15">
              <Sparkles className="h-4 w-4" />
              À propos de Blitzeblank
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Un nettoyage professionnel, fait avec cœur
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Blitzeblank, c&apos;est une propreté sur laquelle vous pouvez compter. Faites connaissance avec
              nous, nos valeurs et notre histoire.
            </p>
          </div>
        </section>

        {/* Owner Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-blue/15 to-brand-teal/10" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-brand-navy/10">
                    <Image
                      src="/images/team/mustapha-el-ali-gruender-blitzeblank-handschlag.avif"
                      alt="Mustapha El-Ali, fondateur et gérant de Blitzeblank, en polo noir de l'entreprise, tendant la main pour une poignée de main"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Votre interlocuteur
                </p>
                <h2 className="mb-2 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                  Mustapha El-Ali
                </h2>
                <p className="text-lg font-medium text-neutral-500 mb-6">Fondateur &amp; gérant</p>

                <div className="relative mb-8 rounded-2xl bg-brand-mint p-6">
                  <Quote className="mb-2 h-7 w-7 text-brand-blue" />
                  <blockquote className="text-lg text-brand-navy font-medium leading-relaxed text-pretty">
                    {`« La propreté n'est pas qu'un métier pour moi, c'est une passion – sur laquelle mes clients peuvent compter. »`}
                  </blockquote>
                </div>

                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    Je m&apos;appelle Mustapha El-Ali, fondateur et gérant de Blitzeblank. Fort de plusieurs
                    années d&apos;expérience dans le nettoyage professionnel, j&apos;accompagne des clients
                    professionnels et particuliers avec une exigence claire : un travail minutieux, des
                    processus constants et une fiabilité absolue.
                  </p>
                  <p>
                    Chaque site est planifié personnellement et contrôlé régulièrement, avec le soutien d&apos;une
                    équipe expérimentée qui travaille selon des standards de qualité clairs. Le résultat : une
                    propreté sur laquelle vous pouvez compter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-brand-mint py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                Nos valeurs
              </p>
              <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                Ce que représente Blitzeblank
              </h2>
              <p className="text-neutral-600 text-pretty">
                Ces valeurs nous guident dans chaque décision et chaque mission.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-navy/5 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue transition-transform group-hover:scale-110">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-brand-navy">{value.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                Mission &amp; vision
              </p>
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                Ce qui nous anime
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-brand-navy p-8 text-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">Notre mission</h3>
                <p className="text-white/75 leading-relaxed text-pretty">
                  Notre mission est de créer pour nos clients des espaces durablement propres, bien entretenus
                  et hygiéniques – de manière fiable, prévisible et avec un niveau d&apos;exigence constant.
                  Nous misons sur des processus clairs, du personnel formé et des contrôles qualité réguliers
                  pour réaliser chaque prestation de nettoyage efficacement et consciencieusement.
                </p>
              </div>

              <div className="rounded-3xl bg-brand-teal p-8 text-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">Notre vision</h3>
                <p className="text-white/80 leading-relaxed text-pretty">
                  Notre vision est d&apos;être reconnus comme un interlocuteur de confiance pour le nettoyage de
                  bâtiments. Avec des standards clairs, un accompagnement personnel et un travail honnête, nous
                  voulons construire des partenariats durables dans lesquels nos clients peuvent compter sur
                  une qualité constante, une communication transparente et des résultats fiables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center lg:py-20">
              <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  Faisons connaissance
                </h2>
                <p className="mb-8 text-white/75 text-pretty">
                  Convenez d&apos;une visite gratuite sur place et constatez notre professionnalisme par
                  vous-même.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105"
                >
                  <Link href="/fr/kontakt" className="cursor-pointer">
                    Nous contacter
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
