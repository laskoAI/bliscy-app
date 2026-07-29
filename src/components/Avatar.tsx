// Awatary generowane przez DiceBear (proceduralne SVG).
// Ta sama wartość `seed` = zawsze ten sam wizerunek.
// Styl `personas` — miękkie, ludzkie ilustracje pasujące do palety marki.

type AvatarProps = {
  seed: string;
  size?: number;
  className?: string;
  alt?: string;
};

const BG_COLORS = ["ffbb75", "ffd6a8", "e8a15b", "eadfc9", "c8622f"];

export function Avatar({ seed, size = 56, className = "", alt = "" }: AvatarProps) {
  const cleanSeed = encodeURIComponent(seed || "bliscy");
  const bg = BG_COLORS.join(",");
  const url = `https://api.dicebear.com/9.x/personas/svg?seed=${cleanSeed}&backgroundColor=${bg}&backgroundType=solid&radius=50`;

  return (
    <img
      src={url}
      width={size}
      height={size}
      alt={alt}
      className={`rounded-full shrink-0 ${className}`}
      loading="lazy"
    />
  );
}
