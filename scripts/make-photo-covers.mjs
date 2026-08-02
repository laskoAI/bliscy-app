import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join } from "path";

const PHOTO = join(process.cwd(), "public/foto-w-tlea.png");
const outDir = join(process.env.HOME || ".", "Desktop/bliscy-logo-pack/covers-photo");
mkdirSync(outDir, { recursive: true });

const CREAM = "#f5efe4";
const OCHRE = "#e8a15b";

/**
 * Renderuje tekst przez sharp.text (font-free, pixelowo dokładne rozmiary).
 * Zwraca buffer PNG + width/height.
 */
async function renderText(text, fontSize, color, weight = 700) {
  const buf = await sharp({
    text: {
      text: `<span foreground="${color}" font_weight="${weight}">${text}</span>`,
      font: weight >= 700 ? "sans-serif Bold" : "sans-serif",
      rgba: true,
      wrap: "none",
      height: fontSize,
    },
  })
    .png()
    .toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, width: meta.width, height: meta.height };
}

/**
 * Logo SVG w danym rozmiarze.
 */
async function renderLogo(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
    <path d="M8 108 C 10 82, 22 72, 40 74 L 52 74 L 52 108 Z" fill="#c8622f"/>
    <circle cx="38" cy="52" r="20" fill="#e8a15b"/>
    <path d="M20 48 C 22 32, 34 28, 46 30 C 50 31, 55 34, 56 42 C 50 38, 42 37, 34 40 C 28 42, 24 45, 20 48 Z" fill="#f5efe4"/>
    <path d="M112 108 C 110 82, 98 72, 80 74 L 68 74 L 68 108 Z" fill="#4b6b3a"/>
    <circle cx="82" cy="52" r="20" fill="#e8a15b"/>
    <path d="M64 46 C 66 30, 78 26, 92 30 C 100 32, 104 40, 102 50 C 96 42, 86 40, 78 44 C 72 46, 68 46, 64 46 Z" fill="#2b2417"/>
    <path d="M60 60 C 55 55, 50 58, 52 64 C 54 70, 60 74, 60 78 C 60 74, 66 70, 68 64 C 70 58, 65 55, 60 60 Z" fill="#c8622f"/>
  </svg>`;
  return sharp(Buffer.from(svg, "utf8")).png().toBuffer();
}

/**
 * Owija tekst na wielu liniach po zadaną szerokość (w pikselach).
 */
async function renderMultilineText(text, fontSize, color, maxWidth, weight = 500, lineSpacing = 1.25) {
  const buf = await sharp({
    text: {
      text: `<span foreground="${color}" font_weight="${weight}">${text}</span>`,
      font: "sans-serif",
      rgba: true,
      wrap: "word",
      width: maxWidth,
      spacing: Math.round(fontSize * (lineSpacing - 1)),
      height: fontSize * 6,
    },
  })
    .png()
    .toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, width: meta.width, height: meta.height };
}

/**
 * Przycina zdjęcie do docelowego formatu (cover behavior).
 */
async function makeBackground(width, height, focalY = 0.4) {
  const meta = await sharp(PHOTO).metadata();
  const srcW = meta.width;
  const srcH = meta.height;
  const srcRatio = srcW / srcH;
  const dstRatio = width / height;

  let cropW, cropH;
  if (srcRatio > dstRatio) {
    cropH = srcH;
    cropW = Math.round(cropH * dstRatio);
  } else {
    cropW = srcW;
    cropH = Math.round(cropW / dstRatio);
  }
  const cropX = Math.round((srcW - cropW) * 0.5);
  const cropY = Math.round((srcH - cropH) * focalY);

  return sharp(PHOTO)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .resize(width, height)
    .modulate({ saturation: 1.05 })
    .png()
    .toBuffer();
}

/**
 * Overlay gradient (przezroczysty -> ciemny brąz).
 */
async function makeOverlay(width, height, strength = 0.75) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(43,36,23,0)"/>
        <stop offset="40%" stop-color="rgba(43,36,23,${strength * 0.2})"/>
        <stop offset="100%" stop-color="rgba(43,36,23,${strength})"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
  </svg>`;
  return sharp(Buffer.from(svg, "utf8")).png().toBuffer();
}

/**
 * Główna funkcja - komponuje wszystko.
 */
