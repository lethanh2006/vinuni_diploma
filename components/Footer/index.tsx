import React from "react";
import { useTranslation } from "components/Utils/useTranslation";
import FooterWrapper from "./footer.style";

type FooterLink = {
  labelKey: string;
  url?: string;
  viUrl?: string;
};

const navigationGroups: {
  area: string;
  titleKey: string;
  links: FooterLink[];
}[] = [
  {
    area: "explore",
    titleKey: "footer.explore",
    links: [
      {
        labelKey: "footer.education",
        url: "https://vinuni.edu.vn/academics/home/",
        viUrl: "https://vinuni.edu.vn/vi/academics/dao-tao/",
      },
      {
        labelKey: "footer.research_innovation",
        url: "https://research.vinuni.edu.vn/",
      },
      {
        labelKey: "footer.admission",
        url: "https://admissions.vinuni.edu.vn/",
      },
      {
        labelKey: "footer.career",
        url: "https://vinuni.edu.vn/careers/",
        viUrl: "https://vinuni.edu.vn/vi/new-careers/",
      },
    ],
  },
  {
    area: "information",
    titleKey: "footer.information_for",
    links: [
      {
        labelKey: "footer.students",
        url: "https://vinuni.edu.vn/student-gateway/",
        viUrl: "https://vinuni.edu.vn/vi/cong-thong-tin-sinh-vien-vi/",
      },
      {
        labelKey: "footer.international_students",
        url: "https://admissions.vinuni.edu.vn/undergraduate/apply-to-vinuni/international-students/",
      },
      {
        labelKey: "footer.alumni",
        url: "https://vinuni.edu.vn/vi/aid/alumni-engagement/",
      },
      {
        labelKey: "footer.faculty_staff",
        url: "https://vinuniversity.sharepoint.com/sites/HomeSite",
      },
    ],
  },
  {
    area: "resources",
    titleKey: "footer.resources",
    links: [
      {
        labelKey: "footer.about_vinuni",
        url: "https://vinuni.edu.vn/about-vinuniversity/",
        viUrl: "https://vinuni.edu.vn/vi/ve-vinuni-2/",
      },
      { labelKey: "footer.library", url: "https://library.vinuni.edu.vn/" },
      {
        labelKey: "footer.news_events",
        url: "https://vinuni.edu.vn/news-events/",
        viUrl: "https://vinuni.edu.vn/vi/tin-tuc-su-kien/",
      },
    ],
  },
];

const socialLinks = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@vinuniversity.official",
    path: "M16.6 2H13v12.5a3.2 3.2 0 1 1-2.8-3.2V7.7a6.9 6.9 0 1 0 6.1 6.8V8.1a9.3 9.3 0 0 0 5.2 1.6V6.1A5.3 5.3 0 0 1 16.6 2Z",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/vinuniversity/",
    path: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65684 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.93 5.90625 14.2148 5.90625C15.3086 5.90625 16.4766 6.10156 16.4766 6.10156V8.5625H15.2148C13.9716 8.5625 13.5859 9.33398 13.5859 10.125V12H16.3594L15.9156 14.8906H13.5859V21.8785C18.3432 21.1283 22 16.9913 22 12Z",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@VinUniversity",
    path: "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.76C18.27 5 12 5 12 5s-6.27 0-7.82.43a2.5 2.5 0 0 0-1.76 1.76C2 8.74 2 12 2 12s0 3.26.42 4.81a2.5 2.5 0 0 0 1.76 1.76C5.73 19 12 19 12 19s6.27 0 7.82-.43a2.5 2.5 0 0 0 1.76-1.76C22 15.26 22 12 22 12s0-3.26-.42-4.81ZM10 15V9l5.2 3L10 15Z",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/school/vinuniversity-vietnam/",
    path: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.4h2.67V18ZM7 8.23a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.33 18h-2.66v-4.18c0-1 0-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.21V18H10V9.4h2.57v1.17h.04a2.81 2.81 0 0 1 2.53-1.39c2.7 0 3.2 1.78 3.2 4.09V18Z",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/vinuniversity.official/",
    path: "M7.5 3A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3h-9Zm0 1.8h9a2.7 2.7 0 0 1 2.7 2.7v9a2.7 2.7 0 0 1-2.7 2.7h-9a2.7 2.7 0 0 1-2.7-2.7v-9a2.7 2.7 0 0 1 2.7-2.7ZM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.8a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Zm5.85-2.25a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
];

