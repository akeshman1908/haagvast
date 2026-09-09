import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import Benefits from "@/components/sections/Benefits/Benefits";
import ContentSection from "@/components/sections/ContentSection/ContentSection";
import Faq from "@/components/sections/Faq/Faq";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Process from "@/components/sections/Process/Process";
import RelatedContent from "@/components/sections/RelatedContent/RelatedContent";
import TrustBar from "@/components/sections/TrustBar/TrustBar";

import "./WerkwijzePage.scss";

export const metadata: Metadata = {
  title: "Werkwijze | Woning verkopen zonder gedoe | HaagVast",
  description:
    "Bekijk hoe rechtstreeks verkopen aan HaagVast werkt. Geen foto's, geen openbare bezichtigingsrondes en geen woning die eerst verkoopklaar hoeft te worden gemaakt.",
};

export default function WerkwijzePage() {
  return (
    <main className="werkwijze-page">
      <section className="werkwijze-hero">
        <div className="container">
          <div className="werkwijze-hero__layout">
            <div className="werkwijze-hero__heading">
              <span className="eyebrow werkwijze-hero__eyebrow">
                Rechtstreeks verkopen aan HaagVast
              </span>

              <h1 className="werkwijze-hero__title">
                U verkoopt de woning.
                <span> Wij regelen de rest.</span>
              </h1>
            </div>

            <div className="werkwijze-hero__content">
              <p className="werkwijze-hero__lead">
                Geen traditionele verkoopcampagne en geen woning die eerst
                perfect gepresenteerd moet worden. We bekijken de woning zoals
                deze er nu bij staat en begeleiden het traject van eerste
                contact tot aan de overdracht.
              </p>

              <ul className="werkwijze-hero__benefits">
                <li>
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>Geen professionele foto&apos;s nodig</span>
                </li>

                <li>
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>Geen openbare bezichtigingsrondes</span>
                </li>

                <li>
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>Geen traditionele verkoopmakelaar nodig</span>
                </li>

                <li>
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>Verkoop mogelijk in de huidige staat</span>
                </li>
              </ul>

              <div className="werkwijze-hero__actions">
                <Link
                  href="#stappen"
                  className="button button--primary werkwijze-hero__primary"
                >
                  Bekijk de 6 stappen
                </Link>

                <Link
                  href="/contact"
                  className="werkwijze-hero__secondary"
                >
                  Mijn woning aanmelden
                </Link>
              </div>

              <p className="werkwijze-hero__note">
                Een eerste woningaanmelding is vrijblijvend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustBar
        items={[
          {
            label: "Geen verkoopklaar maken",
            icon: "house",
          },
          {
            label: "Geen traditionele verkoopkosten",
            icon: "check",
          },
          {
            label: "Papierwerk begeleid",
            icon: "handshake",
          },
          {
            label: "Overdracht in overleg",
            icon: "clock",
          },
        ]}
      />

      <div id="stappen" className="werkwijze-page__steps-anchor">
        <Process
          eyebrow="Van aanmelding tot overdracht"
          title="Zes duidelijke stappen"
          description="Geen wirwar van partijen of een lang openbaar verkooptraject. We houden iedere stap overzichtelijk en begeleiden het proces van het eerste contact tot aan de notaris."
          steps={[
            {
              icon: "house",
              title: "Woning aanmelden",
              description:
                "U geeft het adres en een korte toelichting door. Professionele foto's of een verkoopbrochure zijn niet nodig.",
            },
            {
              icon: "message",
              title: "Uw situatie bespreken",
              description:
                "We bespreken waarom u wilt verkopen, de huidige staat van de woning en welke planning voor u belangrijk is.",
            },
            {
              icon: "clipboard",
              title: "Woning beoordelen",
              description:
                "We beoordelen de woning zoals deze er nu bij staat. Als een bezoek nodig is, plannen we rechtstreeks één geschikt moment met u.",
            },
            {
              icon: "message",
              title: "Voorstel en afspraken",
              description:
                "We bespreken duidelijk de mogelijkheden, voorwaarden, kosten en de gewenste datum van overdracht.",
            },
            {
              icon: "clipboard",
              title: "Koopcontract regelen",
              description:
                "Bij akkoord zorgen we dat de gemaakte afspraken correct worden uitgewerkt en begeleiden we het benodigde papierwerk.",
            },
            {
              icon: "key",
              title: "Overdracht bij de notaris",
              description:
                "We stemmen het traject richting de notaris af. De juridische eigendomsoverdracht vindt plaats op de afgesproken datum.",
            },
          ]}
        />
      </div>

      <ContentSection
        eyebrow="Veel minder voorbereiden"
        title="Een groot deel van het traditionele verkoopwerk kunt u overslaan"
        description="Omdat HaagVast rechtstreeks naar de woning kijkt, hoeft u niet eerst een volledige verkoopcampagne op te tuigen."
        content={
          <div className="werkwijze-page__prose">
            <p>
              U hoeft geen fotograaf te regelen, geen woningpresentatie te
              maken en geen reeks bezichtigingen te organiseren.
            </p>

            <p>
              De woning hoeft ook niet eerst opnieuw geschilderd,
              gemoderniseerd of verkoopklaar gemaakt te worden. We beoordelen
              deze juist in de huidige staat.
            </p>

            <p>
              Daardoor begint het traject niet met weken voorbereiding, maar
              gewoon met het aanmelden van uw woning.
            </p>
          </div>
        }
        aside={
          <div className="werkwijze-page__info-panel">
            <span className="werkwijze-page__panel-label">
              U hoeft niet eerst te regelen
            </span>

            <ul className="werkwijze-page__checklist">
              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Professionele woningfotografie</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Verkoopstyling of presentatie</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Openbare bezichtigingsrondes</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Advertentiecampagne of Funda-presentatie</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Een verkoopmakelaar om een koper te zoeken</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Eerst investeren in renovatie</span>
              </li>
            </ul>
          </div>
        }
      />

      <Benefits
        eyebrow="De huidige staat"
        title="De woning hoeft niet eerst opgeknapt te worden"
        description="We beoordelen wat er nu staat en houden rekening met werkzaamheden die later eventueel nodig zijn."
        items={[
          {
            icon: "wrench",
            title: "Achterstallig onderhoud",
            description:
              "Schilderwerk, kozijnen, installaties of ander onderhoud hoeft niet eerst aangepakt te worden.",
          },
          {
            icon: "hammer",
            title: "Gedateerde keuken of badkamer",
            description:
              "Een oudere keuken, badkamer of afwerking hoeft niet eerst vervangen te worden.",
          },
          {
            icon: "house",
            title: "Renovatiewoning",
            description:
              "Ook woningen waarvoor grotere werkzaamheden nodig zijn kunnen worden beoordeeld.",
          },
          {
            icon: "check",
            title: "Minder gunstig energielabel",
            description:
              "U hoeft de woning niet eerst volledig te verduurzamen voordat u deze aanmeldt.",
          },
          {
            icon: "message",
            title: "Niet verkoopklaar",
            description:
              "De woning hoeft niet gestyled, leeggeruimd of speciaal voor bezoekers ingericht te worden.",
          },
          {
            icon: "key",
            title: "Bijzondere situatie",
            description:
              "Ook bij een erfenis, verhuizing of leegkomende woning kunnen we de mogelijkheden bespreken.",
          },
        ]}
      />

      <ContentSection
        eyebrow="Kosten"
        title="Geen traditionele verkoopkosten om eerst een koper te vinden"
        description="HaagVast is zelf de geïnteresseerde koper. Daardoor vervallen verschillende onderdelen van een regulier verkooptraject."
        muted
        content={
          <div className="werkwijze-page__comparison">
            <div className="werkwijze-page__comparison-row">
              <div>
                <span className="werkwijze-page__comparison-label">
                  Geen makelaarscourtage
                </span>

                <h3>Geen verkoopmakelaar die een koper hoeft te zoeken</h3>
              </div>

              <p>
                HaagVast koopt rechtstreeks van de eigenaar. U hoeft daarom
                geen verkoopmakelaar in te schakelen om de woning openbaar te
                vermarkten.
              </p>
            </div>

            <div className="werkwijze-page__comparison-row">
              <div>
                <span className="werkwijze-page__comparison-label">
                  Geen marketingkosten
                </span>

                <h3>Geen fotografie, woningadvertentie of verkoopcampagne</h3>
              </div>

              <p>
                Omdat er al rechtstreeks contact met een potentiële koper is,
                hoeft u geen uitgebreide woningpresentatie te laten maken.
              </p>
            </div>

            <div className="werkwijze-page__comparison-row">
              <div>
                <span className="werkwijze-page__comparison-label">
                  Vooraf afgesproken
                </span>

                <h3>Duidelijkheid over kosten vóór u tekent</h3>
              </div>

              <p>
                Welke kosten HaagVast binnen het rechtstreekse aankooptraject
                voor zijn rekening neemt, leggen we vooraf duidelijk vast.
              </p>
            </div>
          </div>
        }
        aside={
          <div className="werkwijze-page__aside-quote">
            <span>Ons uitgangspunt</span>

            <p>
              Geen verrassingen achteraf. Eerst duidelijke afspraken, daarna
              pas verder.
            </p>
          </div>
        }
      />

      <ContentSection
        eyebrow="Papierwerk"
        title="Ook de praktische afhandeling begeleiden we"
        description="Eenvoudig verkopen betekent niet dat belangrijke afspraken worden overgeslagen."
        reversed
        content={
          <div className="werkwijze-page__prose">
            <p>
              Bij akkoord moeten onder andere de koopsom, voorwaarden,
              overdrachtsdatum en relevante informatie over de woning correct
              worden vastgelegd.
            </p>

            <p>
              HaagVast begeleidt de uitwerking van deze afspraken en zorgt dat
              de benodigde informatie bij de betrokken partijen terechtkomt.
            </p>

            <p>
              De juridische eigendomsoverdracht zelf vindt uiteindelijk plaats
              via de notaris.
            </p>
          </div>
        }
        aside={
          <div className="werkwijze-page__info-panel">
            <span className="werkwijze-page__panel-label">
              Van akkoord tot overdracht
            </span>

            <ul className="werkwijze-page__checklist">
              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Koopovereenkomst en gemaakte afspraken</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Afstemming van de overdrachtsdatum</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Benodigde informatie verzamelen</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Voorbereiding richting de notaris</span>
              </li>

              <li>
                <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Begeleiding tot aan de overdracht</span>
              </li>
            </ul>
          </div>
        }
      />

      <ContentSection
        eyebrow="Discreet verkopen"
        title="Geen openbare woningadvertentie nodig"
        description="Een rechtstreekse verkoop kan plaatsvinden zonder dat de woning eerst openbaar op de markt hoeft te verschijnen."
        muted
        content={
          <div className="werkwijze-page__prose">
            <p>
              Geen woning die weken online hoeft te staan, geen bord voor het
              huis en geen grote groep geïnteresseerden die door de woning
              komt.
            </p>

            <p>
              Het traject blijft beperkt tot u, HaagVast en de partijen die
              daadwerkelijk nodig zijn voor een correcte afhandeling.
            </p>
          </div>
        }
      />

      <Faq
        eyebrow="Veelgestelde vragen"
        title="Wat nemen jullie uit handen?"
        description="Praktische antwoorden over rechtstreeks verkopen aan HaagVast."
        items={[
          {
            question: "Moet ik foto's van mijn woning laten maken?",
            answer:
              "Nee. Voor een rechtstreekse verkoop aan HaagVast is geen professionele fotoshoot of openbare woningpresentatie nodig.",
          },
          {
            question: "Moet ik mijn woning eerst opknappen?",
            answer:
              "Nee. De woning kan in de huidige staat worden beoordeeld. Gedateerde afwerking, onderhoud of renovatiewerk hoeft niet eerst opgelost te worden.",
          },
          {
            question: "Komen er meerdere mensen mijn woning bezichtigen?",
            answer:
              "Er zijn geen openbare bezichtigingsrondes. Als een fysieke beoordeling nodig is, maken we daarvoor rechtstreeks een geschikt moment met u.",
          },
          {
            question: "Heb ik een verkoopmakelaar nodig?",
            answer:
              "Nee. HaagVast bekijkt de mogelijkheid om rechtstreeks van de eigenaar te kopen. Een traditionele verkoopmakelaar is daarom niet nodig om HaagVast als koper te bereiken.",
          },
          {
            question: "Regelt HaagVast ook het koopcontract?",
            answer:
              "Bij akkoord begeleiden we het vastleggen en uitwerken van de gemaakte afspraken. De uiteindelijke eigendomsoverdracht vindt via de notaris plaats.",
          },
          {
            question: "Zijn er verkoopkosten?",
            answer:
              "U heeft geen traditionele makelaars-, fotografie- of advertentiekosten nodig om HaagVast als koper te bereiken. Welke overige kosten binnen het aankooptraject door HaagVast worden gedragen, leggen we vooraf vast.",
          },
          {
            question: "Hoef ik zelf helemaal niets meer te doen?",
            answer:
              "We nemen zoveel mogelijk van het praktische traject uit handen. Als eigenaar moet u wel correcte informatie over de woning en relevante bijzonderheden verstrekken.",
          },
        ]}
      />

      <RelatedContent
        eyebrow="Meer informatie"
        title="Bekijk ook deze verkoopsituaties"
        description="Rechtstreeks verkopen kan bij verschillende woningen en omstandigheden interessant zijn."
        items={[
          {
            title: "Kluswoning verkopen",
            description:
              "Een woning met renovatiewerk verkopen zonder deze eerst volledig op te knappen.",
            href: "/kluswoning-verkopen",
            type: "service",
          },
          {
            title: "Huis verkopen zonder makelaar",
            description:
              "Bekijk hoe een directe verkoop zonder traditioneel makelaarstraject werkt.",
            href: "/huis-verkopen-zonder-makelaar",
            type: "service",
          },
          {
            title: "Huis snel verkopen",
            description:
              "Meer duidelijkheid wanneer eenvoud en een overzichtelijk proces belangrijk zijn.",
            href: "/huis-snel-verkopen",
            type: "service",
          },
        ]}
      />

      <FinalCta
        eyebrow="Uw woning"
        title="Wilt u weten wat we voor uw woning kunnen betekenen?"
        description="U hoeft geen foto's te laten maken of eerst te verbouwen. Meld de woning vrijblijvend aan en vertel ons kort om welke situatie het gaat."
        primaryLabel="Mijn woning aanmelden"
        primaryHref="/contact"
        secondaryLabel="Bekijk onze regio"
        secondaryHref="/regio"
      />
    </main>
  );
}
