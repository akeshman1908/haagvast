"use client";

import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";

import "./Faq.scss";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

type FaqProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
};

export default function Faq({ eyebrow, title, description, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleItem(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="faq section">
      <div className="container">
        <div className="faq__layout">
          <div className="faq__header">
            {eyebrow && <span className="eyebrow faq__eyebrow">{eyebrow}</span>}

            <h2 className="heading-2 faq__title">{title}</h2>

            {description && <p className="faq__description">{description}</p>}
          </div>

          <div className="faq__list">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              const answerId = `faq-answer-${index}`;

              const questionId = `faq-question-${index}`;

              return (
                <article
                  key={`${item.question}-${index}`}
                  className={["faq__item", isOpen ? "faq__item--open" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <h3 className="faq__question-heading">
                    <button
                      type="button"
                      id={questionId}
                      className="faq__question"
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="faq__question-text">
                        {item.question}
                      </span>

                      <span className="faq__question-icon" aria-hidden="true">
                        <Plus size={18} strokeWidth={1.8} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    className="faq__answer"
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                  >
                    <div className="faq__answer-inner">{item.answer}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
