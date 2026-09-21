import sharp from "sharp";

const files = ["a-line", "slip", "shirt", "maxi", "fit-flare"];

for (const file of files) {
  const path = new URL(`../src/assets/dresses/${file}.png`, import.meta.url).pathname;
  await sharp(path).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 }).png().toFile(`${path}.tmp.png`);
  await sharp(`${path}.tmp.png`).toFile(path);
}
