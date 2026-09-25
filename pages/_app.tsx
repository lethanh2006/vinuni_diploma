// @ts-nocheck
import "data/axios-compat";
import React, { Fragment } from "react";
import { Modal } from "@redq/reuse-modal";
import "@redq/reuse-modal/es/index.css";
import "antd/dist/antd.css";
import "@vinuni/ui/styles.css";
import { Toaster, TooltipProvider, UiProvider } from "@vinuni/ui";
import Layout from "components/Layout/Layout";
import { DefaultSeo } from "next-seo";
import { LanguageProvider } from "components/Utils/useTranslation";

export default ({ Component, pageProps }) => (
  <LanguageProvider>
    <UiProvider>
      <TooltipProvider>
        <Layout>
          <Modal />
          <DefaultSeo
            title="VinUni Cổng tra cứu văn bằng"
            description="Cổng tra cứu và xác thực thông tin văn bằng VinUni"
            openGraph={{
              type: "website",
              locale: "vi_VN",
              site_name: "VinUni Cổng tra cứu văn bằng",
              images: [
                {
                  url: "/assets/image/metadata.png",
                  width: 2401,
                  height: 2400,
                  alt: "VinUniversity",
                },
              ],
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
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
