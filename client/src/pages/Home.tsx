/*
 * cheesy — トップページ
 * 世界観: 紙の上のスクラップブック。クリームの紙地 × 黒の線画 × ピンク/黄の差し色。
 * 情報は「撮り切るまで見られない」→ あそびかた 3 つ → 大事にしていること 3 つ → ダウンロード、だけ。
 */
import { useEffect, useRef, useState } from "react";
import StoreBadges from "../components/site/StoreBadges";
import { useReveal } from "../components/site/Reveal";

const FILM = 27;

/** ヒーローのカメラ。タップするとシャッターが切れて残り枚数が減り、撮り切ると封筒が届く。 */
function CameraToy() {
  const [left, setLeft] = useState(FILM);
  const [flash, setFlash] = useState(0);
  const [bump, setBump] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const shoot = () => {
    if (left <= 0) return;
    setLeft((n) => n - 1);
    setFlash((n) => n + 1);
    setBump((n) => n + 1);
  };
  const reset = () => setLeft(FILM);
  const done = left === 0;

  return (
    <div className={`toy ${done ? "is-done" : ""}`}>
      <button
        type="button"
        className="toy-cam"
        onClick={shoot}
        aria-label={done ? "撮り切りました" : "シャッターを切る（あそび）"}
        disabled={done}
      >
        <img
          src="/brand/camera-yellow.webp"
          alt=""
          width={1100}
          height={644}
          fetchPriority="high"
          decoding="async"
        />
        {/* 残り枚数はアプリと同じく、カメラのカウンター窓の中に出す */}
        <span key={`n${bump}`} className="toy-count" aria-hidden="true">
          {left}
        </span>
        <span key={`f${flash}`} className={flash ? "toy-flash" : ""} aria-hidden="true" />
      </button>

      <p className="toy-bubble hand" aria-live="polite">
        のこり <b>{left}</b> まい
      </p>

      <div className="toy-env" aria-hidden={!done}>
        <img src="/brand/envelope.webp" alt="" width={900} height={606} />
        <p className="hand toy-env-text">現像されました！</p>
        <button type="button" className="btn btn-ink btn-sm" onClick={reset} tabIndex={done ? 0 : -1}>
          もういちど
        </button>
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "カメラをつくる",
    body: "「何枚撮る？」「いつ現像する？」を決めて、仲間を招待。",
    img: "/brand/camera-pink.webp",
    w: 1100,
    h: 644,
  },
  {
    n: "02",
    title: "みんなで撮る",
    body: "撮ったら残り枚数が減るだけ。中身は、まだだれにも見えません。",
    img: "/brand/camera-clear.webp",
    w: 1100,
    h: 621,
  },
  {
    n: "03",
    title: "封筒がとどく",
    body: "撮り切るか現像日になると、みんなに封筒が届く。せーので開けよう。",
    img: "/brand/envelope.webp",
    w: 900,
    h: 606,
  },
];

const WHY = [
  { n: "01", head: "のこり枚数があるから、", mark: "1枚が大事になる。" },
  { n: "02", head: "現像まで見えないから、", mark: "その場を楽しめる。" },
  { n: "03", head: "見えるのは、", mark: "いっしょに撮った仲間だけ。" },
];

export default function Home() {
  useReveal();
  return (
    <div className="page page-home">
      {/* ヒーロー */}
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-copy" data-reveal>
            <p className="hand eyebrow">友だちと1台を分け合う</p>
            <h1 className="display hero-h1">
              撮り切るまで、
              <br />
              見られない。
            </h1>
            <p className="lead">
              枚数にかぎりがある、使い捨てカメラみたいな写真アプリ。
              みんなで撮り切ると現像されて、封筒で届きます。
            </p>
            <StoreBadges size="lg" />
            <p className="note">無料 ・ iOS / Android</p>
          </div>
          <div className="hero-art" data-reveal>
            <img className="dood dood-stars" src="/brand/doodle-stars.webp" alt="" width={480} height={533} aria-hidden="true" />
            <img className="dood dood-sparkle" src="/brand/doodle-sparkle.webp" alt="" width={383} height={615} aria-hidden="true" />
            <img className="dood dood-heart" src="/brand/doodle-heart.webp" alt="" width={454} height={454} aria-hidden="true" />
            <CameraToy />
            <p className="hand hero-hint" aria-hidden="true">← タップしてみて</p>
          </div>
        </div>
      </section>

      {/* あそびかた */}
      <section className="how" id="how">
        <div className="wrap">
          <h2 className="h2 center" data-reveal>
            <span className="hand h2-sub">how it works</span>
            あそびかた
          </h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li className="step" key={s.n} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <img className="step-tape" src={i === 1 ? "/brand/tape-white.webp" : "/brand/tape-yellow.webp"} alt="" aria-hidden="true" />
                <div className="step-pic">
                  <img src={s.img} alt="" width={s.w} height={s.h} loading="lazy" decoding="async" />
                </div>
                <p className="step-n display">{s.n}</p>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 大事にしていること */}
      <section className="why">
        <div className="wrap why-in">
          <div className="why-head" data-reveal>
            <h2 className="h2">
              <span className="hand h2-sub">why cheesy</span>
              cheesy が
              <br />
              大事にしていること
            </h2>
            <img className="dood dood-bubble" src="/brand/doodle-bubble.webp" alt="" width={480} height={431} aria-hidden="true" />
          </div>
          <ul className="why-list">
            {WHY.map((w, i) => (
              <li key={w.n} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="hand why-n">{w.n}</span>
                <p>
                  {w.head}
                  <br />
                  <mark className="marker">{w.mark}</mark>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <img className="dood dood-notes" src="/brand/doodle-notes.webp" alt="" width={480} height={516} aria-hidden="true" />
        <img className="dood dood-flower" src="/brand/doodle-flower.webp" alt="" width={451} height={370} aria-hidden="true" />
      </section>

      {/* ダウンロード */}
      <section className="dl" id="download">
        <div className="wrap dl-in">
          <div className="dl-copy" data-reveal>
            <img className="dl-logo" src="/brand/wordmark.webp" alt="cheesy" width={900} height={457} loading="lazy" />
            <h2 className="display dl-h2">さあ、撮り切ろう。</h2>
            <p className="lead">無料でつかえます。iOS / Android。</p>
            <StoreBadges size="lg" />
          </div>
          <div className="dl-qr" data-reveal>
            <img src="/brand/qr-dl.png" alt="ダウンロード用 QR コード（tomiees.com/dl）" width={480} height={480} loading="lazy" />
            <p className="hand">スマホで読み取ってね</p>
            <img className="dood dood-smiley" src="/brand/doodle-smiley.webp" alt="" width={480} height={470} aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  );
}
