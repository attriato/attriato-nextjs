const TARGET_URL = "https://kuitcqem.attriato.com";
module.exports = async (req, res) => {
const forwardedFor = req.headers["x-forwarded-for"] || "";
const clientIp = forwardedFor.split(",")[0].trim() || "unknown";
const newHeaders = {
...req.headers,
"X-Forwarded-For": clientIp,
"X-From-Cdn": "cf-stape",
"Host": "kuitcqem.attriato.com",
"CF-Connecting-Ip": clientIp
};
const response = await fetch(TARGET_URL, {
method: req.method,
headers: newHeaders,
body: req
});
const text = await response.text();
for (const [key, value] of response.headers.entries()) {
res.setHeader(key, value);
}
res.status(response.status).send(text);
};