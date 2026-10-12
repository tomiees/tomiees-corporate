/*
 * cheesy — トップページ
 * 世界観: 紙の上のスクラップブック。クリームの紙地 × 黒の線画 × ピンク/黄の差し色。
 * 情報は「撮り切るまで見られない」→ あそびかた 3 つ → 大事にしていること 3 つ → ダウンロード、だけ。
 */
import { useState } from "react";
import StoreBadges from "../components/site/StoreBadges";
import { useReveal } from "../components/site/Reveal";

const FILM = 27;

/**
 * ヒーローのカメラ。タップするとシャッターが切れて残り枚数が減り、撮り切ると封筒が届く。
 *
 * 見せ方の決まり（2026-10-12 調査より）:
 * - 数字は製品そのもの（カウンター窓）に語らせる。製品の上に吹き出しを重ねない
 * - 説明は製品の外に、細い線 1 本と小さな等幅ラベルで添える（Apple / Teenage Engineering 流）
 * - 手描きの要素は「おしてみて」の誘い 1 つだけ。最初のタップで消える
 * - 反応は 0.4 秒以内（押し込み → 光る → 数字が回る）
 */
function CameraToy() {
  const [left, setLeft] = useState(FILM);
  const [shots, setShots] = useState(0);

  const shoot = () => {
    if (left <= 0) return;
    setLeft((n) => n - 1);
    setShots((n) => n + 1);
    try {
      navigator.vibrate?.(10);
    } catch {
      /* 対応端末だけ */
    }
  };
  const reset = () => {
    setLeft(FILM);
    setShots(0);
  };
  const done = left === 0;
  const touched = shots > 0;

  return (
    <div className={`toy ${done ? "is-done" : ""} ${touched ? "is-touched" : ""}`}>
      <div className="toy-stage">
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
          {/* 残り枚数はアプリと同じ位置の窓の中。押すたびに数字が下から回ってくる */}
          <span className="toy-count" aria-hidden="true">
            <span key={left} className="toy-digit">
              {left}
            </span>
          </span>
          <span key={`f${shots}`} className={shots ? "toy-flash" : ""} aria-hidden="true" />
        </button>

        {/* 窓からまっすぐ下ろした細い線と、その先の小さなラベル */}
        <span className="toy-lead" aria-hidden="true" />
        <p className="toy-spec" aria-live="polite">
          <span className="toy-spec-eyebrow">shots left</span>
          {done ? (
            <span className="toy-spec-main">
              とりきった！ <a href="#how">→ 現像へ</a>
            </span>
          ) : (
            <span className="toy-spec-main">
              のこり <b>{left}</b> まい
            </span>
          )}
        </p>

        {/* 27 コマのフィルム。撮ったぶんがピンクに */}
        <ol className="toy-strip" aria-hidden="true">
          {Array.from({ length: FILM }, (_, i) => (
            <li key={i} className={i < shots ? "used" : ""} />
          ))}
        </ol>

        {/* 手描きの誘い。最初のタップで消える */}
        <p className="toy-hint hand" aria-hidden="true">
          おしてみて
          <svg viewBox="0 0 80 60" width="64" height="48">
            {/* 右上から左下のカメラへ、少しうねる手描きの矢印 */}
            <path
              d="M74 6 C 60 40, 34 50, 10 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path d="M22 36 L9 44 L20 52" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>

        <div className="toy-env" aria-hidden={!done}>
          <img src="/brand/envelope.webp" alt="" width={900} height={606} />
          <button type="button" className="toy-reset hand" onClick={reset} tabIndex={done ? 0 : -1}>
            もういちど
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * あそびかた 3 ステップ。ステップごとに「主役の物」を替え、動詞で見出しを立てる
 * （同じカメラの絵を並べると「同じこと」に見える — ゲシュタルトの類同の法則）。
 * 共通の小さな状態表示「のこり 27 → 12 → 0」で、3 枚が 1 本の話に読めるようにする。
 */
const STEP_ICONS = {
  create: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" />
      <path d="M13 7l3 3" />
    </svg>
  ),
  shoot: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  arrive: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </svg>
  ),
};

function StepVisual({ kind }: { kind: "create" | "shoot" | "arrive" }) {
  if (kind === "create") {
    return (
      <div className="vis vis-create" aria-hidden="true">
        <img className="vis-sheet" src="/brand/sticker-sheet.webp" alt="" width={520} height={305} loading="lazy" decoding="async" />
        <img className="vis-cam" src="/brand/camera-pink.webp" alt="" width={1100} height={644} loading="lazy" decoding="async" />
        <ul className="vis-tags">
          <li className="hand">27まい</li>
          <li className="hand">現像日 10/20</li>
          <li className="hand">ともだち 3人</li>
        </ul>
      </div>
    );
  }
  if (kind === "shoot") {
    return (
      <div className="vis vis-shoot" aria-hidden="true">
        <div className="vis-frames">
          <span className="vis-frame f1" />
          <span className="vis-frame f2" />
          <span className="vis-frame f3" />
          <span className="hand vis-note">まだ見えない</span>
        </div>
        <div className="vis-window">
          <span className="vis-window-num">12</span>
        </div>
      </div>
    );
  }
  return (
    <div className="vis vis-arrive" aria-hidden="true">
      <span className="vis-print p1" />
      <span className="vis-print p2" />
      <span className="vis-print p3" />
      <span className="vis-print p4" />
      <img className="vis-env" src="/brand/envelope.webp" alt="" width={900} height={606} loading="lazy" decoding="async" />
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    kind: "create" as const,
    title: "カメラをつくる",
    body: "枚数と現像日をきめて、友だちをさそう。",
    status: "のこり 27",
  },
  {
    n: "02",
    kind: "shoot" as const,
    title: "みんなで撮る",
    body: "撮った写真はまだ見えない。カウンターだけが減っていく。",
    status: "のこり 12",
  },
  {
    n: "03",
    kind: "arrive" as const,
    title: "封筒がとどく",
    body: "撮りきったら現像。みんなのアルバムに。",
    status: "0 → 現像！",
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
            <CameraToy />
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
              <li className={`step step-${s.kind}`} key={s.n} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="step-pic">
                  <StepVisual kind={s.kind} />
                </div>
                <p className="step-n">
                  <span className="display">{s.n}</span>
                  <span className="step-status">{s.status}</span>
                </p>
                <h3 className="step-title">
                  <span className="step-icon">{STEP_ICONS[s.kind]}</span>
                  {s.title}
                </h3>
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