const actionLinks: FooterLink[] = [
  { labelKey: "footer.apply", url: "https://vinuni.my.site.com/s/login/" },
  {
    labelKey: "footer.visit",
    url: "https://vinuni.edu.vn/aboutcampus/",
    viUrl: "https://vinuni.edu.vn/vi/visit-2/",
  },
  { labelKey: "footer.give", url: "https://giving.vinuni.edu.vn/" },
];

const legalLinks: FooterLink[] = [
  {
    labelKey: "footer.sitemap",
    url: "https://vinuni.edu.vn/sitemap_index.xml",
  },
  {
    labelKey: "footer.privacy_policy",
    url: "https://vinuni.edu.vn/privacy-statement/",
  },
  // Keep the label visible until an official terms destination is available.
  { labelKey: "footer.terms_of_use" },
];

const GlobalFooter = () => {
  const { t: translate, locale } = useTranslation();
  const t = (key: string) => translate(key, key);
  const homeUrl =
    locale === "en-US" ? "https://vinuni.edu.vn/" : "https://vinuni.edu.vn/vi/";
  const getLinkUrl = (link: FooterLink) =>
    locale === "vi-VN" && link.viUrl ? link.viUrl : link.url;

  return (
    <FooterWrapper className="site-footer">
      <div className="site-footer-brand-row">
        <div className="site-footer-brand">
          <a
            href={homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VinUniversity"
          >
            <img
              src="/assets/image/logofooter1.png"
              alt="VinUniversity"
              width={144}
              height={88}
            />
          </a>
        </div>
        <div className="site-footer-accreditations">
          <span className="site-footer-accreditation-mark">
            <img
              className="site-footer-accreditation-image--qs"
              src="/assets/image/logofooter2.png"
              alt="QS Stars: rated excellent with five stars"
              width={208}
              height={80}
            />
          </span>
          <span className="site-footer-accreditation-mark">
            <img
              className="site-footer-accreditation-image--fibaa"
              src="/assets/image/logofooter2.png"
              alt="FIBAA accreditation"
              width={208}
              height={80}
            />
          </span>
        </div>
      </div>

      <div className="site-footer-content-row">
        <nav
          className="site-footer-navigation"
          aria-label={t("footer.navigation_label")}
        >
          {navigationGroups.map((group) => (
            <div
              className={"site-footer-group site-footer-group--" + group.area}
              key={group.titleKey}
            >
              <h2 className="site-footer-title">{t(group.titleKey)}</h2>
              <ul className="site-footer-link-list">
                {group.links.map((link) => (
                  <li key={link.labelKey}>
                    <a
                      href={getLinkUrl(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <ul className="site-footer-actions">
            {actionLinks.map((link) => (
              <li key={link.labelKey}>
                <a
                  href={getLinkUrl(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section
          className="site-footer-contact"
          aria-labelledby="footer-contact-title"
        >
          <h2 className="site-footer-title" id="footer-contact-title">
            {t("footer.contact")}
          </h2>
          <address className="site-footer-contact-details">
            <p>
              <strong>{t("footer.address_label")}:</strong>{" "}
              {t("footer.dia_chi")}
            </p>
            <p>
              <strong>{t("footer.email_label")}:</strong>{" "}
              <a href="mailto:info@vinuni.edu.vn">info@vinuni.edu.vn</a>
            </p>
            <p>
              <strong>{t("footer.phone_label")}:</strong>{" "}
              <a href="tel:+842471089779">(+84) 2471089779</a>
            </p>
          </address>
        </section>

        <div className="site-footer-connect">
          <h2 className="site-footer-title">{t("footer.connect")}</h2>
          <ul
            className="site-footer-socials"
            aria-label={t("footer.social_label")}
          >
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="site-footer-social-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={social.path} fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer-legal-bar">
        <p>
          © {new Date().getFullYear()} VinUniversity.{" "}
          {t("footer.all_rights_reserved")}
        </p>
        <nav aria-label={t("footer.legal_label")}>
          <ul className="site-footer-legal-links">
            {legalLinks.map((link, index) => (
              <li key={link.labelKey}>
                {index > 0 && <span aria-hidden="true">·</span>}
                {link.url ? (
                  <a
                    href={getLinkUrl(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(link.labelKey)}
                  </a>
                ) : (
                  <span className="site-footer-legal-text">
                    {t(link.labelKey)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </FooterWrapper>
  );
};

export default GlobalFooter;
