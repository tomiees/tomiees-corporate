import { Link } from "wouter";
import meta from "../../site-meta.json";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <img className="ftr-face" src="/brand/face.webp" alt="" width={512} height={512} />
          <nav className="ftr-nav" aria-label="フッター">
            <Link href="/">cheesy</Link>
            <Link href="/company">会社情報</Link>
            <Link href="/cheesy/terms">利用規約</Link>
            <Link href="/cheesy/privacy">プライバシーポリシー</Link>
            <a href={`mailto:${meta.contactEmail}`}>お問い合わせ</a>
          </nav>
        </div>
        <p className="ftr-legal">
          Apple、Apple のロゴ、App Store は、米国およびその他の国で登録された Apple Inc. の商標です。
          Google Play および Google Play ロゴは Google LLC の商標です。
        </p>
        <p className="ftr-copy">© 2026 tomiees Inc.</p>
      </div>
    </footer>
  );
}
