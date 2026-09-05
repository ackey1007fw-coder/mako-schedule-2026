# MAKO Schedule 2026

まこ（MAKO）さんの活動予定・SNSをまとめる応援スケジュールサイトです。
保守ルールは [AGENTS.md](./AGENTS.md) を参照してください。

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- ISR（`src/app/page.tsx` の `revalidate = 3600` で本文を再検証。元データは `src/data/*.ts` に内蔵）

## Local Setup

```bash
npm ci
npm run dev
```

## Scripts

```bash
npm run typecheck  # tsc --noEmit
npm run build      # next build（本番ビルドと既存のISR構成を確認）
npm run lint
npm test           # portal feedと親ポータルへの戻り導線を検証
```

