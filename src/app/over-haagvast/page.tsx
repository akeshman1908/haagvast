import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Hammer,
  Home,
  MapPin,
  Scale,
  Wrench,
} from "lucide-react";

import Faq from "@/components/sections/Faq/Faq";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Process from "@/components/sections/Process/Process";
import RelatedContent from "@/components/sections/RelatedContent/RelatedContent";
import TrustBar from "@/components/sections/TrustBar/TrustBar";

import "./OverHaagVastPage.scss";

export const metadata: Metadata = {
  title: "Over HaagVast | Woninginkoop in Haaglanden",
  description:
    "Maak kennis met HaagVast en oprichter David. Lees waarom HaagVast woningen in regio Haaglanden anders bekijkt en hoe een rechtstreekse verkoop werkt.",
};

export default function OverHaagVastPage() {
  return (
    <main className="over-haagvast-page">
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__layout">
            <div className="about-hero__content">
              <span className="eyebrow about-hero__eyebrow">
                Over HaagVast
              </span>

              <h1 className="about-hero__title">
                We kijken niet alleen naar hoe een woning
                <span> er vandaag uitziet.</span>
              </h1>

              <p className="about-hero__lead">
                HaagVast richt zich op woningen in regio Haaglanden. Ook wanneer
                een woning gedateerd is, onderhoud nodig heeft of nog niet
                verkoopklaar is.
              </p>

              <div className="about-hero__actions">
                <Link
                  href="/contact"
                  className="button button--primary"
                >
                  <span>Mijn woning aanmelden</span>

                  <ArrowRight
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/werkwijze"
                  className="button button--secondary"
                >
                  Bekijk onze werkwijze
                </Link>
              </div>
            </div>

            <div className="about-hero__aside">
              <span className="about-hero__aside-label">
                Onze focus
              </span>

              <div className="about-hero__focus-list">
                <div className="about-hero__focus-item">
                  <span className="about-hero__focus-icon">
                    <MapPin
                      size={19}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <strong>Regio Haaglanden</strong>

                    <p>
                      Den Haag, Voorburg, Leidschendam, Rijswijk, Wassenaar en
                      directe omgeving.
                    </p>
                  </div>
                </div>

                <div className="about-hero__focus-item">
                  <span className="about-hero__focus-icon">
                    <Home
                      size={19}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <strong>Woningen in huidige staat</strong>

                    <p>
                      De woning hoeft niet eerst volledig gerenoveerd of
                      verkoopklaar gemaakt te worden.
                    </p>
                  </div>
                </div>

                <div className="about-hero__focus-item">
                  <span className="about-hero__focus-icon">
                    <Scale
                      size={19}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <strong>Duidelijke afweging</strong>

                    <p>
                      We kijken naar de woning, de werkzaamheden en de
                      mogelijkheden als geheel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar
        items={[
          {
            label: "Actief in Haaglanden",
            icon: "house",
          },
          {
            label: "Rechtstreeks contact",
            icon: "handshake",
          },
          {
            label: "Vrijblijvend aanmelden",
            icon: "check",
          },
          {
            label: "Ook woningen met werk",
            icon: "clock",
          },
        ]}
      />

      <section className="founder section">
        <div className="container">
          <div className="founder__layout">
            <div className="founder__visual">
              <div className="founder__image-frame">
                <Image
                  src="/profielfoto.jpg"
                  alt="David, oprichter van HaagVast"
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 42vw"
                  className="founder__image"
                />
              </div>

              <div className="founder__caption">
                <div>
                  <strong>David</strong>
                  <span>Oprichter HaagVast</span>
                </div>

                <span className="founder__caption-location">
                  <MapPin
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  Haaglanden
                </span>
              </div>
            </div>

            <div className="founder__content">
              <span className="eyebrow">
                Het verhaal achter HaagVast
              </span>

              <h2 className="heading-2 founder__title">
                Vanuit techniek, vastgoed en de overtuiging dat het eenvoudiger
                kan
              </h2>

              <p className="founder__intro">
                HaagVast is ontstaan vanuit een simpele gedachte: waarom moet
                een woning eerst volledig worden opgeknapt, gefotografeerd en
                gepresenteerd voordat iemand serieus naar de mogelijkheden
                ervan kijkt?
              </p>

              <div className="founder__text">
                <p>
                  Mijn naam is David en ik kom uit de regio Haaglanden. Vanuit
                  mijn technische achtergrond ben ik gewend om naar processen
                  te kijken en mezelf steeds dezelfde vraag te stellen:
                  kan dit eenvoudiger, slimmer en directer?
                </p>

                <p>
                  Die manier van denken neem ik ook mee naar vastgoed. Bij een
                  woning zie ik niet alleen een verouderde keuken, oude vloer of
                  badkamer die vervangen moet worden. Ik kijk juist naar wat er
                  achter die huidige staat zit: de locatie, de indeling, de
                  technische mogelijkheden en wat er van een woning gemaakt kan
                  worden.
                </p>

                <p>
                  Tegelijkertijd zag ik dat een traditioneel verkooptraject niet
                  voor iedere eigenaar de meest logische route is. Soms wil
                  iemand helemaal geen maanden bezig zijn met schilderen,
                  opruimen, styling, fotografie, bezichtigingen en
                  onderhandelingen.
                </p>

                <p>
                  Vanuit die combinatie is HaagVast ontstaan: een lokale,
                  praktische manier om rechtstreeks naar woningen te kijken,
                  juist ook wanneer er nog werk aan zit.
                </p>
              </div>

              <div className="founder__statement">
                <span className="founder__statement-mark">
                  “
                </span>

                <p>
                  Ik wil dat iemand een woning gewoon kan aanmelden zoals die er
                  nu bij staat. Eerst kijken wat mogelijk is, daarna pas
                  beslissen wat de beste route is.
                </p>

                <span className="founder__statement-name">
                  David — HaagVast
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story section">
        <div className="container">
          <div className="about-story__layout">
            <div className="about-story__heading">
              <span className="eyebrow">
                Waarom HaagVast
              </span>

              <h2 className="heading-2">
                Niet iedere woning past bij een traditioneel verkooptraject
              </h2>
            </div>

            <div className="about-story__content">
              <p className="about-story__intro">
                Een woning verkopen betekent niet automatisch dat u eerst moet
                verbouwen, stylen, fotograferen en meerdere bezichtigingsrondes
                moet organiseren.
              </p>

              <p>
                Zeker bij een gedateerde woning of een woning waar technisch
                werk aan zit, kan het interessant zijn om eerst te bekijken wat
                verkoop in de huidige staat betekent.
              </p>

              <p>
                HaagVast richt zich daarom op een andere route: rechtstreeks
                kijken naar de woning, de ligging, de staat en de
                mogelijkheden. Zonder dat de eigenaar eerst grote bedragen
                hoeft uit te geven om de woning mooier te presenteren.
              </p>

              <div className="about-story__quote">
                <span>
                  De huidige staat van een woning is niet het enige dat telt.
                  Ook de mogelijkheden erachter zijn belangrijk.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-assessment section">
        <div className="container">
          <div className="about-assessment__header">
            <div>
              <span className="eyebrow">
                Hoe we kijken
              </span>

              <h2 className="heading-2">
                We beoordelen meer dan alleen de afwerking
              </h2>
            </div>

            <p>
              Een oude keuken of badkamer zegt niet automatisch alles over een
              woning. We kijken naar het complete plaatje.
            </p>
          </div>

          <div className="about-assessment__list">
            <article className="about-assessment__item">
              <span className="about-assessment__number">
                01
              </span>

              <div className="about-assessment__icon">
                <MapPin
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3>Ligging</h3>

                <p>
                  Plaats, buurt, straat en de positie van de woning binnen de
                  lokale markt.
                </p>
              </div>
            </article>

            <article className="about-assessment__item">
              <span className="about-assessment__number">
                02
              </span>

              <div className="about-assessment__icon">
                <Home
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3>Woningtype</h3>

                <p>
                  Appartement, maisonette, eengezinswoning of een andere
                  woonvorm.
                </p>
              </div>
            </article>

            <article className="about-assessment__item">
              <span className="about-assessment__number">
                03
              </span>

              <div className="about-assessment__icon">
                <Hammer
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3>Afwerking</h3>

                <p>
                  Keuken, badkamer, vloer, wanden en overige onderdelen die
                  eventueel gemoderniseerd moeten worden.
                </p>
              </div>
            </article>

            <article className="about-assessment__item">
              <span className="about-assessment__number">
                04
              </span>

              <div className="about-assessment__icon">
                <Wrench
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3>Technische staat</h3>

                <p>
                  Bijvoorbeeld beglazing, verwarming, elektra, onderhoud en
                  verduurzamingsmogelijkheden.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="container">
          <div className="about-principles__layout">
            <div className="about-principles__heading">
              <span className="eyebrow about-principles__eyebrow">
                Waar we voor staan
              </span>

              <h2>
                Duidelijk over wat we wel en niet doen
              </h2>
            </div>

            <div className="about-principles__list">
              <div className="about-principles__item">
                <CheckCircle2
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Geen verplichte renovatie vooraf
                  </strong>

                  <p>
                    U hoeft een oude keuken, badkamer of vloer niet eerst te
                    vervangen voordat u de woning kunt aanmelden.
                  </p>
                </div>
              </div>

              <div className="about-principles__item">
                <CheckCircle2
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Geen verkoopshow nodig
                  </strong>

                  <p>
                    Voor een eerste beoordeling zijn professionele fotografie,
                    styling en een complete verkoopbrochure niet nodig.
                  </p>
                </div>
              </div>

              <div className="about-principles__item">
                <CheckCircle2
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Geen druk om direct te beslissen
                  </strong>

                  <p>
                    Een eerste woningaanmelding is vrijblijvend. U bepaalt zelf
                    of eventuele vervolgstappen bij u passen.
                  </p>
                </div>
              </div>

              <div className="about-principles__item">
                <CheckCircle2
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Wel duidelijke afspraken
                  </strong>

                  <p>
                    Als een verkooptraject wordt gestart, worden afspraken over
                    prijs, voorwaarden en overdracht duidelijk vastgelegd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Process
        eyebrow="Onze aanpak"
        title="Van eerste aanmelding naar een duidelijke keuze"
        description="We houden de eerste stappen bewust eenvoudig. U hoeft niet direct een volledig woningdossier aan te leveren."
        steps={[
          {
            icon: "house",
            title: "Woning aanmelden",
            description:
              "Begin met het adres van de woning en uw contactgegevens.",
          },
          {
            icon: "message",
            title: "Situatie bespreken",
            description:
              "We bespreken de woning, uw reden voor verkoop en uw gewenste planning.",
          },
          {
            icon: "clipboard",
            title: "Woning beoordelen",
            description:
              "We kijken naar ligging, woningtype, staat en mogelijke werkzaamheden.",
          },
          {
            icon: "check",
            title: "Mogelijkheden bespreken",
            description:
              "Daarna bespreekt u welke vervolgstappen eventueel bij uw situatie passen.",
          },
        ]}
      />

      <section className="about-region section">
        <div className="container">
          <div className="about-region__layout">
            <div className="about-region__content">
              <span className="eyebrow">
                Lokaal gericht
              </span>

              <h2 className="heading-2">
                Haaglanden is onze belangrijkste regio
              </h2>

              <p>
                HaagVast richt zich bewust op Den Haag en omliggende plaatsen.
                Lokale kennis helpt om niet alleen naar vierkante meters te
                kijken, maar ook naar de straat, buurt en mogelijkheden van een
                woning.
              </p>

              <Link
                href="/regio"
                className="about-region__link"
              >
                <span>Bekijk alle regio&apos;s</span>

                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="about-region__places">
              {[
                "Den Haag",
                "Voorburg",
                "Leidschendam",
                "Rijswijk",
                "Wassenaar",
              ].map((place, index) => (
                <div
                  key={place}
                  className="about-region__place"
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {place}
                  </strong>

                  <MapPin
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Faq
        eyebrow="Veelgestelde vragen"
        title="Meer over HaagVast"
        description="De belangrijkste vragen over onze focus en manier van werken."
        items={[
          {
            question:
              "Is HaagVast een traditionele verkoopmakelaar?",
            answer:
              "Nee. HaagVast richt zich op rechtstreekse woninginkoop en beoordeling van woningen. Voor een traditionele verkoop op de vrije markt kan een verkoopmakelaar juist een passende route zijn.",
          },
          {
            question:
              "Moet mijn woning eerst worden opgeknapt?",
            answer:
              "Nee. Ook woningen met een gedateerde keuken, badkamer, afwerking of technisch onderhoud kunnen worden aangemeld.",
          },
          {
            question:
              "Waar is HaagVast actief?",
            answer:
              "De focus ligt op regio Haaglanden, waaronder Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland en Westland.",
          },
          {
            question:
              "Kan ik mijn woning vrijblijvend aanmelden?",
            answer:
              "Ja. Een eerste woningaanmelding is vrijblijvend en bedoeld om te bekijken of verdere gesprekken zinvol zijn.",
          },
          {
            question:
              "Heb ik professionele foto's nodig?",
            answer:
              "Nee. Voor een eerste aanmelding zijn professionele woningfoto's of een complete verkoopbrochure niet nodig.",
          },
        ]}
      />

      <RelatedContent
        eyebrow="Meer informatie"
        title="Verder lezen over HaagVast"
        description="Bekijk onze werkwijze of lees meer over verschillende verkoopsituaties."
        items={[
          {
            type: "service",
            title: "Onze werkwijze",
            description:
              "Bekijk stap voor stap hoe een rechtstreekse woningaanmelding verloopt.",
            href: "/werkwijze",
          },
          {
            type: "service",
            title: "Kluswoning verkopen",
            description:
              "Lees meer over verkopen zonder eerst keuken, badkamer of afwerking te vernieuwen.",
            href: "/kluswoning-verkopen",
          },
          {
            type: "region",
            title: "Regio Haaglanden",
            description:
              "Bekijk in welke plaatsen HaagVast zich voornamelijk op woningen richt.",
            href: "/regio",
          },
        ]}
      />

      <FinalCta
        eyebrow="Uw woning"
        title="Wilt u weten of uw woning bij HaagVast past?"
        description="Meld uw woning vrijblijvend aan. De huidige staat hoeft niet perfect te zijn en u hoeft geen volledig verkoopdossier klaar te hebben."
        primaryLabel="Mijn woning aanmelden"
        primaryHref="/contact"
        secondaryLabel="Bekijk onze werkwijze"
        secondaryHref="/werkwijze"
      />
    </main>
  );
}
