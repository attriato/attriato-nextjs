import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMetaForPath } from "../utils/pageMeta";
import "../styles/globals.css";

function InitializeTracking() {
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;

    // Defer tracking initialization until after first render
    const initTracking = async () => {
      try {
        const { initLinkTracking } = await import("../utils/gtmTracking");
        initLinkTracking();
      } catch (error) {
        console.warn("Failed to initialize link tracking:", error);
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initTracking, { timeout: 2000 });
    } else {
      setTimeout(initTracking, 1000);
    }

    initRef.current = true;
  }, []);

  return null;
}

function ChunkErrorReload() {
  const router = useRouter();

  useEffect(() => {
    // After a new deploy, old tabs reference stale chunk hashes that 404/503
    // on the server. Force a full reload so the browser fetches the current build.
    const handleChunkError = (err) => {
      const message = String(err?.message || err || "");
      if (/loading chunk|failed to fetch|chunkloaderror/i.test(message)) {
        window.location.reload();
      }
    };

    router.events.on("routeChangeError", handleChunkError);
    return () => router.events.off("routeChangeError", handleChunkError);
  }, [router.events]);

  return null;
}

function GTMTracker() {
  const router = useRouter();
  const initialPageViewSent = useRef(false);

  useEffect(() => {
    const sendPageView = (url) => {
      const cleanPath = url ? url.split("?")[0] : router.pathname;
      const meta = getMetaForPath(cleanPath);
      const baseUrl = "https://www.attriato.com";
      const pageLocation = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;

      setTimeout(async () => {
        try {
          const { pushPageView } = await import("../utils/gtmTracking");
          pushPageView(meta.title, pageLocation);
        } catch (error) {
          console.warn("Failed to push page view:", error);
        }
      }, 0);
    };

    // routeChangeComplete only fires on subsequent client-side navigations,
    // so the very first pageview needs to be sent explicitly on mount.
    if (!initialPageViewSent.current) {
      sendPageView(router.asPath);
      initialPageViewSent.current = true;
    }

    router.events.on("routeChangeComplete", sendPageView);
    return () => router.events.off("routeChangeComplete", sendPageView);
  }, [router.events, router.asPath, router.pathname]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        id="gtm-bootstrap"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `!function(){"use strict";var e=window,t=document,r="script",n="dataLayer",o="https://kuitcqem.attriato.com",a="5kuitcqem",i="cgwjea=BAFMJCAkWCBaP0kxJ18yTRtYQ01FTxEFUBIGFFoIAR8fDBAXG0cWBABDAgwEVFoPDBEQ",c=(e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"}),t.createElement(r));c.async=!0,c.src=o+"/"+a+".js?"+i;var s=t.getElementsByTagName(r)[0];s&&s.parentNode&&s.parentNode.insertBefore(c,s)}();`,
        }}
      />
      <InitializeTracking />
      <ChunkErrorReload />
      <GTMTracker />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
