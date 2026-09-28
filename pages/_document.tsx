// @ts-nocheck
/* eslint-disable react/no-danger */
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    //   const fbCustomerChat = `       <!-- Load Facebook SDK for JavaScript -->
    //   <div id="fb-root"></div>
    //   <script>
    //     window.fbAsyncInit = function() {
    //       FB.init({
    //         xfbml            : true,
    //         version          : 'v7.0'
    //       });
    //     };

    //     (function(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s); js.id = id;
    //     js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    //     fjs.parentNode.insertBefore(js, fjs);
    //   }(document, 'script', 'facebook-jssdk'));</script>

    //   <!-- Your Chat Plugin code -->
    //   <div class="fb-customerchat"
    //     attribution=setup_tool
    //     page_id="115849243473188"
    // logged_in_greeting="Xin chào, bạn muốn chúng tôi tư vấn gì không ?"
    // logged_out_greeting="Xin chào, bạn muốn chúng tôi tư vấn gì không ?">
    //   </div>`;
    const fbCustomerChat = `
<!-- Load Facebook SDK for JavaScript -->
      <div id="fb-root"></div>
      <script>
        window.fbAsyncInit = function() {
          FB.init({
            xfbml            : true,
            version          : 'v9.0'
          });
        };

        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));</script>

      <!-- Your Chat Plugin code -->
      <div class="fb-customerchat"
        attribution="setup_tool"
        page_id="245253749268217"
  logged_in_greeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?"
  logged_out_greeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?">
      </div> 
`;
    return (
      <Html lang="vi">

        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-YJ08BVKT4Q"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ08BVKT4Q');
        `,
            }}
          />
          <link rel="icon" type="image/png" href="/assets/image/logo_vinuni.png" />
          <link rel="shortcut icon" type="image/png" href="/assets/image/logo_vinuni.png" />
          <link rel="apple-touch-icon" href="/assets/image/logo.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />


        </Head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: fbCustomerChat }} />
          <div
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

// <link
//   href="resource-url"
//   rel="directive"
//   as="ressource-type"
//   crossorigin="value"
// />;
