import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const OUEN_ARCHIVE_URL = "https://ouen-archive-564c.vercel.app/";
const root = process.cwd();

const read = (relative: string) =>
  readFileSync(path.join(root, relative), "utf8");

const footer = read("src/components/Footer.tsx");

test("footer links back to the Ouen Archive portal canonical URL", () => {
  assert.ok(footer.includes(`const OUEN_ARCHIVE_URL = "${OUEN_ARCHIVE_URL}"`));
  assert.ok(footer.includes("href={OUEN_ARCHIVE_URL}"));
});

test("the link text names the portal", () => {
  assert.ok(footer.includes("応援アーカイブへ戻る"));
  assert.ok(footer.includes("5つの応援サイトをつなぐ非公式ポータル"));
});

test("the link sits inside the footer element, after the person's own links", () => {
  const linkIndex = footer.indexOf("応援アーカイブへ戻る");
  const socialIndex = footer.indexOf("socialLinks.map");
  const footerEnd = footer.indexOf("</footer>");

  assert.ok(socialIndex >= 0 && socialIndex < linkIndex);
  assert.ok(linkIndex < footerEnd);
});

test("the link opens in the same tab and is not color-only", () => {
  const linkIndex = footer.indexOf("href={OUEN_ARCHIVE_URL}");
  const anchor = footer.slice(
    footer.lastIndexOf("<a", linkIndex),
    footer.indexOf("</a>", linkIndex) + 4,
  );

  assert.ok(!anchor.includes('target="_blank"'));
  assert.ok(anchor.includes("underline"));
  assert.ok(anchor.includes("min-h-[44px]"));
});

test("existing footer content stays in place", () => {
  assert.ok(footer.includes("{profile.name}"));
  assert.ok(footer.includes("Produced by あっきー"));
  assert.ok(footer.includes("掲載情報は変更される場合があります。"));
  assert.ok(footer.includes("socialLinks.map"));
});

test("portal feed and person data are untouched", () => {
  assert.ok(!read("src/lib/portalFeed.ts").includes("ouen-archive"));
  assert.ok(!read("src/data/profile.ts").includes("ouen-archive"));
  assert.ok(!read("src/data/socialLinks.ts").includes("ouen-archive"));
});
