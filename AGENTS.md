# まこ（MAKO）応援スケジュールサイト — エージェント向けガイド

まこ（MAKO）さんの了承のもとで運営する応援スケジュールサイト。サイト種別の正本は `src/data/site.ts` の `mode`。本人合意の記録がある場合だけmodeを変更し、表示を一致させる。

## 作業開始

1. repo `ackey1007fw-coder/mako-schedule-2026` / base `main` を確認する。`git status --short --branch` と `git remote -v` で既存変更・作業場所を確認する。
2. このファイル、`README.md`、`src/data/site.ts` と `profile.ts`、対象コード・テストを読む。
3. `docs/AI_HANDOFF.md`・`docs/DECISION_LOG.md`・`docs/AI_PROJECT_MEMORY_SKILL.md` が存在する場合は読む。ない場合は導入せず、実在する資料で進める。
4. 最新main、関連merged PR、Open/Draft PRを確認する。他の作業者のbranch・ファイルを勝手に上書きしない。

現状の判断はmain / merged PR → 明示的なDecision Log → HANDOFF → 過去チャットの順。確認済みの値と未確認項目を区別し、古い初期仕様の「全項目未回答」を現状へ一括適用しない。

今回の明示指示と停止条件を優先する。AGENTSを編集しても、その編集PR自身の権限が増えるわけではない。

## 環境と編集先

- 本番: https://mako-schedule-2026.vercel.app/
- mainへの反映でVercelが自動デプロイする。変更は作業branch → PRで提出する。
- Next.js App Router / TypeScript / Tailwind CSS v4。具体的なバージョンは `package.json` / `package-lock.json` を確認する。
- パッケージマネージャはnpm。`npm ci` で既存lockfileを使い、別のlockfileを生成しない。
- 本文はServer Componentで初期HTMLに含める。`"use client"` はカウントダウン・ライトボックス・動画等の操作部分に限定する。
- `src/app/page.tsx` は `revalidate = 3600` のISR。静的生成した本文を定期再検証する既存構成を維持し、日時判定を永久にビルド時点へ固定しない。
- フォントは既存の `next/font/google`（Shippori Mincho / Noto Sans JP）を使用する。

| 内容 | 編集先 |
| --- | --- |
| サイト名・種別・OGP・誕生日設定 | `src/data/site.ts` |
| イベント | `src/data/events.ts` |
| プロフィール | `src/data/profile.ts` |
| お知らせ | `src/data/news.ts` |
| 写真 | `src/data/photos.ts` |
| TikTok / Instagram動画 | `src/data/clips.ts` |
| 本人SNS | `src/data/socialLinks.ts` |
| 親ポータルのfeed | `src/lib/portalFeed.ts` と `tests/portalFeed.test.ts` |

## 本人確認と公開範囲

- `mode=approved-fan` の間は「公式」と書かない。本人了承を、あらゆる素材・プロフィール変更への包括許可として扱わない。
- プロフィール・肩書きの追加変更は本人確認後。写真・スケジュールの追加は既存方針どおり事後報告でよいが、本人性・出典・権利を確認する。
- 本名・所属・誕生日等をSNSのIDや他サイトから推測しない。誕生日の月日が確認されていても、生年が確認されたことにはならない。
- Instagram `@mako_hawaiian` / TikTok `@maaako0406` のみを本人SNSとして扱う。本人希望によりX・SHOWROOMへのリンクを追加しない。
- 案件投稿のメディアを転載しない。元投稿へのリンクのみ。
- 実データ投入・公開判断に必要な初期仕様の未回答項目は、本人確認記録と現行コードを照合して項目ごとに解決する。参照できない仕様書の回答を捏造しない。
- 私的DM、非公開の人間関係、私的住所・連絡先・家族情報、認証情報を公開リポジトリへ書かない。制作者の職業を特定する紹介も避ける。

## SNS・素材の追加手順

1. 提供された画像・依頼者指定のDrive原本を使い、本人性と掲載範囲を確認する。
2. `public/images/gallery/g{次番号}.jpg` に新規保存する。現在の最大番号と同名衝突を確認する。動画は `public/videos/`。
3. `news.ts` に `date / label / text / url`、写真があれば `photos.ts` に `src / alt`、動画があれば `clips.ts` に登録する。
4. 新規投稿は既存方針どおり配列先頭へ。過去投稿は元投稿日を変えず、既存表示の並びを確認して挿入する。同じURL・同じ素材を重複追加しない。
5. 引用は原文に一致させ、altは見える内容を具体的に書く。感情・場所・人物関係を推測しない。
6. 下記の品質ゲートを通してPRを提出する。

画像は自己ホストし、SNS・Drive直リンクを公開データに残さない。顔写真のAI生成は禁止（背景・テクスチャのみ可）。原本をトリミングしない。

- ギャラリーは常に自然な比率（`w-full h-auto`）。
- Hero / プロフィール等の固定パネルはモバイルで全体表示、PCの `lg:` だけ `object-cover`。
- OGPは既存の `/images/og/og-default.png`、1200×630。

## 検証・PR・完了

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
```

- `npm test` はportal feedと親ポータルへの戻り導線を検証する。news / eventsが空なら空のfeedが正しい。表示のためのダミー情報を作らない。
- UI変更時はモバイル・PCで対象画面、初期HTMLの本文、横overflow、写真の欠落と操作を確認する。
- 文書変更では参照先、コマンド、本文の矛盾、公開してはいけない情報を確認する。
- merge・公開は依頼の承認範囲に従う。Draftや「マージしない」の解除を推測しない。CI / Previewがある場合はcurrent headの結果を確認する。
- 未実行・失敗・確認不能は区別し、成功と書かない。変更内容、PR、検証結果、未確認事項、merge / 本番の状態を簡潔に報告する。
