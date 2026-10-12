/*
 * cheesy — 利用規約・プライバシーポリシーの共通レイアウト
 * 本文（sections）は Privacy.tsx / Terms.tsx が持つ。ここは見た目だけ。
 */

import { Link } from "wouter";
import type { ReactNode } from "react";
import meta from "../../site-meta.json";

interface Section {
  title: string;
  body: string;
}

interface LegalLayoutProps {
  pageType: "privacy" | "terms";
  title: string;
  effectiveDate: string;
  sections: Section[];
  preface?: ReactNode;
}

export default function LegalLayout({ pageType, title, effectiveDate, sections, preface }: LegalLayoutProps) {
  return (
    <div className="page page-legal">
      <section className="wrap page-head">
        <p className="hand eyebrow">cheesy / {pageType}</p>
        <h1 className="display">{title}</h1>
        <p className="note">cheesy（チージー）／ 制定日：{effectiveDate}</p>
      </section>

      <article className="wrap">
        <div className="card card-paper legal">
          {preface && <p className="legal-preface">{preface}</p>}
          {sections.map((section, i) => (
            <section key={i} className="legal-sec">
              <h2>{section.title}</h2>
              <p style={{ whiteSpace: "pre-wrap" }}>{section.body}</p>
            </section>
          ))}
        </div>

        <nav className="legal-links" aria-label="関連ページ">
          {pageType !== "privacy" && <Link href="/cheesy/privacy">プライバシーポリシー</Link>}
          {pageType !== "terms" && <Link href="/cheesy/terms">利用規約</Link>}
          <a href={`mailto:${meta.supportEmail}`}>{meta.supportEmail}</a>
        </nav>
      </article>
    </div>
  );
}
