import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "../../data/haagvast-regions";
import styles from "./regio.module.scss";

export const metadata: Metadata = {
  title: "Werkgebied Haaglanden | HaagVast",
  description:
    "Bekijk het werkgebied van HaagVast in Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland, Westland en Voorschoten.",
  alternates: {
    canonical: "/regio"
  }
};

export default function RegioPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              ONS WERKGEBIED
            </span>

            <h1>
              Actief in heel
              <br />
              Haaglanden
            </h1>

            <p className={styles.heroText}>
              HaagVast bekijkt woningen in Den Haag, Delft,
              Voorburg, Leidschendam, Rijswijk, Wassenaar,
              Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland
              en Westland. Ook Voorschoten behoort tot ons
              directe werkgebied.
            </p>

            <Link
              href="/woning-aanmelden"
              className={styles.primaryButton}
            >
              Woning aanmelden
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className={styles.container}>
          <div className={styles.regionHeading}>
            <div>
              <span className={styles.eyebrowDark}>
                REGIO'S
              </span>

              <h2>
                Bekijk HaagVast
                <br />
                bij u in de buurt
              </h2>
            </div>

            <p>
              Selecteer uw woonplaats of regio voor meer
              informatie over het aanmelden en verkopen van
              een woning in uw omgeving.
            </p>
          </div>

          <div className={styles.regionGrid}>
            {regions.map((region) => (
              <Link
                href={`/regio/${region.slug}`}
                key={region.slug}
                className={styles.regionCard}
              >
                <div>
                  <span className={styles.regionCardLabel}>
                    REGIO
                  </span>

                  <h3>{region.name}</h3>
                </div>

                <span className={styles.arrow}>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.softSection}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <div>
              <span className={styles.eyebrowDark}>
                HAAGLANDEN EN OMGEVING
              </span>

              <h2>
                Staat uw plaats
                <br />
                er niet tussen?
              </h2>
            </div>

            <div className={styles.textColumn}>
              <p>
                Ons kerngebied ligt in Haaglanden, maar ook
                woningen net buiten deze plaatsen kunnen
                interessant zijn.
              </p>

              <p>
                U kunt uw woning daarom altijd vrijblijvend
                aanmelden. We laten vervolgens weten of de
                locatie en situatie binnen onze mogelijkheden
                vallen.
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