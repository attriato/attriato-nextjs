import Head from "next/head";
import { getMetaForPath, getSchemaForPath } from "../utils/pageMeta";

const BASE_URL = "https://www.attriato.com";

export default function Seo({ path }) {
  const meta = getMetaForPath(path);
  const schema = getSchemaForPath(path);
  const canonicalUrl = `${BASE_URL}${path === "/" ? "" : path}`;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
