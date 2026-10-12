# サイト上部の「お知らせ」帯

アプリがどうしても動かなくなったときなどに、tomiees.com の全ページの最上部に
お知らせを出す仕組み。**タイトルと本文だけ**あれば出る。

## どこから読むか

サイトを開くたびに、次の順で JSON を取りに行く（どちらも失敗したら何も出さない）。

1. `https://api.cheesy.workers.dev/announcements` （cheesy のサーバー。`/admin` から一斉配信する想定）
2. `/announcements.json` （このリポジトリの `client/public/announcements.json`。サーバーが用意できる前の非常口。
   ここを書き換えて main に push すれば、数分でサイトに出る）

読み先 1 は環境変数 `VITE_ANNOUNCEMENT_URL` で差し替えられる（Vercel の設定か `.env`）。

## サーバーに用意してほしい形

```
GET https://api.cheesy.workers.dev/announcements
Access-Control-Allow-Origin: https://tomiees.com   ← これが無いとブラウザが読めない
Cache-Control: max-age=60
```

```json
{
  "items": [
    {
      "id": "2026-10-12-outage",
      "level": "incident",
      "title": "現在、写真の読み込みに時間がかかっています",
      "body": "復旧作業中です。アプリを閉じずにお待ちください。",
      "url": "https://tomiees.com/",
      "ends_at": "2026-10-13T00:00:00+09:00"
    }
  ]
}
```

- お知らせが無いときは `{ "items": [] }`（または `204 No Content` / `null`）を返す
- **必須は `title` と `body` だけ**。`items` を省いて `{ "title": "...", "body": "..." }` を
  そのまま返してもよい（配列・単体どちらも受け付ける）
- `level`: `"info"`（既定・黄色の帯・閉じると次回から出ない）／
  `"incident"`（ピンクの帯・閉じても次回訪問時にまた出る）
- `id`: 閉じた記録の鍵。省くとタイトル＋本文から自動で作る
- `url`: 「くわしく」リンク（任意）
- `ends_at`: この時刻を過ぎたら出さない（任意・ISO 8601）
- `starts_at`: この時刻まで出さない（任意）
- 複数あるときは先頭の1件だけ出す（最重要を先頭に）

## 画面側の挙動

- `role="status"` の帯として `<header>` の上に差し込む。読み上げソフトにも伝わる
- 閉じるボタンは「お知らせを閉じる」。`id` を端末に記録して同じお知らせは再表示しない
  （`incident` は例外で毎回出す）
- 読み込みはページ表示時と、タブに戻ってきたとき（`visibilitychange`）

## 見た目を確かめたいとき

お知らせが無いときは帯は出ない。見本を出すには URL の末尾に付ける:

- `https://tomiees.com/?ann=preview` … 黄色のお知らせ
- `https://tomiees.com/?ann=incident` … ピンクの障害
