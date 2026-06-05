/*
 * cheesy — Shared Legal Document Layout
 * Used by Privacy & Terms pages
 */

import { Link } from "wouter";
import type { ReactNode } from "react";

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

export default function LegalLayout({
  pageType,
  title,
  effectiveDate,
  sections,
  preface,
}: LegalLayoutProps) {
  return (
    <div
      style={{
        backgroundColor: "#1A3F66",
        color: "#F0E6CC",
        minHeight: "100vh",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(232,180,58,0.15)",
          padding: "1rem 0",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "#E8B43A",
              textDecoration: "none",
            }}
          >
            ← tomiees Inc.
          </Link>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "rgba(240,230,204,0.6)",
            }}
          >
            cheesy / {pageType}
          </span>
        </div>
      </header>

      {/* Main */}
      <main
        className="container"
        style={{ paddingTop: "3rem", paddingBottom: "4rem", maxWidth: "720px" }}
      >
        <h1
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: "2rem",
            marginBottom: "0.5rem",
            color: "#F0E6CC",
            fontWeight: 600,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            color: "rgba(240,230,204,0.5)",
            marginBottom: "2.5rem",
            letterSpacing: "0.05em",
          }}
        >
          cheesy (チージー) / 制定日：{effectiveDate}
        </p>

        {preface && (
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.85",
                color: "rgba(240,230,204,0.85)",
              }}
            >
              {preface}
            </p>
          </div>
        )}

        {sections.map((section, i) => (
          <section key={i} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "1.15rem",
                color: "#E8B43A",
                marginBottom: "0.75rem",
                fontWeight: 500,
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.85",
                whiteSpace: "pre-wrap",
                color: "rgba(240,230,204,0.85)",
              }}
            >
              {section.body}
            </p>
          </section>
        ))}

        <footer
          style={{
            borderTop: "1px solid rgba(232,180,58,0.15)",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(240,230,204,0.5)",
              margin: 0,
            }}
          >
            © 株式会社tomiees
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
            }}
          >
            {pageType !== "privacy" && (
              <Link
                href="/cheesy/privacy"
                style={{ color: "rgba(240,230,204,0.6)", textDecoration: "none" }}
              >
                Privacy
              </Link>
            )}
            {pageType !== "terms" && (
              <Link
                href="/cheesy/terms"
                style={{ color: "rgba(240,230,204,0.6)", textDecoration: "none" }}
              >
                Terms
              </Link>
            )}
            <a
              href="mailto:support@cheesy.jp"
              style={{ color: "rgba(240,230,204,0.6)", textDecoration: "none" }}
            >
              Contact
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
