import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader, Panel } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HQ — Ghost Hunter HQ" },
      { name: "description", content: "Report a paranormal incident to HQ via the encrypted terminal." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <SectionHeader title="CONTACT HQ" sub="Encrypted paranormal incident terminal" />
      <Panel title="◉ INCIDENT REPORT TERMINAL" subtitle="All transmissions monitored">
        {sent ? (
          <div className="text-center py-12 animate-rise">
            <div className="font-display text-3xl neon-text animate-flicker">TRANSMISSION SENT</div>
            <p className="mt-3 font-mono text-xs text-[var(--ghost)]/60">HQ has received your report. An operative will arrive within 24h.</p>
            <button onClick={() => setSent(false)} className="mt-6 neon-border rounded-md px-4 py-2 font-display text-xs text-[var(--neon)] hover:bg-[var(--neon)]/10">SEND ANOTHER</button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
            <Field label="OPERATIVE NAME">
              <input required className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--neon)]" />
            </Field>
            <Field label="ENCRYPTED EMAIL">
              <input required type="email" className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--neon)]" />
            </Field>
            <Field label="INCIDENT LOCATION" wide>
              <input required className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--neon)]" />
            </Field>
            <Field label="DESCRIPTION" wide>
              <textarea required rows={5} className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--neon)]" />
            </Field>
            <div className="sm:col-span-2">
              <button
                disabled={sending}
                className="w-full neon-border rounded-md px-4 py-3 font-display text-xs tracking-widest text-[var(--neon)] hover:bg-[var(--neon)]/10 transition animate-pulse-neon disabled:opacity-50"
              >
                {sending ? "▓▒░ TRANSMITTING ░▒▓" : "◉ SEND TRANSMISSION"}
              </button>
            </div>
          </form>
        )}
      </Panel>
    </section>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={"block " + (wide ? "sm:col-span-2" : "")}>
      <div className="font-mono text-[10px] text-[var(--neon)]/80 mb-1 tracking-widest">{label}</div>
      {children}
    </label>
  );
}
