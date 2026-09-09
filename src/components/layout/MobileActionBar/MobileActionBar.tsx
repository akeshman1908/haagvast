import Link from "next/link";
import { Home, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

import "./MobileActionBar.scss";

export default function MobileActionBar() {
  return (
    <div className="mobile-action-bar" aria-label="Snelle acties">
      <div className="mobile-action-bar__inner">
        {siteConfig.contact.phone && (
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="mobile-action-bar__button mobile-action-bar__button--secondary"
          >
            <Phone size={18} strokeWidth={2} aria-hidden="true" />

            <span>Bel direct</span>
          </a>
        )}

        <Link
          href={siteConfig.cta.primary.href}
          className="mobile-action-bar__button mobile-action-bar__button--primary"
        >
          <Home size={18} strokeWidth={2} aria-hidden="true" />

          <span>
            {siteConfig.contact.phone
              ? "Woning aanmelden"
              : "Mijn woning aanmelden"}
          </span>
        </Link>
      </div>
    </div>
  );
}
