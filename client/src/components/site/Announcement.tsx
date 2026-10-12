import { useEffect, useState } from "react";

/**
 * サイト最上部の「お知らせ」帯。仕様は docs/ANNOUNCEMENT.md。
 * タイトルと本文だけの JSON を読み、あれば出す。無ければ何も描かない。
 * `role="status"` の枠だけは最初から置いておく（後から中身を入れると読み上げソフトに伝わる）。
 */

type Level = "info" | "incident";
interface Item {
  id: string;
  level: Level;
  title: string;
  body: string;
  url?: string;
  starts_at?: string;
  ends_at?: string;
}

const API_URL =
  (import.meta.env.VITE_ANNOUNCEMENT_URL as string | undefined) ||
  "https://api.cheesy.workers.dev/announcements";
const FALLBACK_URL = "/announcements.json";
const DISMISS_KEY = "cheesy.announcement.dismissed";

/** どんな形で来ても { title, body } を持つ 1 件に揃える。 */
function normalize(data: unknown): Item | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const list: unknown[] = Array.isArray(data)
    ? data
    : Array.isArray(d.items)
      ? d.items
      : d.announcement
        ? [d.announcement]
        : [data];
  const now = Date.now();
  for (const raw of list) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const title = typeof r.title === "string" ? r.title.trim() : "";
    const body = typeof r.body === "string" ? r.body.trim() : "";
    if (!title && !body) continue;
    const starts = typeof r.starts_at === "string" ? Date.parse(r.starts_at) : NaN;
    const ends = typeof r.ends_at === "string" ? Date.parse(r.ends_at) : NaN;
    if (!Number.isNaN(starts) && now < starts) continue;
    if (!Number.isNaN(ends) && now > ends) continue;
    return {
      id: typeof r.id === "string" && r.id ? r.id : `${title}|${body}`,
      level: r.level === "incident" ? "incident" : "info",
      title,
      body,
      url: typeof r.url === "string" ? r.url : undefined,
    };
  }
  return null;
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  if (res.status === 204) return null;
  if (!res.ok) throw new Error(String(res.status));
  const text = await res.text();
  return text.trim() ? JSON.parse(text) : null;
}

async function load(): Promise<Item | null> {
  for (const url of [API_URL, FALLBACK_URL]) {
    try {
      const item = normalize(await fetchJson(url));
      if (item) return item;
    } catch {
      /* 次の読み先へ */
    }
  }
  return null;
}

function readDismissed(): string | null {
  try {
    return localStorage.getItem(DISMISS_KEY);
  } catch {
    return null;
  }
}

export default function Announcement() {
  const [item, setItem] = useState<Item | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let alive = true;
    const run = () =>
      load().then((it) => {
        if (!alive) return;
        setItem(it);
        setHidden(!!it && it.level !== "incident" && readDismissed() === it.id);
      });
    run();
    const onVisible = () => document.visibilityState === "visible" && run();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const dismiss = () => {
    if (item && item.level !== "incident") {
      try {
        localStorage.setItem(DISMISS_KEY, item.id);
      } catch {
        /* 保存できなくても閉じるだけはする */
      }
    }
    setHidden(true);
  };

  const show = item && !hidden;
  return (
    <div role="status" aria-live="polite" className={show ? `ann ann-${item.level}` : "ann ann-empty"}>
      {show && (
        <div className="wrap ann-in">
          <p className="ann-text">
            {item.title && <strong>{item.title}</strong>}
            {item.body && <span>{item.body}</span>}
            {item.url && (
              <a href={item.url} className="ann-link">
                くわしく
              </a>
            )}
          </p>
          <button type="button" className="ann-close" onClick={dismiss} aria-label="お知らせを閉じる">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
