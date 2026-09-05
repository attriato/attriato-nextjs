import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="theme-color" content="#0d2b5e" />
        <meta name="author" content="Attriato" />
        <meta
          name="keywords"
          content="GA4 setup, GTM implementation, Google Analytics consulting, conversion tracking, analytics reporting, marketing data, attribution strategy"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Attriato" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.attriato.com/images/og-default.jpg" />
        <meta property="og:image:alt" content="Attriato analytics consulting and GA4 setup" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.attriato.com/images/og-default.jpg" />
        <meta name="twitter:site" content="@attriato" />
        <link rel="icon" type="image/png" href="/images/a-logo.png" />
        <link rel="shortcut icon" href="/images/a-logo.png" />
        <link rel="apple-touch-icon" href="/images/a-logo.png" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="https://www.attriato.com/sitemap.xml" />
        <link rel="robots" href="https://www.attriato.com/robots.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Attriato",
              url: "https://www.attriato.com/",
              logo: "https://www.attriato.com/images/logo.png",
              description:
                "Attriato helps businesses improve GA4 implementation, Google Tag Manager tracking, conversion measurement, and analytics reporting.",
              email: "attriato@gmail.com",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "attriato@gmail.com",
                availableLanguage: ["en"],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Attriato",
              url: "https://www.attriato.com/",
              description:
                "Data-driven GA4 and GTM implementation, conversion tracking, and reporting help for growing businesses.",
            }),
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });`,
          }}
        />
        <script async src="https://kuitcqem.attriato.com/data/gtm.js?id=GTM-K7Z8RS6G" />
        {/* End Google Tag Manager */}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://kuitcqem.attriato.com/data/ns.html?id=GTM-K7Z8RS6G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
