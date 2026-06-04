"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import type { RichTextState } from "../types";

type Props = { state: RichTextState; update: <K extends keyof RichTextState>(key: K, value: RichTextState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native richtext generation."><Input label="Placeholder" value={state.placeholder} onChange={(value) => update("placeholder", value)} /></SectionCard>;
}
