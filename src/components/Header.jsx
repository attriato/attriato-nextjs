import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/search-jobs", label: "Search Jobs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <picture>
            <source srcSet="/images/attriato-logo.webp" type="image/webp" />
            <img
              src="/images/attriato-logo.png"
              alt="site logo"
              width={150}
              height={60}
              style={{ maxWidth: 150 }}
              decoding="async"
            />
          </picture>
        </Link>

        <nav className="nav">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className={isActive(l.to) ? "active" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </nav>
      </div>
      <div className={`mobile-nav${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <Link
            key={l.to}
            href={l.to}
            className={isActive(l.to) ? "active" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
