import type { Clip } from "../types";

// 新しいものを配列の先頭に追加する。
// poster には動画1フレーム目の画像(/images/clips/xxx.jpg)を自己ホストして指定する
// (例: ffmpeg -i public/videos/xxx.mp4 -vframes 1 -q:v 3 public/images/clips/xxx.jpg)。
export const clips: Clip[] = [];
