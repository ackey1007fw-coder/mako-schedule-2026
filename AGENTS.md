# まこ（MAKO）応援スケジュールサイト — エージェント向けガイド

ファン「あっきー」が、まこ（MAKO）さんの了承のもとで運営する応援スケジュールサイトです。
サイト種別（公認ファンサイト／公式）は `src/data/site.ts` の `mode` が唯一の真実。
**mode の変更は本人合意の記録がある場合のみ**行う。

## リポジトリ / デプロイ
- GitHub: `ackey1007fw-coder/mako-schedule-2026`（`main` → Vercel 自動デプロイ）
- 本番: https://mako-schedule-2026.vercel.app/

## 技術スタック
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4。**SSG必須**：
  本文テキストは必ずサーバーコンポーネントで描画し、初期HTMLに含める。
  `"use client"` はカウントダウン・ライトボックス・動画等のインタラクションに限定。
- デプロイ後、`curl -s <本番URL> | grep まこ` で本文が初期HTMLに入っていることを確認。
- フォントは `next/font/google`（Shippori Mincho / Noto Sans JP）でセルフホスト。外部リクエストを増やさない。

## データの場所（ここを編集する）
- `src/data/site.ts` … サイト名・種別(mode)・OGP・誕生日設定
- `src/data/events.ts` … イベント一覧（画面の元データ）
- `src/data/profile.ts` … プロフィール
- `src/data/news.ts` … お知らせ（新しいものを配列の先頭に）
- `src/data/photos.ts` … ギャラリー
- `src/data/clips.ts` … TikTok/Instagram 動画（新しいものを配列の先頭に）
- `src/data/socialLinks.ts` … Instagram/TikTokのリンク（これ以外を追加しない）

## SNS 投稿を追加する手順
1. 画像を `public/images/gallery/g{次番号}.jpg` に保存（Drive「MAKO画像」フォルダ経由、
   `https://drive.google.com/thumbnail?id=<ID>&sz=w1400` で取得）。動画は `public/videos/`。
2. `news.ts` 先頭に追加（date / label: "Instagram"|"TikTok" / text / url）。
3. `photos.ts` 先頭に追加（src / alt は内容を具体的に）。
4. 動画があれば `clips.ts` 先頭に追加。
5. `npm run typecheck`（`tsc --noEmit`） → `npm run build` → コミット → PR → main マージ。

## 画像の扱い
- すべて `public/images/` に自己ホスト。SNS/Drive の直リンク禁止。
- **写真はトリミングしない**：ギャラリーは常に自然な比率で表示（`w-full h-auto`）。
  Hero/プロフィール等の固定パネルは、モバイルは全体表示・PC(`lg:`)のみ `object-cover`。
- OGP画像は 1200×630 固定（`/images/og/og-default.png`）。
- 顔写真のAI生成禁止（背景・テクスチャのみ可）。

## 絶対ルール
1. **site.ts の mode と食い違う表記を書かない**（mode=approved-fan の間は「公式」と書かない）。
2. **未確認情報を書かない**。誕生日・本名・所属など本人性に関わる情報は、
   本人確認の記録が無い限り追加しない。推測（SNSのID等からの逆算）も書かない。
3. プロフィール・肩書きの変更は本人確認をとってから。写真・スケジュール追加は事後報告でよい。
4. **X・SHOWROOM へのリンクを追加しない**（本人希望）。連携は Instagram / TikTok のみ。
5. **差分は最小限**。無関係な変更を混ぜない。
6. 案件投稿（PR案件）のメディアは転載しない。リンクのみ。

## SNS（これ以外を追加しない）
- Instagram: `@mako_hawaiian` / TikTok: `@maaako0406`

## 未確認・要判断のまま残っている項目
本リポジトリの初期スキャフォールドは、仕様書の「要確認リスト」(Q1〜Q7) が
未回答の状態で作成されている。実データ投入・本人確認・公開判断は、
これらの回答が揃ってから行うこと（詳細は仕様書 §0・§11 参照）。
