import {
  BadgeCheck,
  ClipboardCheck,
  Home,
  KeyRound,
  MessageCircleMore,
  type LucideIcon,
} from "lucide-react";

import "./Process.scss";

export type ProcessIcon =
  | "house"
  | "message"
  | "clipboard"
  | "check"
  | "key";

export type ProcessStep = {
  title: string;
  description: string;
  icon?: ProcessIcon;
};

type ProcessProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
};

const iconMap: Record<ProcessIcon, LucideIcon> = {
  house: Home,
  message: MessageCircleMore,
  clipboard: ClipboardCheck,
  check: BadgeCheck,
  key: KeyRound,
};

export default function Process({
  eyebrow,
  title,
  description,
  steps,
}: ProcessProps) {
  return (
    <section className="process section">
      <div className="container">
        <div className="process__header">
          <div className="process__heading">
            {eyebrow && (
              <span className="eyebrow process__eyebrow">
                {eyebrow}
              </span>
            )}

            <h2 className="heading-2 process__title">
              {title}
            </h2>
          </div>

          {description && (
            <p className="process__description">
              {description}
            </p>
          )}
        </div>

        <ol
          className={[
            "process__list",
            `process__list--count-${steps.length}`,
          ].join(" ")}
        >
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon ?? "check"];
            const number = String(index + 1).padStart(2, "0");

            return (
              <li
                key={`${number}-${step.title}`}
                className="process__step"
              >
                <div className="process__meta">
                  <span
                    className="process__number"
                    aria-hidden="true"
                  >
                    {number}
                  </span>

                  <span
                    className="process__icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                    />
                  </span>
                </div>

                <div className="process__content">
                  <h3 className="process__step-title">
                    {step.title}
                  </h3>

                  <p className="process__step-description">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
