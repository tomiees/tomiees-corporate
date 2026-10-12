import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="page page-404">
      <section className="wrap page-head center">
        <img className="nf-face" src="/brand/face.webp" alt="" width={512} height={512} />
        <p className="hand eyebrow">404</p>
        <h1 className="display">このページは、現像できませんでした。</h1>
        <p className="lead">URL をもういちど確かめてみてください。</p>
        <Link href="/" className="btn btn-ink">
          トップへもどる
        </Link>
      </section>
    </div>
  );
}
