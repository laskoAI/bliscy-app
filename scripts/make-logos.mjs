import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join } from "path";

const svgBuffer = readFileSync(join(process.cwd(), "public/bliscy-logo.svg"));
const outDir = join(process.env.HOME || ".", "Desktop/bliscy-logo-pack");
mkdirSync(outDir, { recursive: true });

const CREAM = { r: 245, g: 239, b: 228, alpha: 1 }; // #f5efe4 - kolor tła marki

async function makeTransparent(size, name) {
  await sharp(svgBuffer, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(join(outDir, name));
  console.log("OK", name);
}

async function makeOnBg(size, name, bg = CREAM, padding = 0.1) {
  const inner = Math.round(size * (1 - padding * 2));
  const canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  });
  const logoBuf = await sharp(svgBuffer, { density: 300 })
    .resize(inner, inner)
    .png()
    .toBuffer();
  await canvas
    .composite([{ input: logoBuf, gravity: "center" }])
    .png()
    .toFile(join(outDir, name));
  console.log("OK", name);
}

async function makeCover(width, height, name, bg = CREAM) {
  const inner = Math.min(width, height) - Math.round(height * 0.3);
  const logoBuf = await sharp(svgBuffer, { density: 300 })
    .resize(inner, inner)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: logoBuf, gravity: "center" }])
    .png()
    .toFile(join(outDir, name));
  console.log("OK", name);
}

(async () => {
  // Standalone (transparentne tło)
  await makeTransparent(512, "bliscy-logo-512.png");
  await makeTransparent(1024, "bliscy-logo-1024.png");

  // Profil FB (kwadrat na kremowym tle, z paddingiem żeby nie było kropki przy okrągłym przycięciu)
  await makeOnBg(500, "fb-profile-500.png", CREAM, 0.15);
  await makeOnBg(1080, "fb-profile-1080.png", CREAM, 0.15);

  // Kwadratowy post na FB / Instagram
  await makeOnBg(1080, "post-square-1080.png", CREAM, 0.25);

  // Cover FB / OG image
  await makeCover(1200, 630, "og-cover-1200x630.png", CREAM);
  await makeCover(1200, 630, "og-cover-1200x630-dark.png", { r: 43, g: 36, b: 23, alpha: 1 });

  // Cover FB (820x312)
  await makeCover(820, 312, "fb-cover-820x312.png", CREAM);

  console.log("\nAll files ready in:", outDir);
})();
