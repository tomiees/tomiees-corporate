/*
 * /dl — QR やリンクの着地点。iPhone なら App Store、Android なら Google Play へ送る。
 * どちらでもない（PC など）ときは両方のバッジを出す。
 */
import { useEffect, useState } from "react";
import StoreBadges from "../components/site/StoreBadges";
import meta from "../site-meta.json";

function storeFor(ua: string): string | null {
  if (/iPhone|iPad|iPod/i.test(ua)) return meta.appStoreUrl;
  if (/Android/i.test(ua)) return meta.googlePlayUrl;
  return null;
}

export default function Download() {
  const [redirecting, setRedirecting] = useState(false);
  useEffect(() => {
    const to = storeFor(navigator.userAgent);
    if (to) {
      setRedirecting(true);
      window.location.replace(to);
    }
  }, []);
  return (
    <div className="page page-dl">
      <section className="wrap page-head center">
        <img className="dl-icon" src="/brand/app-icon.webp" alt="" width={256} height={256} />
        <h1 className="display">cheesy</h1>
        <p className="lead">{redirecting ? "ストアへ移動しています…" : "お使いの端末のストアからどうぞ。"}</p>
        <StoreBadges size="lg" />
      </section>
    </div>
  );
}
