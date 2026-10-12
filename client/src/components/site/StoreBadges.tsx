import meta from "../../site-meta.json";

/**
 * App Store / Google Play の公式バッジ。
 * 公式ルール: 改変しない・同じ高さで並べる・Apple は 40px 以上・まわりに高さの 1/4 の余白。
 * Google のバッジ画像は内側に余白を含むので、見た目の高さが揃うよう少しだけ大きく描く。
 */
export default function StoreBadges({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <div className={`badges badges-${size}`}>
      <a href={meta.appStoreUrl} target="_blank" rel="noopener noreferrer" className="badge badge-apple">
        <img src="/badges/appstore-ja.svg" alt="App Store でダウンロード" width={109} height={40} />
      </a>
      <a href={meta.googlePlayUrl} target="_blank" rel="noopener noreferrer" className="badge badge-google">
        <img src="/badges/googleplay-ja.png" alt="Google Play で手に入れよう" width={646} height={250} />
      </a>
    </div>
  );
}
