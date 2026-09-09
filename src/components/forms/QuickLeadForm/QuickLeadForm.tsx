"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";

import "./QuickLeadForm.scss";

type QuickLeadFormProps = {
  title?: string;
  description?: string;
  source?: string;
};

type FormData = {
  postalCode: string;
  houseNumber: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  website: string;
};

type FormErrors = Partial<
  Record<
    Exclude<keyof FormData, "website">,
    string
  >
>;

const initialFormData: FormData = {
  postalCode: "",
  houseNumber: "",
  name: "",
  phone: "",
  email: "",
  note: "",
  website: "",
};

function normalizePostalCode(value: string) {
  const clean = value
    .replace(/\s+/g, "")
    .toUpperCase();

  if (clean.length <= 4) {
    return clean;
  }

  return `${clean.slice(0, 4)} ${clean.slice(
    4,
    6
  )}`;
}

export default function QuickLeadForm({
  title = "Meld uw woning vrijblijvend aan",
  description = "Start met uw postcode en huisnummer.",
  source = "website",
}: QuickLeadFormProps) {
  const [step, setStep] =
    useState<1 | 2>(1);

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (field !== "website") {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    setSubmitError(null);
  }

  function validateAddress() {
    const nextErrors: FormErrors = {};

    const postalCode =
      formData.postalCode
        .replace(/\s+/g, "")
        .trim();

    const houseNumber =
      formData.houseNumber.trim();

    if (
      !/^[1-9][0-9]{3}[A-Za-z]{2}$/.test(
        postalCode
      )
    ) {
      nextErrors.postalCode =
        "Vul een geldige postcode in, bijvoorbeeld 2271 AA.";
    }

    if (!houseNumber) {
      nextErrors.houseNumber =
        "Vul uw huisnummer in.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  }

  function validateContact() {
    const nextErrors: FormErrors = {};

    if (
      formData.name.trim().length < 2
    ) {
      nextErrors.name =
        "Vul uw naam in.";
    }

    const cleanPhone =
      formData.phone.replace(
        /[\s()+-]/g,
        ""
      );

    if (
      !/^[0-9]{8,15}$/.test(cleanPhone)
    ) {
      nextErrors.phone =
        "Vul een geldig telefoonnummer in.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      nextErrors.email =
        "Vul een geldig e-mailadres in.";
    }

    if (formData.note.length > 1500) {
      nextErrors.note =
        "Uw toelichting mag maximaal 1500 tekens bevatten.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  }

  function handleContinue() {
    setSubmitError(null);

    if (!validateAddress()) {
      return;
    }

    setFormData((current) => ({
      ...current,
      postalCode: normalizePostalCode(
        current.postalCode
      ),
    }));

    setStep(2);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError(null);

    if (!validateAddress()) {
      setStep(1);
      return;
    }

    if (!validateContact()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/leads",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            postalCode:
              normalizePostalCode(
                formData.postalCode
              ),
            houseNumber:
              formData.houseNumber.trim(),
            name:
              formData.name.trim(),
            phone:
              formData.phone.trim(),
            email:
              formData.email
                .trim()
                .toLowerCase(),
            note:
              formData.note.trim(),
            source,
            website:
              formData.website,
          }),
        }
      );

      let result: {
        ok?: boolean;
        message?: string;
        id?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Versturen mislukt (${response.status}).`
        );
      }

      if (!result.ok) {
        throw new Error(
          result.message ||
            "De woningaanmelding kon niet worden verstuurd."
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Woningaanmelding fout:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Er ging iets mis tijdens het versturen. Probeer het opnieuw."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="quick-lead-form quick-lead-form--success"
        role="status"
        aria-live="polite"
      >
        <div
          className="quick-lead-form__success-icon"
          aria-hidden="true"
        >
          <CheckCircle2
            size={28}
            strokeWidth={1.8}
          />
        </div>

        <span className="quick-lead-form__kicker">
          Aanmelding ontvangen
        </span>

        <h2 className="quick-lead-form__title">
          Bedankt voor uw aanmelding
        </h2>

        <p className="quick-lead-form__description">
          Uw woningaanmelding is goed
          ontvangen. We bekijken de gegevens
          en nemen contact met u op om de
          woning en uw situatie te bespreken.
        </p>

        <div className="quick-lead-form__success-note">
          <CheckCircle2
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span>
            U zit door deze eerste
            woningaanmelding nergens aan vast.
          </span>
        </div>
      </div>
    );
  }

  return (
    <form
      className="quick-lead-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        className="quick-lead-form__honeypot"
        aria-hidden="true"
      >
        <label htmlFor={`website-${source}`}>
          Website
        </label>

        <input
          id={`website-${source}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(event) =>
            updateField(
              "website",
              event.target.value
            )
          }
        />
      </div>

      <div className="quick-lead-form__header">
        <div
          className="quick-lead-form__step-indicator"
          aria-label={`Stap ${step} van 2`}
        >
          <span
            className={[
              "quick-lead-form__step",
              step === 1
                ? "quick-lead-form__step--active"
                : "quick-lead-form__step--done",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {step === 2 ? (
              <CheckCircle2
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />
            ) : (
              "1"
            )}
          </span>

          <span className="quick-lead-form__step-line" />

          <span
            className={[
              "quick-lead-form__step",
              step === 2
                ? "quick-lead-form__step--active"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            2
          </span>
        </div>

        <span className="quick-lead-form__kicker">
          {step === 1
            ? "Uw woning"
            : "Contactgegevens"}
        </span>

        <h2 className="quick-lead-form__title">
          {title}
        </h2>

        <p className="quick-lead-form__description">
          {step === 1
            ? description
            : "Laat uw gegevens achter. We gebruiken deze alleen om contact met u op te nemen over uw woningaanmelding."}
        </p>
      </div>

      {step === 1 && (
        <div className="quick-lead-form__body">
          <div className="quick-lead-form__address">
            <div className="quick-lead-form__field">
              <label
                className="quick-lead-form__label"
                htmlFor={`postal-code-${source}`}
              >
                Postcode
              </label>

              <input
                id={`postal-code-${source}`}
                type="text"
                inputMode="text"
                autoComplete="postal-code"
                placeholder="2271 AA"
                maxLength={7}
                value={formData.postalCode}
                aria-invalid={
                  Boolean(
                    errors.postalCode
                  )
                }
                onChange={(event) =>
                  updateField(
                    "postalCode",
                    event.target.value
                      .toUpperCase()
                      .slice(0, 7)
                  )
                }
                onBlur={() => {
                  if (
                    formData.postalCode
                  ) {
                    setFormData(
                      (current) => ({
                        ...current,
                        postalCode:
                          normalizePostalCode(
                            current.postalCode
                          ),
                      })
                    );
                  }
                }}
                className={[
                  "form-control",
                  errors.postalCode
                    ? "form-control--error"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />

              {errors.postalCode && (
                <p
                  className="quick-lead-form__error"
                  role="alert"
                >
                  {errors.postalCode}
                </p>
              )}
            </div>

            <div className="quick-lead-form__field">
              <label
                className="quick-lead-form__label"
                htmlFor={`house-number-${source}`}
              >
                Huisnummer
              </label>

              <input
                id={`house-number-${source}`}
                type="text"
                inputMode="text"
                autoComplete="address-line2"
                placeholder="38"
                maxLength={20}
                value={
                  formData.houseNumber
                }
                aria-invalid={
                  Boolean(
                    errors.houseNumber
                  )
                }
                onChange={(event) =>
                  updateField(
                    "houseNumber",
                    event.target.value
                  )
                }
                className={[
                  "form-control",
                  errors.houseNumber
                    ? "form-control--error"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />

              {errors.houseNumber && (
                <p
                  className="quick-lead-form__error"
                  role="alert"
                >
                  {errors.houseNumber}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="button button--primary quick-lead-form__continue"
            onClick={handleContinue}
          >
            <span>Verder</span>

            <ChevronRight
              size={17}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </button>

          <div className="quick-lead-form__security">
            <LockKeyhole
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>
              Vrijblijvend. Geen
              foto&apos;s of verkoopbrochure
              nodig.
            </span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="quick-lead-form__body">
          <div className="quick-lead-form__field">
            <label
              className="quick-lead-form__label"
              htmlFor={`name-${source}`}
            >
              Naam
            </label>

            <input
              id={`name-${source}`}
              type="text"
              autoComplete="name"
              value={formData.name}
              aria-invalid={
                Boolean(errors.name)
              }
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              className={[
                "form-control",
                errors.name
                  ? "form-control--error"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            {errors.name && (
              <p
                className="quick-lead-form__error"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="quick-lead-form__field">
            <label
              className="quick-lead-form__label"
              htmlFor={`phone-${source}`}
            >
              Telefoonnummer
            </label>

            <input
              id={`phone-${source}`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              aria-invalid={
                Boolean(errors.phone)
              }
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value
                )
              }
              className={[
                "form-control",
                errors.phone
                  ? "form-control--error"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            {errors.phone && (
              <p
                className="quick-lead-form__error"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          <div className="quick-lead-form__field">
            <label
              className="quick-lead-form__label"
              htmlFor={`email-${source}`}
            >
              E-mailadres
            </label>

            <input
              id={`email-${source}`}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="naam@email.nl"
              value={formData.email}
              aria-invalid={
                Boolean(errors.email)
              }
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
              className={[
                "form-control",
                errors.email
                  ? "form-control--error"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            {errors.email && (
              <p
                className="quick-lead-form__error"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="quick-lead-form__field">
            <label
              className="quick-lead-form__label"
              htmlFor={`note-${source}`}
            >
              Korte toelichting
              <span className="quick-lead-form__optional">
                Optioneel
              </span>
            </label>

            <textarea
              id={`note-${source}`}
              rows={4}
              maxLength={1500}
              placeholder="Bijvoorbeeld de staat van de woning, uw planning of andere bijzonderheden."
              value={formData.note}
              aria-invalid={
                Boolean(errors.note)
              }
              onChange={(event) =>
                updateField(
                  "note",
                  event.target.value
                )
              }
              className={[
                "form-control",
                "quick-lead-form__textarea",
                errors.note
                  ? "form-control--error"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            {errors.note && (
              <p
                className="quick-lead-form__error"
                role="alert"
              >
                {errors.note}
              </p>
            )}
          </div>

          {submitError && (
            <div
              className="quick-lead-form__submit-error"
              role="alert"
              aria-live="assertive"
            >
              {submitError}
            </div>
          )}

          <div className="quick-lead-form__actions">
            <button
              type="button"
              className="button button--secondary quick-lead-form__back"
              disabled={isSubmitting}
              onClick={() => {
                setSubmitError(null);
                setStep(1);
              }}
            >
              <ChevronLeft
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>Terug</span>
            </button>

            <button
              type="submit"
              className="button button--primary quick-lead-form__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className="quick-lead-form__spinner"
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />

                  <span>
                    Versturen...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Woning aanmelden
                  </span>

                  <ChevronRight
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>

          <div className="quick-lead-form__security">
            <LockKeyhole
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>
              Uw gegevens worden alleen
              gebruikt voor uw
              woningaanmelding.
            </span>
          </div>
        </div>
      )}
    </form>
  );
}
