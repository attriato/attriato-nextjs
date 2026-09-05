export const config = {
  api: {
    bodyParser: false,
  },
};

const TARGET_ORIGIN = "https://kuitcqem.attriato.com";

const STRIPPED_RESPONSE_HEADERS = new Set([
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
]);

export default async function handler(req, res) {
  const { path } = req.query;
  const targetPath = Array.isArray(path) ? path.join("/") : path || "";
  const queryIndex = req.url.indexOf("?");
  const search = queryIndex !== -1 ? req.url.slice(queryIndex) : "";
  const targetUrl = `${TARGET_ORIGIN}/${targetPath}${search}`;

  const forwardedFor = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  const clientIp = forwardedFor.split(",")[0].trim() || "unknown";

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  headers["x-forwarded-for"] = clientIp;
  headers["x-from-cdn"] = "cf-stape";
  headers["cf-connecting-ip"] = clientIp;

  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: hasBody ? req : undefined,
    duplex: hasBody ? "half" : undefined,
  });

  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (!STRIPPED_RESPONSE_HEADERS.has(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  res.send(buffer);
}
