import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin } from "lucide-react";

import FinalCta from "@/components/sections/FinalCta/FinalCta";
import RelatedContent, {
  RelatedContentItem,
} from "@/components/sections/RelatedContent/RelatedContent";

import "./ProjectPageTemplate.scss";

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectWorkItem = {
  title: string;
  description?: string;
};

export type ProjectPageData = {
  title: string;
  location: string;
  description: string;

  status?: string;
  completedAt?: string;

  heroImage?: ProjectImage;

  facts?: ProjectFact[];

  before?: {
    eyebrow?: string;
    title?: string;
    description: string;
    images?: ProjectImage[];
  };

  work?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: ProjectWorkItem[];
  };

  after?: {
    eyebrow?: string;
    title?: string;
    description: string;
    images?: ProjectImage[];
  };

  result?: {
    eyebrow?: string;
    title?: string;
    description: string;
  };

  relatedContent?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: RelatedContentItem[];
  };

  finalCta?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

type ProjectPageTemplateProps = {
  data: ProjectPageData;
};

export default function ProjectPageTemplate({
  data,
}: ProjectPageTemplateProps) {
  return (
    <>
      <article className="project-page">
        <header className="project-page__hero">
          <div className="container project-page__hero-container">
            <nav
              className="project-page__breadcrumbs"
              aria-label="Broodkruimelnavigatie"
            >
              <Link href="/">Home</Link>

              <span aria-hidden="true">/</span>

              <Link href="/projecten">Projecten</Link>

              <span aria-hidden="true">/</span>

              <span>{data.location}</span>
            </nav>

            <div className="project-page__hero-grid">
              <div className="project-page__hero-content">
                <span className="eyebrow">HaagVast project</span>

                <h1 className="heading-1 project-page__title">{data.title}</h1>

                <p className="project-page__description">{data.description}</p>

                <div className="project-page__meta">
                  <div className="project-page__meta-item">
                    <MapPin size={18} strokeWidth={2} aria-hidden="true" />

                    <span>{data.location}</span>
                  </div>

                  {data.completedAt && (
                    <div className="project-page__meta-item">
                      <CalendarDays
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                      <span>{data.completedAt}</span>
                    </div>
                  )}

                  {data.status && (
                    <span className="project-page__status">{data.status}</span>
                  )}
                </div>
              </div>

              {data.heroImage && (
                <div className="project-page__hero-image">
                  <Image
                    src={data.heroImage.src}
                    alt={data.heroImage.alt}
                    width={data.heroImage.width}
                    height={data.heroImage.height}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {data.facts && data.facts.length > 0 && (
          <section className="project-page__facts-section">
            <div className="container">
              <dl className="project-page__facts">
                {data.facts.map((fact) => (
                  <div
                    key={`${fact.label}-${fact.value}`}
                    className="project-page__fact"
                  >
                    <dt>{fact.label}</dt>

                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {data.before && (
          <section className="project-page__section section">
            <div className="container">
              <div className="project-page__section-header">
                <span className="eyebrow">
                  {data.before.eyebrow ?? "Voor de renovatie"}
                </span>

                <h2 className="heading-2 project-page__section-title">
                  {data.before.title ?? "De uitgangssituatie"}
                </h2>

                <p className="project-page__section-description">
                  {data.before.description}
                </p>
              </div>

              {data.before.images && data.before.images.length > 0 && (
                <ProjectGallery images={data.before.images} />
              )}
            </div>
          </section>
        )}

        {data.work && (
          <section className="project-page__section project-page__section--soft section">
            <div className="container">
              <div className="project-page__section-header">
                <span className="eyebrow">
                  {data.work.eyebrow ?? "De aanpak"}
                </span>

                <h2 className="heading-2 project-page__section-title">
                  {data.work.title ?? "Wat is er aangepakt?"}
                </h2>

                {data.work.description && (
                  <p className="project-page__section-description">
                    {data.work.description}
                  </p>
                )}
              </div>

              <div className="project-page__work-grid">
                {data.work.items.map((item) => (
                  <article key={item.title} className="project-page__work-item">
                    <span
                      className="project-page__work-icon"
                      aria-hidden="true"
                    >
                      <CheckCircle2 size={20} strokeWidth={2} />
                    </span>

                    <div>
                      <h3 className="project-page__work-title">{item.title}</h3>

                      {item.description && (
                        <p className="project-page__work-description">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.after && (
          <section className="project-page__section section">
            <div className="container">
              <div className="project-page__section-header">
                <span className="eyebrow">
                  {data.after.eyebrow ?? "Na de renovatie"}
                </span>

                <h2 className="heading-2 project-page__section-title">
                  {data.after.title ?? "Het eindresultaat"}
                </h2>

                <p className="project-page__section-description">
                  {data.after.description}
                </p>
              </div>

              {data.after.images && data.after.images.length > 0 && (
                <ProjectGallery images={data.after.images} />
              )}
            </div>
          </section>
        )}

        {data.result && (
          <section className="project-page__result">
            <div className="container project-page__result-container">
              <div>
                <span className="project-page__result-eyebrow">
                  {data.result.eyebrow ?? "Resultaat"}
                </span>

                <h2 className="project-page__result-title">
                  {data.result.title ??
                    "Een woning klaar voor de volgende stap"}
                </h2>

                <p className="project-page__result-description">
                  {data.result.description}
                </p>
              </div>

              <Link
                href="/contact"
                className="button button--accent project-page__result-cta"
              >
                <span>Vergelijkbare woning aanmelden</span>

                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}
      </article>

      {data.relatedContent && (
        <RelatedContent
          eyebrow={data.relatedContent.eyebrow}
          title={data.relatedContent.title ?? "Meer over HaagVast"}
          description={data.relatedContent.description}
          items={data.relatedContent.items}
        />
      )}

      <FinalCta
        eyebrow={data.finalCta?.eyebrow}
        title={
          data.finalCta?.title ??
          "Heeft u een woning die gemoderniseerd moet worden?"
        }
        description={
          data.finalCta?.description ??
          "Meld uw woning vrijblijvend aan. HaagVast bekijkt ook woningen met achterstallig onderhoud, een gedateerde afwerking of verduurzamingsmogelijkheden."
        }
        primaryLabel={data.finalCta?.primaryLabel}
        primaryHref={data.finalCta?.primaryHref}
        secondaryLabel={data.finalCta?.secondaryLabel}
        secondaryHref={data.finalCta?.secondaryHref}
      />
    </>
  );
}

type ProjectGalleryProps = {
  images: ProjectImage[];
};

function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div className="project-page__gallery">
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="project-page__gallery-item"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </figure>
      ))}
    </div>
  );
}
