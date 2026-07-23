import { useStore } from "../../store/StoreProvider";

import defaultLogo from "../../assets/logo.png";

type StoreLogoProps = {
  className?: string;
  alt?: string;
};

export default function StoreLogo({
  className = "h-16 w-16",
  alt,
}: StoreLogoProps) {
  const { store } = useStore();

  // Tills vi har filuppladdning använder vi standardloggan.
  // Senare byts denna rad mot PocketBase-filens URL.
  const logoSrc = defaultLogo;

  return (
    <img
      src={logoSrc}
      alt={alt ?? store?.storeName ?? "Butikslogotyp"}
      className={`rounded-xl object-contain ${className}`}
    />
  );
}