async function makeCover(width, height, outName, opts = {}) {
  const {
    title = "bliscy",
    subtitle = "",
    titleSize = 140,
    subtitleSize = 40,
    logoSize = 140,
    layout = "left", // "left" | "center"
    padding = 100,
    marginBottom = 100,
    focalY = 0.4,
    overlayStrength = 0.75,
    gapLogo = 40,
    gapSubtitle = 30,
  } = opts;

  const bg = await makeBackground(width, height, focalY);
  const overlay = await makeOverlay(width, height, overlayStrength);

  const composites = [{ input: overlay, top: 0, left: 0 }];

  const logo = await renderLogo(logoSize);
  const titleImg = await renderText(title, titleSize, CREAM, 700);

  // Dostępna szerokość dla subtitle
  const subtitleMaxWidth = width - padding * 2;
  const subtitleImg = subtitle
    ? await renderMultilineText(subtitle, subtitleSize, OCHRE, subtitleMaxWidth, 500)
    : null;

  // Obliczamy pełną wysokość bloku (logo + gap + title + gap + subtitle)
  const totalHeight =
    logoSize +
    gapLogo +
    titleImg.height +
    (subtitleImg ? gapSubtitle + subtitleImg.height : 0);

  // Sprawdź czy się mieści - jeśli nie, zmniejsz marginBottom
  const availableHeight = height - padding * 0.5;
  let actualBottom = marginBottom;
  if (totalHeight + actualBottom > availableHeight) {
    actualBottom = Math.max(20, availableHeight - totalHeight);
  }

  const blockTop = height - actualBottom - totalHeight;

  let x_logo, x_title, x_subtitle;
  if (layout === "center") {
    x_logo = Math.round(width / 2 - logoSize / 2);
    x_title = Math.round(width / 2 - titleImg.width / 2);
    x_subtitle = subtitleImg
      ? Math.round(width / 2 - subtitleImg.width / 2)
      : 0;
  } else {
    x_logo = padding;
    x_title = padding;
    x_subtitle = padding;
  }

  composites.push({ input: logo, top: blockTop, left: x_logo });
  composites.push({
    input: titleImg.buf,
    top: blockTop + logoSize + gapLogo,
    left: x_title,
  });
  if (subtitleImg) {
    composites.push({
      input: subtitleImg.buf,
      top: blockTop + logoSize + gapLogo + titleImg.height + gapSubtitle,
      left: x_subtitle,
    });
  }

  await sharp(bg).composite(composites).png().toFile(join(outDir, outName));
  console.log("OK", outName);
}

(async () => {
  // === FACEBOOK COVER 1640x624 ===
  await makeCover(1640, 624, "fb-cover-photo.png", {
    title: "bliscy",
    subtitle: "Bliski obok Twoich rodziców, gdy Ciebie akurat nie ma.",
    titleSize: 130,
    subtitleSize: 38,
    logoSize: 110,
    layout: "left",
    padding: 100,
    marginBottom: 80,
    focalY: 0.35,
  });

  // === OG IMAGE 1200x630 - left align ===
  await makeCover(1200, 630, "og-photo-1200x630.png", {
    title: "bliscy",
    subtitle: "Zaczynamy od rozmowy.",
    titleSize: 150,
    subtitleSize: 42,
    logoSize: 130,
    layout: "left",
    padding: 90,
    marginBottom: 80,
    focalY: 0.35,
  });

  // === OG IMAGE 1200x630 - centered ===
  await makeCover(1200, 630, "og-photo-centered-1200x630.png", {
    title: "bliscy",
    subtitle: "Bliski obok Twoich rodziców.",
    titleSize: 150,
    subtitleSize: 42,
    logoSize: 130,
    layout: "center",
    padding: 90,
    marginBottom: 80,
    focalY: 0.35,
    overlayStrength: 0.7,
  });

  // === INSTAGRAM POST 1080x1080 ===
  await makeCover(1080, 1080, "ig-post-photo-1080.png", {
    title: "bliscy",
    subtitle: "Bliski obok Twoich rodziców.",
    titleSize: 150,
    subtitleSize: 40,
    logoSize: 140,
    layout: "center",
    padding: 80,
    marginBottom: 120,
    focalY: 0.3,
    overlayStrength: 0.75,
  });

  // === INSTAGRAM STORY 1080x1920 ===
  await makeCover(1080, 1920, "ig-story-photo-1080x1920.png", {
    title: "bliscy",
    subtitle: "Zaczynamy od rozmowy.",
    titleSize: 180,
    subtitleSize: 48,
    logoSize: 180,
    layout: "center",
    padding: 100,
    marginBottom: 200,
    focalY: 0.3,
    overlayStrength: 0.8,
  });

  // === LINKEDIN COVER 1584x396 ===
  await makeCover(1584, 396, "linkedin-cover-photo-1584x396.png", {
    title: "bliscy",
    subtitle: "Ktoś obok Twoich rodziców, gdy Ciebie akurat nie ma.",
    titleSize: 80,
    subtitleSize: 26,
    logoSize: 70,
    layout: "left",
    padding: 90,
    marginBottom: 60,
    focalY: 0.4,
    overlayStrength: 0.75,
    gapLogo: 20,
    gapSubtitle: 20,
  });

  // === CZYSTE ZDJĘCIE ===
  const bg = await makeBackground(1920, 1080, 0.4);
  await sharp(bg).png().toFile(join(outDir, "photo-clean-1920x1080.png"));
  console.log("OK photo-clean-1920x1080.png");

  console.log("\nCovers ready in:", outDir);
})();
