import {
  BadgeCheck,
  Building2,
  Calculator,
  CalendarClock,
  Hammer,
  Home,
  MessageCircleMore,
  Wrench,
} from "lucide-react";

import "./Benefits.scss";

export type BenefitIcon =
  | "apartment"
  | "check"
  | "hammer"
  | "house"
  | "key"
  | "message"
  | "wallet"
  | "wrench";

export type BenefitItem = {
  title: string;
  description: string;
  icon?: BenefitIcon;
};

type BenefitsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: BenefitItem[];
};

const iconMap = {
  apartment: Building2,
  check: BadgeCheck,
  hammer: Hammer,
  house: Home,
  key: CalendarClock,
  message: MessageCircleMore,
  wallet: Calculator,
  wrench: Wrench,
};

export default function Benefits({
  eyebrow,
  title,
  description,
  items,
}: BenefitsProps) {
  return (
    <section className="benefits section">
      <div className="container">
        <div className="benefits__header">
          {eyebrow && (
            <span className="eyebrow benefits__eyebrow">{eyebrow}</span>
          )}

          <h2 className="heading-2 benefits__title">{title}</h2>

          {description && (
            <p className="benefits__description">{description}</p>
          )}
        </div>

        <div className="benefits__grid">
          {items.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : BadgeCheck;

            return (
              <article key={item.title} className="benefits__card">
                <div className="benefits__icon" aria-hidden="true">
                  <Icon size={25} strokeWidth={1.9} />
                </div>

                <div className="benefits__content">
                  <h3 className="benefits__card-title">{item.title}</h3>

                  <p className="benefits__card-description">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
