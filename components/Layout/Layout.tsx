// @ts-nocheck
// import Sticky from 'react-stickynode';
// import { DrawerProvider } from 'common/src/contexts/DrawerContext';
// import Navbar from 'common/src/containers/Hosting/Navbar';
// import Footer from 'common/src/components/Footer/index';
import { Button, IconArrowUp } from "@vinuni/ui";
import { ResetCSS } from "assets/css/style";
import Navbar from "components/Navbar";
// import Navbar from '../../../common/src/containers/Hosting/Navbar'
import Footer from "components/Footer/index";
import Head from "next/head";
// import Footer from 'common/src/containers/Hosting/Footer';
import { ParallaxProvider } from "react-scroll-parallax";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { hostingTheme } from "./hosting";
import { ContentWrapper, GlobalStyle } from "./hosting.style";

export default function Layout({ children, home }) {
  const scrollToTop = () => {
    if (window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/assets/image/logo_vinuni.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/assets/image/logo_vinuni.png"
        />
        <link rel="apple-touch-icon" href="/assets/image/logo.png" />
        <meta name="theme-color" content="#134D8B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* navbar */}

      <ThemeProvider theme={hostingTheme}>
        <ParallaxProvider>
          <ResetCSS />
          <GlobalStyle />

          <ContentWrapper>
            <Navbar />

            {children}
            <Footer />
            <div
              style={{
                position: "fixed",
                right: 20,
                bottom: 24,
                zIndex: 99999,
              }}
            >
              <Button
                size="icon"
                onClick={scrollToTop}
                style={{ color: "#ffffff" }}
              >
                <IconArrowUp />
              </Button>
            </div>
          </ContentWrapper>
        </ParallaxProvider>
      </ThemeProvider>
    </div>
  );
}
