import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
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

function GTMTracker() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (pathname) => {
      const meta = getMetaForPath(pathname);
      const baseUrl = "https://www.attriato.com";
      const pageLocation = `${baseUrl}${pathname === "/" ? "" : pathname}`;

      setTimeout(async () => {
        try {
          const { pushPageView } = await import("../utils/gtmTracking");
          pushPageView(meta.title, pageLocation);
        } catch (error) {
          console.warn("Failed to push page view:", error);
        }
      }, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <InitializeTracking />
      <GTMTracker />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
