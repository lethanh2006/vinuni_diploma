// @ts-nocheck
import "data/axios-compat";
import React from "react";
import { useRouter } from "next/router";
import { Modal } from "@redq/reuse-modal";
import "@redq/reuse-modal/es/index.css";
import "antd/dist/antd.css";
import "@vinuni/ui/styles.css";
import { Toaster, TooltipProvider, UiProvider } from "@vinuni/ui";
import Layout from "components/Layout/Layout";
import { DefaultSeo } from "next-seo";
import { LanguageProvider } from "components/Utils/useTranslation";

const productionDomain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim();
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (productionDomain
    ? `https://${productionDomain}`
    : "https://vinuni-diploma.vercel.app")
).replace(/\/+$/, "");
const previewImageUrl = `${siteUrl}/assets/image/metadata.jpg`;

export default function App({ Component, pageProps }) {
  const { asPath } = useRouter();
  const pagePath = asPath.split(/[?#]/)[0];
  // Dynamic pages can be prerendered before their route parameters are available.
  const pageUrl = pagePath.includes("[") ? undefined : `${siteUrl}${pagePath}`;

  return (
    <LanguageProvider>
      <UiProvider>
        <TooltipProvider>
          <Layout>
            <Modal />
            <DefaultSeo
              title="VinUni Cổng tra cứu văn bằng"
              description="Cổng tra cứu và xác thực thông tin văn bằng VinUni"
              openGraph={{
                url: pageUrl,
                type: "website",
                locale: "vi_VN",
                site_name: "VinUni Cổng tra cứu văn bằng",
                images: [
                  {
                    url: previewImageUrl,
                    type: "image/jpeg",
                    width: 2401,
                    height: 2400,
                    alt: "VinUniversity",
                  },
                ],
              }}
              twitter={{
                cardType: "summary_large_image",
              }}
            />
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </TooltipProvider>
      </UiProvider>
    </LanguageProvider>
  );
}
