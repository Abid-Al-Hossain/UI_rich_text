"use client";

import type { CSSProperties } from "react";
import type { RichTextState } from "../types";

function shell(state: RichTextState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    display: "grid",
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
  };
}

export default function LivePreview({ state }: { state: RichTextState }) {
  const isEmpty = state.previewState === "empty";
  const isFocused = state.previewState === "focus" || state.previewState === "active";
  const descriptionId = `${state.id}-description`;
  const countId = `${state.id}-count`;
  const words = Math.max(1, Math.round(state.characterCount / 6));
  const toolbarButtons = [
    ...(state.showMarks ? ["Bold", "Italic", "Link"] : []),
    ...(state.showLists ? ["Bulleted list", "Numbered list"] : []),
  ];

  return (
    <section id={state.id} aria-label={state.ariaLabel} style={shell(state)}>
      <header style={{ display: "grid", gap: 6 }}>
        <span style={{ color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{state.toolbarMode} editor</span>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p id={descriptionId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </header>

      {state.toolbarMode !== "none" && (
        <div role="toolbar" aria-label={`${state.label} formatting toolbar`} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {toolbarButtons.map((button) => (
            <button key={button} type="button" disabled={state.disabled} aria-pressed={button === "Bold" || button === "Bulleted list"} style={{ border: `1px solid ${state.border}`, borderRadius: 999, background: button === "Bold" ? state.accent : "transparent", color: button === "Bold" ? state.background : state.foreground, padding: "7px 11px", fontSize: 12, fontWeight: 700 }}>
              {button}
            </button>
          ))}
        </div>
      )}

      <div
        role="textbox"
        aria-label={state.ariaLabel}
        aria-describedby={`${descriptionId} ${countId}`}
        aria-multiline="true"
        contentEditable={!state.disabled}
        suppressContentEditableWarning
        tabIndex={state.disabled ? -1 : state.tabIndex}
        data-placeholder={state.placeholder}
        style={{ minHeight: Math.max(130, state.height - 150), border: `${Math.max(1, state.borderWidth)}px solid ${isFocused ? state.accent : state.border}`, borderRadius: Math.max(12, state.radius - 8), background: "rgba(255,255,255,.06)", outline: isFocused ? `3px solid ${state.accent}33` : "none", padding: Math.max(14, Math.round(state.padding * 0.7)), color: state.foreground, fontSize: state.bodySize, lineHeight: 1.7 }}
      >
        {isEmpty ? (
          <span style={{ color: state.muted }}>{state.placeholder}</span>
        ) : (
          <>
            <p style={{ margin: "0 0 10px" }}><strong>{state.label}</strong> starts with a {state.blockType} block and keeps editing affordances visible.</p>
            {state.showMarks && <p style={{ margin: "0 0 10px" }}>Formatting preview: <strong>bold</strong>, <em>italic</em>, and <a href="#" style={{ color: state.accent }}>inline link</a>.</p>}
            {state.showLists && <ul style={{ margin: 0, paddingLeft: 22 }}><li>Semantic list content</li><li>Keyboard-editable surface</li></ul>}
          </>
        )}
      </div>

      <footer style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, color: state.muted, fontSize: 12 }}>
        <span>{state.helper}</span>
        <span id={countId} aria-live="polite">{state.characterCount} characters / {words} words</span>
      </footer>
    </section>
  );
}
