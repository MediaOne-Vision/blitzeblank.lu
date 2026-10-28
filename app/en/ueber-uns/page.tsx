import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote, Shield, Heart, Target, Handshake, Compass, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Blitzeblank Luxembourg",
  description:
    "Get to know Blitzeblank. Learn more about our founder Mustapha El-Ali and our values for professional cleaning services.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/ueber-uns",
    languages: {
      de: "/ueber-uns",
      en: "/en/ueber-uns",
    },
  },
}

const values = [
  {
    icon: Shield,
    title: "Reliability",
    description: "We keep our promises. Punctuality and commitment are second nature to us.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Cleaning isn't just a job for us, it's a calling. We love what we do.",
  },
  {
    icon: Target,
    title: "Quality",
    description: "Our work isn't done until you're completely satisfied. We don't compromise.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "We see ourselves as partners to our clients. Long-term relationships are our goal.",
  },
]

export default function UeberUnsEnPage() {
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
              About Blitzeblank
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Professional cleaning with heart
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Blitzeblank stands for cleanliness you can rely on.
              Get to know us, our values and our story.
            </p>
          </div>
        </section>

        {/* Owner Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-blue/15 to-brand-teal/10" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-brand-navy/10">
                    <Image
                      src="/images/team/mustapha-el-ali-gruender-blitzeblank-handschlag.avif"
                      alt="Mustapha El-Ali, founder and managing director of Blitzeblank, in a black company shirt reaching out to shake hands"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Your point of contact
                </p>
                <h2 className="mb-2 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                  Mustapha El-Ali
                </h2>
                <p className="text-lg font-medium text-neutral-500 mb-6">
                  Founder &amp; Owner
                </p>

                <div className="relative mb-8 rounded-2xl bg-brand-mint p-6">
                  <Quote className="mb-2 h-7 w-7 text-brand-blue" />
                  <blockquote className="text-lg text-brand-navy font-medium leading-relaxed text-pretty">
                    {`"Cleanliness isn't just a job for me, it's a passion -
                    one my clients can rely on."`}
                  </blockquote>
                </div>

                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    My name is Mustapha El-Ali, founder and owner of Blitzeblank. With years of
                    experience in professional cleaning, I look after commercial and private
                    clients with a clear standard: thorough work, consistent processes and
                    absolute reliability.
                  </p>
                  <p>
                    Every property is planned personally and reviewed regularly, supported by
                    an experienced team that works to clear quality standards. The result is
                    cleanliness you can rely on.
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
                Our values
              </p>
              <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                What Blitzeblank stands for
              </h2>
              <p className="text-neutral-600 text-pretty">
                These values guide us in every decision and every job.
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
                Mission &amp; Vision
              </p>
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                What drives us
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-brand-navy p-8 text-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">Our mission</h3>
                <p className="text-white/75 leading-relaxed text-pretty">
                  Our mission is to create lastingly clean, well-maintained and hygienic spaces
                  for our clients - reliably, predictably and to a consistently high standard.
                  We rely on clear processes, trained staff and regular quality checks to carry
                  out every cleaning service efficiently and conscientiously.
                </p>
              </div>

              <div className="rounded-3xl bg-brand-teal p-8 text-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">Our vision</h3>
                <p className="text-white/80 leading-relaxed text-pretty">
                  Our vision is to be known as a trusted point of contact for building cleaning.
                  With clear standards, personal support and honest work, we want to build
                  long-term partnerships in which our clients can rely on consistent quality,
                  transparent communication and dependable results.
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
                  Get to know us personally
                </h2>
                <p className="mb-8 text-white/75 text-pretty">
                  Schedule a free on-site assessment and see our professionalism for yourself.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105"
                >
                  <Link href="/en/kontakt" className="cursor-pointer">
                    Get in touch
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
