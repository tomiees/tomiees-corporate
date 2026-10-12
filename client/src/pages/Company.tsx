/*
 * 会社情報 — 株式会社tomiees
 * Path: /company
 */
import { Link } from "wouter";
import { useReveal } from "../components/site/Reveal";
import meta from "../site-meta.json";

const COMPANY = [
  ["商号", "株式会社tomiees（tomiees Inc.）"],
  ["設立", "2026年3月17日（March 17, 2026）"],
  ["代表者", "古屋玲羅（Lyra Furuya, CEO）/ 木下春来（Shunki Kinoshita, COO）"],
  [
    "所在地",
    "〒150-0043 東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F-C\nShibuya Dogenzaka Tokyu Bldg. 2F-C, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan",
  ],
  ["事業内容", "モバイルアプリ・SNSサービスの企画開発運営"],
] as const;

export default function Company() {
  useReveal();
  return (
    <div className="page page-company">
      <section className="wrap page-head" data-reveal>
        <p className="hand eyebrow">about us</p>
        <h1 className="display">tomiees</h1>
        <blockquote className="quote">
          <p>tomiees は、思い出を語り直すことで、今この瞬間を幸せだと感じられる場所を提供する。</p>
          <p className="quote-en">“tomiees creates spaces where re-telling memories makes the present feel like happiness.”</p>
        </blockquote>
        <p className="lead">
          大切な数人と濃く繋がる体験を、誰もが自然に持てるサービスをつくります。
          “いいね”の数より、お互いの主観の往復のほうが、人を満たすと信じています。
        </p>
      </section>

      <section className="wrap" data-reveal>
        <div className="card card-paper">
          <h2 className="h2">
            会社情報 <span className="hand h2-sub">company</span>
          </h2>
          <dl className="info">
            {COMPANY.map(([k, v]) => (
              <div className="info-row" key={k}>
                <dt>{k}</dt>
                <dd style={{ whiteSpace: "pre-line" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap page-grid" data-reveal>
        <div className="card card-pink">
          <h2 className="h2">お問い合わせ</h2>
          <p>ご質問・取材・パートナーシップのご相談など、お気軽にご連絡ください。</p>
          <a className="btn btn-ink" href={`mailto:${meta.contactEmail}`}>
            {meta.contactEmail}
          </a>
        </div>
        <div className="card card-yellow">
          <h2 className="h2">つくっているもの</h2>
          <p>友だちと1台のカメラを分け合う、使い捨てカメラみたいな写真アプリ。</p>
          <Link href="/" className="btn btn-ink">
            cheesy を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
