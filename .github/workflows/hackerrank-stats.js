const { chromium } = require("playwright");
const fs = require("fs");

const USERNAME = "kaartikshukla77";
const URL = `https://www.hackerrank.com/profile/${USERNAME}`;

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1200
    }
  });

  console.log(`Opening ${URL}`);

  await page.goto(URL, {
    waitUntil: "networkidle",
    timeout: 120000
  });

  await page.waitForTimeout(5000);

  const bodyText = await page.locator("body").innerText();

  console.log(bodyText);

  const badgesMatch = bodyText.match(/Badges\s*(\d+)/i);
  const certificationsMatch =
    bodyText.match(/Certifications\s*(\d+)/i);

  const badges = badgesMatch ? badgesMatch[1] : "—";

  const certifications = certificationsMatch
    ? certificationsMatch[1]
    : "—";

  const escapeXml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const svg = `
<svg width="850" height="300"
     viewBox="0 0 850 300"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="bg"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1">
      <stop offset="0%" stop-color="#0d1117"/>
      <stop offset="100%" stop-color="#161b22"/>
    </linearGradient>
  </defs>

  <rect width="850"
        height="300"
        rx="20"
        fill="url(#bg)"/>

  <text x="425"
        y="55"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="28"
        font-weight="bold"
        fill="#ffffff">
    HackerRank Statistics
  </text>

  <text x="425"
        y="87"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="16"
        fill="#8b949e">
    @${escapeXml(@kaartikshukla77)}
  </text>

  <rect x="70"
        y="125"
        width="330"
        height="105"
        rx="15"
        fill="#21262d"/>

  <text x="235"
        y="160"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="18"
        fill="#8b949e">
    Badges
  </text>

  <text x="235"
        y="205"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="34"
        font-weight="bold"
        fill="#00ea64">
    ${escapeXml(badges)}
  </text>

  <rect x="450"
        y="125"
        width="330"
        height="105"
        rx="15"
        fill="#21262d"/>

  <text x="615"
        y="160"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="18"
        fill="#8b949e">
    Certifications
  </text>

  <text x="615"
        y="205"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="34"
        font-weight="bold"
        fill="#00ea64">
    ${escapeXml(certifications)}
  </text>

  <text x="425"
        y="270"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="13"
        fill="#6e7681">
    Automatically updated by GitHub Actions
  </text>

</svg>
`;

  fs.mkdirSync("assets", {
    recursive: true
  });

  fs.writeFileSync(
    "assets/hackerrank-stats.svg",
    svg.trim()
  );

  await browser.close();

  console.log(
    "HackerRank stats SVG generated successfully."
  );
})();
