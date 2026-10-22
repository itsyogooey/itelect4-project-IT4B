// src/pages/AiHelperPage.tsx -- a NEW page for GT5
// The student types a quick, messy description of an item; our API asks
// Gemini for a clean report draft and checks it before sending it here.
import type { CSSProperties } from "react";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiItemDraft } from "../types/index";
import { askAi } from "../api/client";
import { aiDraftFormSchema, type AiDraftFormValues } from "@/schemas/aiDraftSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Record: one entry for every value clarity can have. Add a fourth value
// to AiItemDraft and this object stops compiling until it has a colour.
// (Inline styles: this project's CSS does not generate Tailwind colours.)
const CLARITY_STYLE: Record<AiItemDraft["clarity"], CSSProperties> = {
  "clear": { background: "#dcfce7", color: "#166534" },
  "needs-details": { background: "#fef9c3", color: "#854d0e" },
  "too-vague": { background: "#fee2e2", color: "#991b1b" },
};

const BADGE: CSSProperties = {
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 6,
  fontSize: "0.85rem",
  fontWeight: 700,
};

const CATEGORY_LABEL: Record<AiItemDraft["category"], string> = {
  "electronics": "Electronics",
  "wallet-or-id": "Wallet or ID",
  "bag": "Bag",
  "accessory": "Accessory",
  "clothing": "Clothing",
  "other": "Other",
};

function AiHelperPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiDraftFormValues>({
    resolver: zodResolver(aiDraftFormSchema),
    // No mode: "onBlur" -- the error sits right above the button, and
    // validating on blur moves the button between press and release.
    defaultValues: { prompt: "" },
  });

  // A mutation, not a query: it runs only when the button is pressed, and
  // asking twice is two requests -- two answers that may differ, and two
  // spent from the quota. Nothing to cache.
  const draft = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: AiDraftFormValues): void => {
    draft.mutate(values.prompt);
  };

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Campus lost & found / AI helper</p>
      <h2 className="page-title">AI Report Helper</h2>
      <p className="page-intro">
        Describe what you lost or found in your own words. The AI turns it into a clean report draft and tells you
        what to add. It is a suggestion -- check it before you use it.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "grid", gap: 16, maxWidth: 720, marginTop: 32 }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="prompt">Your description</Label>
          <textarea
            id="prompt"
            rows={6}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="e.g. lost my black wallet w/ cherry keychain near MB 3rd flr yesterday around 3pm"
            className="item-form-control item-form-description"
            {...register("prompt")}
          />
          {errors.prompt && (
            <p role="alert" style={{ color: "#dc2626", fontSize: "0.85rem", fontWeight: 600 }}>{errors.prompt.message}</p>
          )}
        </div>

        <Button type="submit" disabled={draft.isPending} style={{ justifySelf: "start", padding: "12px 20px" }}>
          {draft.isPending ? "Drafting..." : "Draft my report"}
        </Button>
      </form>

      {/* The API's own sentence: the rate limit, the quota, or a refusal --
          never Google's raw error text. */}
      {draft.isError && (
        <p role="alert" style={{ marginTop: 16, color: "#b91c1c", fontWeight: 600 }}>{draft.error.message}</p>
      )}

      {/* Every field of the reply is on the screen. React puts the text in
          as text, never as HTML, so a strange reply cannot run anything. */}
      {draft.data && (
        <section
          className="project-card"
          style={{ display: "grid", gap: 14, maxWidth: 720, marginTop: 32, padding: 24 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span style={{ ...BADGE, ...CLARITY_STYLE[draft.data.clarity] }}>
              Clarity: {draft.data.clarity}
            </span>
            <span style={{ ...BADGE, background: "#e2e8f0", color: "#334155" }}>
              Category: {CATEGORY_LABEL[draft.data.category]}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{draft.data.title}</h3>
          <p className="text-slate-700 dark:text-slate-300">{draft.data.summary}</p>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Next steps</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
              {draft.data.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-slate-500">
            Happy with it? <Link to="/projects" className="font-semibold text-blue-600">Report the item</Link> using
            this title.
          </p>
        </section>
      )}
    </main>
  );
}

export default AiHelperPage;
