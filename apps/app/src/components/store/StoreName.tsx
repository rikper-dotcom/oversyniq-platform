import { useStore } from "../../store/StoreProvider";

type StoreNameProps = {
  fallback?: string;
  className?: string;
};

export default function StoreName({
  fallback = "24 Sju Hub",
  className,
}: StoreNameProps) {
  const { store } = useStore();

  return (
    <span className={className}>
      {store?.storeName || fallback}
    </span>
  );
}
