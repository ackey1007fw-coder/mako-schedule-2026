import { Clapperboard, Handshake, Newspaper, PartyPopper, Sparkles, Star } from "lucide-react";
import type { EventCategory } from "../types";

export const categoryMeta: Record<
  EventCategory,
  { label: string; tone: string; Icon: typeof Clapperboard }
> = {
  stage: {
    label: "舞台",
    tone: "border-mako-secondary/40 bg-[#e6f7f7] text-[#00757a]",
    Icon: Clapperboard,
  },
  event: {
    label: "イベント",
    tone: "border-mako-primary/40 bg-[#ffe9ee] text-[#c23f5e]",
    Icon: PartyPopper,
  },
  media: {
    label: "メディア",
    tone: "border-mako-sunset/50 bg-[#fff2df] text-[#8a5a12]",
    Icon: Newspaper,
  },
  web: {
    label: "WEB",
    tone: "border-mako-secondary/40 bg-[#e6f7f7] text-[#00757a]",
    Icon: Sparkles,
  },
  birthday: {
    label: "特別",
    tone: "border-mako-sunset/50 bg-[#fff2df] text-[#8a5a12]",
    Icon: Star,
  },
  collab: {
    label: "コラボ",
    tone: "border-mako-primary/40 bg-[#ffe9ee] text-[#c23f5e]",
    Icon: Handshake,
  },
};
