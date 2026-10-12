import { Link, useLocation } from "wouter";
import meta from "../../site-meta.json";

export default function Header() {
  const [location] = useLocation();
  const onHome = location === "/";
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link href="/" className="hdr-logo" aria-label="cheesy ホーム">
          <img src="/brand/wordmark.webp" alt="cheesy" width={900} height={457} />
        </Link>
        <nav className="hdr-nav" aria-label="サイト内">
          <Link href="/company" className={location === "/company" ? "is-on" : ""}>
            会社情報
          </Link>
          <a href={`mailto:${meta.contactEmail}`}>お問い合わせ</a>
          <a href={onHome ? "#download" : "/#download"} className="btn btn-ink btn-sm">
            アプリを入手
          </a>
        </nav>
      </div>
    </header>
  );
}
