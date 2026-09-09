import {
  Building2,
  Hammer,
  Home,
  KeyRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import "./PropertyTypes.scss";

export type PropertyTypeIcon =
  | "home"
  | "apartment"
  | "building"
  | "hammer"
  | "wrench"
  | "key";

export type PropertyTypeItem = {
  title: string;
  description: string;
  icon?: PropertyTypeIcon;
};

type PropertyTypesProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: PropertyTypeItem[];
};

const iconMap: Record<PropertyTypeIcon, LucideIcon> = {
  home: Home,
  apartment: Building2,
  building: Building2,
  hammer: Hammer,
  wrench: Wrench,
  key: KeyRound,
};

export default function PropertyTypes({
  eyebrow,
  title,
  description,
  items,
}: PropertyTypesProps) {
  return (
    <section className="property-types section">
      <div className="container">
        <div className="property-types__header">
          <div className="property-types__heading">
            {eyebrow && (
              <span className="eyebrow property-types__eyebrow">{eyebrow}</span>
            )}

            <h2 className="heading-2 property-types__title">{title}</h2>
          </div>

          {description && (
            <p className="property-types__description">{description}</p>
          )}
        </div>

        <div className="property-types__list">
          {items.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : Home;

            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={`${item.title}-${index}`}
                className="property-types__item"
              >
                <div className="property-types__index">{number}</div>

                <div className="property-types__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                <div className="property-types__content">
                  <h3 className="property-types__item-title">{item.title}</h3>

                  <p className="property-types__item-description">
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
