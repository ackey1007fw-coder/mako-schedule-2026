# MAKO Schedule 2026

まこ（MAKO）さんの活動予定・SNSをまとめる応援スケジュールサイトです。
保守ルールは [AGENTS.md](./AGENTS.md) を参照してください。

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- SSG（データはすべて `src/data/*.ts` に内蔵、外部APIなし）

## Local Setup

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run typecheck  # tsc --noEmit
npm run build       # next build（本番ビルド。SSG確認もここで）
npm run lint
```
