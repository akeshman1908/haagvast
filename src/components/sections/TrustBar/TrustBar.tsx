import { BadgeCheck, Clock3, Handshake, House, LucideIcon } from "lucide-react";

import "./TrustBar.scss";

export type TrustBarIcon = "house" | "handshake" | "check" | "clock";

export type TrustBarItem = {
  label: string;
  icon?: TrustBarIcon;
};

type TrustBarProps = {
  items?: TrustBarItem[];
};

const iconMap: Record<TrustBarIcon, LucideIcon> = {
  house: House,
  handshake: Handshake,
  check: BadgeCheck,
  clock: Clock3,
};

const defaultItems: TrustBarItem[] = [
  {
    label: "Actief in regio Haaglanden",
    icon: "house",
  },
  {
    label: "Rechtstreeks contact",
    icon: "handshake",
  },
  {
    label: "Vrijblijvende beoordeling",
    icon: "check",
  },
  {
    label: "Snel duidelijkheid",
    icon: "clock",
  },
];

export default function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <section className="trust-bar" aria-label="Voordelen HaagVast">
      <div className="container trust-bar__container">
        <div className="trust-bar__grid">
          {items.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : BadgeCheck;

            return (
              <div key={item.label} className="trust-bar__item">
                <span className="trust-bar__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span className="trust-bar__label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
