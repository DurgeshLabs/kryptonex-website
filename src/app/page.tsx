import { Hero } from "@/components/sections/Hero";
import { TopicsBand } from "@/components/sections/TopicsBand";
import { About } from "@/components/sections/About";
import { Mission } from "@/components/sections/Mission";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { Roadmap } from "@/components/sections/Roadmap";
import { Events } from "@/components/sections/Events";
import { DigitalFortress } from "@/components/sections/DigitalFortress";
import { CtfJourney } from "@/components/sections/CtfJourney";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Recruitment } from "@/components/sections/Recruitment";
import { Contact } from "@/components/sections/Contact";
import { faqs } from "@/data";
import { site } from "@/lib/site";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />
      <TopicsBand />
      <About />
      <Mission />
      <WhyJoin />
      <Roadmap />
      <Events />
      <DigitalFortress />
      <CtfJourney />
      <Stats />
      <Gallery />
      <Team />
      <Testimonials />
      <Faq />
      <Recruitment />
      <Contact />
      <script
        type="application/ld+json"
        // Built from the local FAQ data file — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <span className="sr-only">{site.tagline}</span>
    </>
  );
}
