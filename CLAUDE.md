# CLAUDE.md

このプロジェクトの保守ルール・規約は **[AGENTS.md](./AGENTS.md)** にまとめています。作業前に必ず読んでください。

要点（詳細は AGENTS.md）:
- `main` → Vercel 自動デプロイ（本番 https://mako-schedule-2026.vercel.app/）。
- 編集する元データ: `src/data/events.ts` / `profile.ts` / `photos.ts` / `news.ts` / `clips.ts`。
- **SNS投稿の追加手順**は AGENTS.md「SNS 投稿を追加する手順」を参照。
- 画像は `public/images/` に**自己ホスト**（Drive直リンク不使用）。新規は Drive サムネ `?id=ID&sz=w1400` を落として配置。
- **写真はトリミングしない**：ギャラリーは自然な比率、Hero等の固定パネルはモバイル全体表示・PCのみ `object-cover`。
- ルール: 「公式」と書かない（mode=approved-fanの間）・未確認情報を書かない・顔をAI生成しない・差分最小。
- X・SHOWROOMへのリンクは追加しない（本人希望）。
- `src/data/site.ts` の `mode` がサイト種別の唯一の真実。
