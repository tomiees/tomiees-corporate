/*
 * tomiees Corporate Site — Home (Single Page LP)
 * Design: "現像済みの封筒" — Film Envelope
 * Base: #1A3F66 (Dark Navy) | Accent: #E8B43A (Yellow)
 * Fonts: Noto Serif JP (h) / Noto Sans JP (body) / Space Mono (captions)
 * Layout: Single column, max-width 860px, centered
 */

import { useEffect, useRef } from "react";

const CHEESY_LOGO = "/cheesy-logo.png";

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();

  return (
    <div
      style={{
        backgroundColor: "#1A3F66",
        color: "#F0E6CC",
        minHeight: "100vh",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      {/* ── HEADER ── */}
      <header
        style={{
          borderBottom: "1px solid rgba(232,180,58,0.15)",
          padding: "1rem 0",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "#E8B43A",
            }}
          >
            tomiees Inc.
          </span>
          <a
            href="mailto:info@tomiees.com"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "rgba(240,230,204,0.6)",
              textDecoration: "none",
            }}
          >
            info@tomiees.com
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.25rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative film frame corners */}
        <div style={{ position: "absolute", top: "2rem", left: "2rem", width: "40px", height: "40px", borderTop: "1px solid rgba(232,180,58,0.3)", borderLeft: "1px solid rgba(232,180,58,0.3)" }} />
        <div style={{ position: "absolute", top: "2rem", right: "2rem", width: "40px", height: "40px", borderTop: "1px solid rgba(232,180,58,0.3)", borderRight: "1px solid rgba(232,180,58,0.3)" }} />
        <div style={{ position: "absolute", bottom: "2rem", left: "2rem", width: "40px", height: "40px", borderBottom: "1px solid rgba(232,180,58,0.3)", borderLeft: "1px solid rgba(232,180,58,0.3)" }} />
        <div style={{ position: "absolute", bottom: "2rem", right: "2rem", width: "40px", height: "40px", borderBottom: "1px solid rgba(232,180,58,0.3)", borderRight: "1px solid rgba(232,180,58,0.3)" }} />

        {/* cheesy logo */}
        <div className="fade-in-up" style={{ marginBottom: "2.5rem" }}>
          <img
            src={CHEESY_LOGO}
            alt="cheesy"
            style={{
              width: "min(320px, 70vw)",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Main copy */}
        <h1
          className="fade-in-up"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: "clamp(1.5rem, 4vw, 2.6rem)",
            fontWeight: 700,
            lineHeight: 1.4,
            color: "#F0E6CC",
            marginBottom: "1rem",
            maxWidth: "640px",
          }}
        >
          スクロールするSNSから、<br />思い出を語り合うSNSへ
        </h1>

        {/* English sub copy */}
        <p
          className="fade-in-up"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
            color: "#E8B43A",
            letterSpacing: "0.05em",
            marginBottom: "1.5rem",
          }}
        >
          "A social network for talking about memories, not scrolling."
        </p>

        {/* Lead text */}
        <p
          className="fade-in-up"
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "rgba(240,230,204,0.75)",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            maxWidth: "520px",
          }}
        >
          目の前の友達と、その瞬間を一緒に。"思い出の場所"を取り戻すSNS。
        </p>

        {/* Launch badge */}
        <div className="fade-in-up">
          <span className="launch-badge">
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E8B43A", display: "inline-block" }} />
            2026年内 リリース予定 &nbsp;/&nbsp; Launching in 2026
          </span>
        </div>
      </section>

      <hr className="film-rule" />

      {/* ── WHY NOW ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: "3rem" }}>
            <span className="section-label">The problem we're solving</span>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#F0E6CC",
                lineHeight: 1.4,
              }}
            >
              なぜ今、新しいSNSが必要か
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}
          >
            {[
              {
                num: "01",
                text: "いつの間にかSNSは「見る専」になっていないか?",
              },
              {
                num: "02",
                text: "Instagramは\u201c見せる場所\u201dへ。思い出を整理して残す場所では、もうない。",
              },
              {
                num: "03",
                text: "BeRealのような\u201c強制リアル\u201dは続かない。",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="film-card fade-in-up"
                style={{ borderRadius: 0 }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "rgba(232,180,58,0.2)",
                    display: "block",
                    marginBottom: "0.75rem",
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </span>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    color: "rgba(240,230,204,0.85)",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="fade-in-up border-accent-left"
            style={{ maxWidth: "680px" }}
          >
            <p
              style={{
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                lineHeight: 2,
                color: "rgba(240,230,204,0.8)",
              }}
            >
              2025年、米国発の友人限定写真SNS <strong style={{ color: "#F0E6CC" }}>Lapse</strong> が全米App Store 1位、月1億枚の写真記録、45億円を調達。Z世代は「見せるSNS」より「大事な人と共有する場所」を求めている。
            </p>
          </div>
        </div>
      </section>

      <hr className="film-rule" />

      {/* ── ABOUT CHEESY ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: "2rem" }}>
            <span className="section-label">Our product</span>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#F0E6CC",
                lineHeight: 1.4,
                marginBottom: "1.25rem",
              }}
            >
              cheesy ── 共有消費するカメラで繋がる新しいSNS
            </h2>
            <p
              style={{
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                lineHeight: 2,
                color: "rgba(240,230,204,0.75)",
                maxWidth: "640px",
              }}
            >
              写ルンですのように、複数人で1台のカメラを共有する。撮り終えて初めて中身が見える。一緒に消費した友達との"思い出の封筒"が残っていく。
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
              marginTop: "2.5rem",
            }}
          >
            {[
              {
                en: "Shared single-use camera",
                ja: "共有消費するカメラ",
                desc: "QRコードで参加し、複数人で1台のフィルムを使い切る。お互いを撮り合う体験。",
              },
              {
                en: "Memories shared with crew only",
                ja: "クルーだけの思い出",
                desc: "一緒に撮ったメンバーと、その共通の知人にしか見えない。フォロー/アンフォローという気まずさはない。",
              },
              {
                en: "Memories deepen every time you talk",
                ja: "語り直すたびに濃くなる",
                desc: "後で見返すたびに「自分はこれが良かった」が新しく出てくる。思い出は語ることで濃くなる。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="film-card fade-in-up"
                style={{ borderRadius: 0 }}
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#E8B43A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.en}
                </p>
                <h3
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#F0E6CC",
                    marginBottom: "0.75rem",
                    lineHeight: 1.4,
                  }}
                >
                  {item.ja}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.9,
                    color: "rgba(240,230,204,0.75)",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="film-rule" />

      {/* ── ABOUT TOMIEES ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: "2.5rem" }}>
            <span className="section-label">About us</span>
          </div>

          <div className="fade-in-up" style={{ maxWidth: "720px" }}>
            <blockquote
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
                fontWeight: 600,
                lineHeight: 1.7,
                color: "#F0E6CC",
                borderLeft: "3px solid #E8B43A",
                paddingLeft: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              tomiees は、思い出を語り直すことで、今この瞬間を幸せだと感じられる場所を提供する。
            </blockquote>

            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(232,180,58,0.7)",
                letterSpacing: "0.05em",
                marginBottom: "2rem",
                paddingLeft: "1.5rem",
              }}
            >
              "tomiees creates spaces where re-telling memories makes the present feel like happiness."
            </p>

            <p
              style={{
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                lineHeight: 2,
                color: "rgba(240,230,204,0.75)",
              }}
            >
              大切な数人と濃く繋がる体験を、誰もが自然に持てるサービスをつくります。"いいね"の数より、お互いの主観の往復のほうが、人を満たすと信じています。
            </p>
          </div>
        </div>
      </section>

      <hr className="film-rule" />

      {/* ── COMPANY INFO ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: "2.5rem" }}>
            <span className="section-label">Company information</span>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#F0E6CC",
              }}
            >
              会社情報
            </h2>
          </div>

          <div className="fade-in-up">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
              }}
            >
              <tbody>
                {[
                  {
                    label: "商号 / Company name",
                    value: "株式会社tomiees（tomiees Inc.）",
                  },
                  {
                    label: "設立 / Founded",
                    value: "2026年3月17日（March 17, 2026）",
                  },
                  {
                    label: "代表者 / Founders",
                    value: "古屋玲羅（Lyra Furuya, CEO）/ 木下春来（Shunki Kinoshita, COO）",
                  },
                  {
                    label: "所在地 / Address",
                    value: (
                      <>
                        〒150-0043 東京都渋谷区道玄坂1-10-8 渋谷道玄坂ビル2F-C
                        <br />
                        <span style={{ color: "rgba(240,230,204,0.55)", fontSize: "0.8em" }}>
                          Shibuya Dogenzaka Bldg. 2F-C, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan
                        </span>
                      </>
                    ),
                  },
                  {
                    label: "事業内容 / Business",
                    value: "モバイルアプリ・SNSサービスの企画開発運営",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(232,180,58,0.12)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem 1.5rem 1rem 0",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.7rem",
                        fontWeight: 400,
                        color: "#E8B43A",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                        width: "220px",
                      }}
                    >
                      {row.label}
                    </th>
                    <td
                      style={{
                        padding: "1rem 0",
                        color: "rgba(240,230,204,0.85)",
                        lineHeight: 1.8,
                        verticalAlign: "top",
                      }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className="film-rule" />

      {/* ── CONTACT ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: "2rem" }}>
            <span className="section-label">Contact</span>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#F0E6CC",
                marginBottom: "1.5rem",
              }}
            >
              お問い合わせ
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(240,230,204,0.65)",
                marginBottom: "1.5rem",
                lineHeight: 1.8,
              }}
            >
              ご質問・取材・パートナーシップのご相談など、お気軽にご連絡ください。
            </p>
            <a
              href="mailto:info@tomiees.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                color: "#E8B43A",
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(232,180,58,0.4)",
                paddingBottom: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E8B43A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,180,58,0.4)";
              }}
            >
              info@tomiees.com
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(232,180,58,0.15)",
          padding: "2.5rem 0",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            textAlign: "center",
          }}
        >
          {/* Small cheesy logo */}
          <img
            src={CHEESY_LOGO}
            alt="cheesy"
            style={{ width: "80px", height: "auto", opacity: 0.7 }}
          />

          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(240,230,204,0.4)",
              letterSpacing: "0.08em",
              lineHeight: 1.8,
            }}
          >
            Shibuya Dogenzaka Bldg. 2F-C, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(240,230,204,0.35)",
                letterSpacing: "0.08em",
              }}
            >
              © 2026 tomiees Inc. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
