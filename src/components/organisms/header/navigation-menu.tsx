import Link from "next/link";

const NAV_ITEMS = [
  { label: "Tops", href: "/tops" },
  { label: "Bottoms", href: "/bottoms" },
  { label: "Dresses", href: "/dresses" },
  { label: "Accessories", href: "/accessories" },
  { label: "Shop The Look", href: "/shop-the-look" },
  { label: "New Products", href: "/new-products" },
];

export function NavigationMenu() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
