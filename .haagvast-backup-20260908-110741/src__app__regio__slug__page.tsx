import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRegionBySlug,
  regions
} from "../../../data/haagvast-regions";
import styles from "../regio.module.scss";

type RegionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug
  }));
}

export async function generateMetadata({
  params
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return {};
  }

  return {
    title: region.seoTitle,
    description: region.seoDescription,
    alternates: {
      canonical: `/regio/${region.slug}`
    },
    openGraph: {
      title: region.seoTitle,
      description: region.seoDescription,
      type: "website"
    }
  };
}

export default async function RegionPage({
  params
}: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              {region.eyebrow}
            </span>

            <h1>
              Uw woning verkopen
              <br />
              in {region.name}
            </h1>

            <p className={styles.heroText}>
              {region.intro}
            </p>

            <div className={styles.heroActions}>
              <Link
                href="/woning-aanmelden"
                className={styles.primaryButton}
              >
                Woning aanmelden
              </Link>

              <a
                href="#werkwijze"
                className={styles.secondaryButton}
              >
                Bekijk de werkwijze
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <div>
              <span className={styles.eyebrowDark}>
                LOKAAL EN DUIDELIJK
              </span>

              <h2>
                Een woning verkopen
                <br />
                in {region.name}
              </h2>
            </div>

            <div className={styles.textColumn}>
              <p>
                {region.localText}
              </p>

              <p>
                {region.propertyText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.softSection}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <div>
              <span className={styles.eyebrowDark}>
                WERKGEBIED
              </span>

              <h2>
                Actief in {region.name}
                <br />
                en omgeving
              </h2>
            </div>

            <div>
              <p className={styles.sectionIntro}>
                HaagVast is actief in heel Haaglanden en in
                direct aangrenzende plaatsen zoals Voorschoten.
                Binnen {region.name} kijken we onder andere naar:
              </p>

              <div className={styles.areaGrid}>
                {region.areas.map((area) => (
                  <div
                    key={area}
                    className={styles.areaItem}
                  >
                    <span className={styles.check}>
                      ✓
                    </span>

                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="werkwijze"
        className={styles.lightSection}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrowDark}>
              ONZE AANPAK
            </span>

            <h2>
              Van eerste aanmelding
              <br />
              naar een duidelijke keuze
            </h2>

            <p>
              We houden de eerste stappen bewust eenvoudig.
              U hoeft niet direct een volledig woningdossier
              aan te leveren.
            </p>
          </div>

          <div className={styles.steps}>
            <article className={styles.step}>
              <span className={styles.stepNumber}>
                01
              </span>

              <h3>Woning aanmelden</h3>

              <p>
                Begin met het adres van de woning en vertel
                kort wat uw situatie en wensen zijn.
              </p>
            </article>

            <article className={styles.step}>
              <span className={styles.stepNumber}>
                02
              </span>

              <h3>Situatie bespreken</h3>

              <p>
                We bespreken de woning, uw planning en eventuele
                bijzonderheden rondom de verkoop.
              </p>
            </article>

            <article className={styles.step}>
              <span className={styles.stepNumber}>
                03
              </span>

              <h3>Woning beoordelen</h3>

              <p>
                We kijken naar de ligging, het woningtype,
                de staat van onderhoud en de mogelijkheden.
              </p>
            </article>

            <article className={styles.step}>
              <span className={styles.stepNumber}>
                04
              </span>

              <h3>Mogelijkheden bespreken</h3>

              <p>
                Daarna bespreken we welke vervolgstappen
                mogelijk zijn. U bepaalt zelf wat bij u past.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div>
              <span className={styles.eyebrowDark}>
                VRIJBLIJVEND AANMELDEN
              </span>

              <h2>
                Benieuwd naar de mogelijkheden
                voor uw woning in {region.name}?
              </h2>
            </div>

            <div className={styles.ctaRight}>
              <p>
                Meld uw woning vrijblijvend aan. Daarna bekijken
                we of en welke vervolgstappen bij uw woning en
                situatie passen.
              </p>

              <Link
                href="/woning-aanmelden"
                className={styles.darkButton}
              >
                Woning aanmelden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}