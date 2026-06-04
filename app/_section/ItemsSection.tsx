"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { RichTextState } from "../types";

type Props = { state: RichTextState; update: <K extends keyof RichTextState>(key: K, value: RichTextState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native richtext generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
