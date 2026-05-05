# tomiees コーポレートサイト デザインアイデア

## 背景・目的
Apple Developer Program / Google Play Console の法人審査用1ページLP。
cheesyアプリのブランドカラー（ダークネイビー × イエロー）を使用。
ヴィンテージ感 + 親しみ + シンプル。レトロカメラ・フィルム写真を想起させる雰囲気。

---

<response>
<probability>0.07</probability>
<idea>

## アイデア A: 「現像待ちのフィルム」— Analog Darkroom

**Design Movement**: 1970年代アナログ写真 × 現代ミニマリズム

**Core Principles**:
1. フィルムグレイン質感を全面に薄く敷く（noise texture overlay）
2. 情報密度を低く保ち、余白を「暗室の静けさ」として使う
3. テキストはすべて左揃え、非対称レイアウト
4. 写真の「現像待ち」感 — 徐々に見えてくる演出

**Color Philosophy**:
- Base: #1F4870（ダークネイビー）— 暗室の深さ
- Accent: #E8B43A（イエロー）— 現像液の光
- Neutral: #F5EDD8（クリーム）— 古い印画紙
- Text on dark: #F5EDD8

**Layout Paradigm**:
- 非対称2カラム（テキスト左60% / 余白右40%）
- セクション間に細いイエローのルール線（1px）
- Heroは全画面高さ、ロゴを左上に大きく

**Signature Elements**:
1. フィルムスプロケット穴を模したボーダーパターン（水平ライン）
2. セクション番号を大きなゴーストテキストで背景に（01, 02...）
3. イエローのアンダーライン強調

**Interaction Philosophy**:
スクロールで要素がフェードイン（opacity 0→1、translateY 20px→0）。
ホバー時にイエローのアンダーラインが左から右へ伸びる。

**Animation**:
- 入場: `opacity: 0 → 1, translateY: 24px → 0, duration: 600ms, ease: ease-out`
- ホバー: アンダーライン `width: 0 → 100%, duration: 200ms`
- スクロール: IntersectionObserver で各セクションをトリガー

**Typography System**:
- 見出し: Noto Serif JP（重厚感、レトロ）
- 本文: Noto Sans JP（可読性）
- 英語サブ: Space Mono（等幅、フィルム感）
- 階層: 48px / 32px / 20px / 16px / 14px

</idea>
</response>

<response>
<probability>0.06</probability>
<idea>

## アイデア B: 「使い捨てカメラの箱」— Retro Packaging

**Design Movement**: 1990年代日本の使い捨てカメラパッケージデザイン

**Core Principles**:
1. カード・ボックス型UIブロック（枠線あり、角丸なし）
2. 黄色ブロックと紺ブロックの交互配置でリズムを作る
3. 大きな数字（01, 02, 03）でセクションを区切る
4. 印刷物的なフラットデザイン

**Color Philosophy**:
- 紺と黄の強コントラスト
- セクション背景を交互に切り替え（紺→黄→紺→黄）
- 黄背景では紺テキスト、紺背景では黄/白テキスト

**Layout Paradigm**:
- フルワイドのセクションブロック
- コンテンツは中央揃え、最大幅 720px
- カード要素は2px solid borderで囲む

**Signature Elements**:
1. セクション区切りに斜めカット（clip-path）
2. 「写ルンです」のような製品ラベル風タイポグラフィ
3. ドット柄背景パターン（薄い）

**Interaction Philosophy**:
シンプルなフェードイン。過度なアニメーションなし。
ボタンホバーで背景色反転（紺↔黄）。

**Animation**:
- 入場: `opacity: 0 → 1, duration: 400ms`
- ボタンホバー: `background-color transition, duration: 150ms`

**Typography System**:
- 見出し: Noto Sans JP Bold（太く力強く）
- 本文: Noto Sans JP Regular
- 英語: Inter（クリーン）
- 階層: 56px / 36px / 22px / 16px

</idea>
</response>

<response>
<probability>0.05</probability>
<idea>

## アイデア C: 「現像済みの封筒」— Film Envelope ★採用

**Design Movement**: ヴィンテージ写真現像サービス × 現代コーポレート

**Core Principles**:
1. ダークネイビーを「夜の暗室」として全体ベースに使用
2. イエローを「光の漏れ」として要素のアクセントに限定使用
3. 薄いグレインテクスチャをbody全体に重ねる
4. セクションは上下パディングを広く取り、呼吸感を重視

**Color Philosophy**:
- Background: #1A3F66（深いネイビー）
- Surface: #1F4870（カード背景）
- Accent: #E8B43A（イエロー）
- Text Primary: #F0E6CC（クリーム白）
- Text Secondary: #9BB5CC（薄いブルーグレー）
- Border: rgba(232, 180, 58, 0.2)（薄いイエロー枠）

**Layout Paradigm**:
- シングルカラム中央揃え、最大幅 860px
- Heroのみフルスクリーン、ロゴ中央大
- 各セクションは左側に細いイエローのバーティカルライン
- カード要素はネイビーより少し明るい背景 + 薄いイエロー枠

**Signature Elements**:
1. SVGグレインフィルター（feTurbulence）を全体に
2. セクション小見出しに小さなイエロー四角 + 英語テキスト
3. Heroの背景に薄いフィルムフレーム風の装飾枠

**Interaction Philosophy**:
スクロールで各セクションが下からフェードイン。
ホバー時に要素が微かに明るくなる（brightness up）。
メールリンクはイエローでアンダーライン。

**Animation**:
- 入場: `opacity: 0 → 1, translateY: 16px → 0, duration: 500ms, ease: ease-out`
- ホバー: `filter: brightness(1 → 1.1), duration: 200ms`
- バッジ: 微かなパルスアニメーション

**Typography System**:
- 見出し: Noto Serif JP（重厚、レトロ感）
- 本文: Noto Sans JP（可読性）
- 英語キャプション: Space Mono（等幅、フィルム感）
- 階層: 52px / 36px / 22px / 16px / 13px

</idea>
</response>

---

## 採用デザイン: アイデア C「現像済みの封筒」

ダークネイビーベースにイエローアクセント、グレインテクスチャ、
Noto Serif JP見出し + Noto Sans JP本文 + Space Mono英語キャプション。
シングルカラム中央揃え、左側イエローバーティカルライン、薄いイエロー枠カード。
