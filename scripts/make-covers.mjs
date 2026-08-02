import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const svgBuffer = readFileSync(join(process.cwd(), "public/bliscy-logo.svg"));
const outDir = join(process.env.HOME || ".", "Desktop/bliscy-logo-pack/covers");
mkdirSync(outDir, { recursive: true });

// Kolory marki
const CREAM = "#f5efe4";
const CREAM_LIGHT = "#faf6ee";
const TERRACOTTA = "#c8622f";
const OCHRE = "#e8a15b";
const LEAF = "#4b6b3a";
const DARK_BROWN = "#2b2417";
const WARM_100 = "#ffecd6";

// Helper: generuje SVG z powtarzającym się pattern logo
function makePatternSvg(width, height, opts = {}) {
  const {
    bg = CREAM,
    logoOpacity = 0.06,
    logoSize = 100,
    spacingX = 180,
    spacingY = 180,
    tiltDeg = 0,
    hero = null,
  } = opts;

  const cols = Math.ceil(width / spacingX) + 2;
  const rows = Math.ceil(height / spacingY) + 2;

  const logos = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offsetX = (r % 2) * (spacingX / 2);
      const x = c * spacingX + offsetX - spacingX / 2;
      const y = r * spacingY - spacingY / 2;
      logos.push(
        `<g transform="translate(${x} ${y}) rotate(${tiltDeg} ${logoSize / 2} ${logoSize / 2}) scale(${logoSize / 120})" opacity="${logoOpacity}">
          <path d="M8 108 C 10 82, 22 72, 40 74 L 52 74 L 52 108 Z" fill="${TERRACOTTA}"/>
          <circle cx="38" cy="52" r="20" fill="${OCHRE}"/>
          <path d="M20 48 C 22 32, 34 28, 46 30 C 50 31, 55 34, 56 42 C 50 38, 42 37, 34 40 C 28 42, 24 45, 20 48 Z" fill="${CREAM}"/>
          <path d="M112 108 C 110 82, 98 72, 80 74 L 68 74 L 68 108 Z" fill="${LEAF}"/>
          <circle cx="82" cy="52" r="20" fill="${OCHRE}"/>
          <path d="M64 46 C 66 30, 78 26, 92 30 C 100 32, 104 40, 102 50 C 96 42, 86 40, 78 44 C 72 46, 68 46, 64 46 Z" fill="${DARK_BROWN}"/>
          <path d="M60 60 C 55 55, 50 58, 52 64 C 54 70, 60 74, 60 78 C 60 74, 66 70, 68 64 C 70 58, 65 55, 60 60 Z" fill="${TERRACOTTA}"/>
        </g>`
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  ${logos.join("\n")}
  ${hero || ""}
</svg>`;
}

// Helper: hero z dużym logo + tytułem
function heroBlock(width, height, opts = {}) {
  const {
    title = "bliscy",
    subtitle = "",
    titleColor = DARK_BROWN,
    subtitleColor = "#55432d",
    logoSize = 200,
    titleSize = 120,
    subtitleSize = 34,
    align = "center",
  } = opts;

  const cx = width / 2;
  const cy = height / 2;
  const logoX = cx - logoSize / 2;
  const logoY = cy - logoSize / 2 - 60;

  return `
    <g>
      <g transform="translate(${logoX} ${logoY}) scale(${logoSize / 120})">
        <path d="M8 108 C 10 82, 22 72, 40 74 L 52 74 L 52 108 Z" fill="${TERRACOTTA}"/>
        <circle cx="38" cy="52" r="20" fill="${OCHRE}"/>
        <path d="M20 48 C 22 32, 34 28, 46 30 C 50 31, 55 34, 56 42 C 50 38, 42 37, 34 40 C 28 42, 24 45, 20 48 Z" fill="${CREAM}"/>
        <path d="M112 108 C 110 82, 98 72, 80 74 L 68 74 L 68 108 Z" fill="${LEAF}"/>
        <circle cx="82" cy="52" r="20" fill="${OCHRE}"/>
        <path d="M64 46 C 66 30, 78 26, 92 30 C 100 32, 104 40, 102 50 C 96 42, 86 40, 78 44 C 72 46, 68 46, 64 46 Z" fill="${DARK_BROWN}"/>
        <path d="M60 60 C 55 55, 50 58, 52 64 C 54 70, 60 74, 60 78 C 60 74, 66 70, 68 64 C 70 58, 65 55, 60 60 Z" fill="${TERRACOTTA}"/>
      </g>
      <text x="${cx}" y="${logoY + logoSize + titleSize}" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${titleSize}" fill="${titleColor}" text-anchor="middle" letter-spacing="-4">${title}</text>
      ${
        subtitle
          ? `<text x="${cx}" y="${logoY + logoSize + titleSize + subtitleSize + 30}" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="${subtitleSize}" fill="${subtitleColor}" text-anchor="middle">${subtitle}</text>`
          : ""
      }
    </g>`;
}

async function renderSvg(svgText, outName) {
  const buf = Buffer.from(svgText, "utf8");
  await sharp(buf).png().toFile(join(outDir, outName));
  console.log("OK", outName);
}

(async () => {
  // === WARIANT 1: FB cover (820x312) - subtelny pattern kremowy + tytuł ===
  const fbCover = makePatternSvg(1640, 624, {
    bg: CREAM,
    logoOpacity: 0.08,
    logoSize: 110,
    spacingX: 190,
    spacingY: 190,
    tiltDeg: -8,
    hero: heroBlock(1640, 624, {
      title: "bliscy",
      subtitle: "Bliski obok Twoich rodziców, gdy Ciebie akurat nie ma.",
      titleSize: 180,
      subtitleSize: 42,
      logoSize: 220,
    }),
  });
  await renderSvg(fbCover, "fb-cover-hero.png");

  // === WARIANT 2: OG cover 1200x630 - kremowe tło z patternem + hero ===
  const ogCover = makePatternSvg(1200, 630, {
    bg: CREAM,
    logoOpacity: 0.07,
    logoSize: 100,
    spacingX: 170,
    spacingY: 170,
    tiltDeg: -6,
    hero: heroBlock(1200, 630, {
      title: "bliscy",
      subtitle: "Zaczynamy od rozmowy.",
      titleSize: 150,
      subtitleSize: 40,
      logoSize: 180,
    }),
  });
  await renderSvg(ogCover, "og-cover-hero-1200x630.png");

  // === WARIANT 3: Wersja ciemna (na ciemnym tle marki) ===
  const darkCover = makePatternSvg(1200, 630, {
    bg: DARK_BROWN,
    logoOpacity: 0.12,
    logoSize: 100,
    spacingX: 170,
    spacingY: 170,
    tiltDeg: -6,
    hero: heroBlock(1200, 630, {
      title: "bliscy",
      subtitle: "Zaczynamy od rozmowy.",
      titleColor: CREAM,
      subtitleColor: OCHRE,
      titleSize: 150,
      subtitleSize: 40,
      logoSize: 180,
    }),
  });
  await renderSvg(darkCover, "og-cover-dark-1200x630.png");

  // === WARIANT 4: Instagram post 1080x1080 - kwadratowy ===
  const igPost = makePatternSvg(1080, 1080, {
    bg: CREAM,
    logoOpacity: 0.09,
    logoSize: 100,
    spacingX: 170,
    spacingY: 170,
    tiltDeg: -10,
    hero: heroBlock(1080, 1080, {
      title: "bliscy",
      subtitle: "Bliski obok Twoich rodziców.",
      titleSize: 160,
      subtitleSize: 38,
      logoSize: 200,
    }),
  });
  await renderSvg(igPost, "ig-post-1080.png");

  // === WARIANT 5: Instagram Story 1080x1920 - pionowy ===
  const igStory = makePatternSvg(1080, 1920, {
    bg: CREAM,
    logoOpacity: 0.09,
    logoSize: 100,
    spacingX: 170,
    spacingY: 170,
    tiltDeg: -10,
    hero: heroBlock(1080, 1920, {
      title: "bliscy",
      subtitle: "Zaczynamy od rozmowy.",
      titleSize: 180,
      subtitleSize: 42,
      logoSize: 240,
    }),
  });
  await renderSvg(igStory, "ig-story-1080x1920.png");

  // === WARIANT 6: LinkedIn cover 1584x396 - poziomy szeroki ===
  const linkedInCover = makePatternSvg(1584, 396, {
    bg: CREAM,
    logoOpacity: 0.08,
    logoSize: 90,
    spacingX: 160,
    spacingY: 160,
    tiltDeg: -6,
    hero: heroBlock(1584, 396, {
      title: "bliscy",
      subtitle: "Ktoś obok Twoich rodziców, gdy Ciebie akurat nie ma.",
      titleSize: 100,
      subtitleSize: 32,
      logoSize: 130,
    }),
  });
  await renderSvg(linkedInCover, "linkedin-cover-1584x396.png");

  // === WARIANT 7: Sam pattern (bez tytułu) - do własnych kompozycji ===
  const patternOnly = makePatternSvg(1920, 1080, {
    bg: CREAM,
    logoOpacity: 0.1,
    logoSize: 120,
    spacingX: 200,
    spacingY: 200,
    tiltDeg: -8,
  });
  await renderSvg(patternOnly, "pattern-1920x1080.png");

  console.log("\nCovers ready in:", outDir);
})();
