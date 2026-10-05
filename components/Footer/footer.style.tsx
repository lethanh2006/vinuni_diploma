import styled from "styled-components";

const FooterWrapper = styled.footer`
  --contact-width: clamp(260px, calc(20vw - 24px), 360px);
  --footer-background: #f2f2f8;
  --footer-text: #000;
  --footer-link: #134d8b;
  --footer-border: rgba(0, 0, 0, 0.1);
  --footer-button-background: #fff;
  --footer-button-hover: #e4ebf4;
  width: 100%;
  background: var(--footer-background);
  color: var(--footer-text);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 24px;

  [data-vinuni-theme="dark"] & {
    --footer-background: #000;
    --footer-text: #fff;
    --footer-link: #3b81da;
    --footer-border: rgba(255, 255, 255, 0.16);
    --footer-button-background: #232529;
    --footer-button-hover: #30343b;
  }

  [data-vinuni-theme="dark"] & .site-footer-brand img {
    filter: brightness(0) invert(1);
  }

  body.vbcc-lookup-active & {
    width: calc(100% - 52px);
    margin-left: 52px;
  }

  &,
  * {
    box-sizing: border-box;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    color: var(--footer-link);
    text-decoration: none;
    transition: background-color 0.2s ease;
  }
  a:hover {
    text-decoration: underline;
  }
  a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  .site-footer-brand-row,
  .site-footer-content-row {
    display: grid;
    grid-template-columns: var(--contact-width) minmax(0, 1fr);
    padding: 0 24px;
  }
  .site-footer-brand-row {
    min-height: 136px;
    border-top: 1px solid var(--footer-border);
    border-bottom: 1px solid var(--footer-border);
  }
  .site-footer-brand,
  .site-footer-contact {
    border-right: 1px solid var(--footer-border);
  }
  .site-footer-brand {
    display: flex;
    align-items: center;
    padding: 23px 24px 23px 0;
  }
  .site-footer-brand img {
    display: block;
    width: 144px;
    height: 88px;
    object-fit: contain;
  }
  .site-footer-accreditations {
    display: flex;
    align-items: center;
    gap: 48px;
    padding: 24px;
  }
  .site-footer-accreditation-mark {
    position: relative;
    flex: none;
    width: 80px;
    height: 80px;
    overflow: hidden;
  }
  .site-footer-accreditations img {
    position: absolute;
    top: 0;
    display: block;
    width: 208px;
    height: 80px;
    max-width: none;
    object-fit: contain;
  }
  .site-footer-accreditation-image--qs {
    left: 0;
  }
  .site-footer-accreditation-image--fibaa {
    right: 0;
  }
  .site-footer-content-row {
    grid-template-columns:
      var(--contact-width) repeat(3, minmax(0, 1fr))
      minmax(268px, 1fr);
    grid-template-areas:
      "contact explore information resources connect"
      "contact explore information resources actions";
    grid-template-rows: 112px minmax(116px, auto);
    column-gap: 24px;
    min-height: 228px;
  }
  .site-footer-contact {
    grid-area: contact;
    padding: 24px 24px 24px 0;
    min-width: 0;
  }
  h2 {
    margin: 0;
    color: var(--footer-text);
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
  }
  .site-footer-contact-details {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 14px 0 0;
    font-style: normal;
  }
  .site-footer-contact-details p {
    margin: 0;
    overflow-wrap: anywhere;
  }
  .site-footer-contact-details strong {
    font-weight: 600;
  }
  .site-footer-navigation {
    display: contents;
  }
  .site-footer-group,
  .site-footer-connect {
    min-width: 0;
    padding: 24px 0;
  }
  .site-footer-group--explore {
    grid-area: explore;
  }
  .site-footer-group--information {
    grid-area: information;
  }
  .site-footer-group--resources {
    grid-area: resources;
  }
  .site-footer-connect {
    grid-area: connect;
    padding-bottom: 0;
  }
  .site-footer-link-list {
    margin-top: 8px;
  }
  .site-footer-link-list a {
    display: flex;
    align-items: center;
    min-height: 36px;
    padding: 6px 0;
  }
  .site-footer-socials {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }
  .site-footer-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--footer-button-background);
  }
  .site-footer-socials svg {
    display: block;
    flex-shrink: 0;
  }
  .site-footer-actions {
    grid-area: actions;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 24px 0;
  }
  .site-footer-actions a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    height: 44px;
    padding: 0 16px;
    border-radius: 24px;
    background: var(--footer-button-background);
    font-weight: 500;
  }
  .site-footer-socials a:hover,
  .site-footer-actions a:hover {
    background: var(--footer-button-hover);
    text-decoration: none;
  }
  .site-footer-legal-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px 24px;
    min-height: 64px;
    padding: 18px 24px;
    background: #134d8b;
    color: #fff;
    font-size: 18px;
    line-height: 28px;
  }
  .site-footer-legal-bar p {
    margin: 0;
  }
  .site-footer-legal-links {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .site-footer-legal-links li {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .site-footer-legal-links a,
  .site-footer-legal-text {
    color: #fff;
  }

  @media (min-width: 768px) {
    .site-footer-legal-links {
      /* Leave room for the layout's fixed scroll-to-top button. */
      margin-right: 64px;
    }
  }

  @media (max-width: 1199px) {
    .site-footer-content-row {
      grid-template-columns: var(--contact-width) repeat(2, minmax(0, 1fr));
      grid-template-areas:
        "contact explore information"
        "contact resources connect"
        "contact resources actions";
      grid-template-rows: auto auto auto;
    }
  }
  @media (min-width: 768px) and (max-width: 959px) {
    .site-footer-content-row {
      grid-template-areas:
        "contact explore information"
        "contact resources resources"
        "contact connect connect"
        "contact actions actions";
      grid-template-rows: auto auto auto auto;
    }
  }
  @media (max-width: 767px) {
    body.vbcc-lookup-active & {
      width: 100%;
      margin-left: 0;
    }

    .site-footer-brand-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      min-height: 202px;
      padding: 24px 16px;
    }
    .site-footer-brand {
      justify-content: center;
      width: 100%;
      border-right: 0;
      padding: 0;
    }
    .site-footer-brand img {
      width: 118px;
      height: 72px;
    }
    .site-footer-accreditations {
      justify-content: center;
      gap: 24px;
      padding: 0;
    }
    .site-footer-accreditation-mark {
      width: 56px;
      height: 56px;
    }
    .site-footer-accreditations img {
      width: 145.6px;
      height: 56px;
    }
    .site-footer-content-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        "explore information"
        "resources actions"
        "contact contact"
        "connect connect";
      grid-template-rows: auto auto auto auto;
      gap: 24px;
      min-height: 0;
      padding: 16px;
    }
    .site-footer-group,
    .site-footer-connect {
      padding: 0;
    }
    .site-footer-link-list {
      margin-top: 0;
      padding: 8px 0;
    }
    .site-footer-contact {
      border-right: 0;
      padding: 0;
    }
    .site-footer-contact-details {
      gap: 12px;
      margin-top: 12px;
    }
    .site-footer-socials {
      gap: 16px;
    }
    .site-footer-actions {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      padding: 0;
    }
    .site-footer-actions li {
      width: 128px;
      max-width: 100%;
    }
    .site-footer-actions a {
      width: 100%;
      min-width: 0;
      height: 36px;
      font-size: 14px;
      line-height: 20px;
    }
    .site-footer-legal-bar {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 16px;
      min-height: 95px;
      padding: 16px;
      font-size: 16px;
      line-height: 24px;
    }
    .site-footer-legal-bar > nav {
      max-width: 100%;
    }
    .site-footer-legal-links,
    .site-footer-legal-links li {
      gap: 16px;
    }
    .site-footer-legal-links li {
      white-space: nowrap;
    }
  }
  @media (max-width: 419px) {
    .site-footer-legal-bar > nav {
      /* Keep wrapped legal links clear of the fixed scroll-to-top button. */
      padding-right: 64px;
    }
  }
`;

export default FooterWrapper;
