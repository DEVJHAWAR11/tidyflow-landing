import type { ReactNode } from 'react'
import { DuplicateDemo } from './features/DuplicateDemo'
import { LayoutDemo } from './features/LayoutDemo'
import { OcrDemo } from './features/OcrDemo'
import { SafeCopyDemo } from './features/SafeCopyDemo'
import { TriageDemo } from './features/TriageDemo'
import { Accent, Container, Figure, Reveal, SectionHeading } from './ui'

const FEATURES: { title: string; body: ReactNode; note?: ReactNode; demo: ReactNode }[] = [
  {
    title: 'Organization Architect',
    body: 'Describe the categories you want in plain English and the Architect proposes a folder structure. Ask for changes until it looks right, then approve it to start organizing.',
    note: 'Or start from the built-in 18-folder taxonomy.',
    demo: <LayoutDemo />,
  },
  {
    title: 'Duplicate detection',
    body: 'Byte-identical copies are caught by SHA-256. Photos that were resized, re-encoded or lightly edited are caught by a perceptual hash, within a distance you choose.',
    note: <code>duplicates.hamming_distance_threshold: 8</code>,
    demo: <DuplicateDemo />,
  },
  {
    title: 'OCR, then redaction',
    body: 'TidyFlow reads text from PDFs, Word, Excel and PowerPoint files, and images. OCR runs on your machine: Apple Vision on macOS, PaddleOCR on Windows and Linux. Before any text is sent to the language model, anything that looks like an API key, token, password or private key is replaced with [REDACTED].',
    demo: <OcrDemo />,
  },
  {
    title: 'Quick Triage',
    body: 'Files nothing could place wait in a queue you clear one card at a time. Each card shows the file and the model’s reason; a number key files it, Space skips it.',
    demo: <TriageDemo />,
  },
  {
    title: 'Copy, then verify',
    body: 'Applying a plan copies each file into its new folder and checks the copy’s SHA-256 against the original. If a name is already taken, a short hash is added instead of overwriting anything.',
    demo: <SafeCopyDemo />,
  },
]

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow={{ n: '03', label: 'Features' }}
          title={
            <>
              What it does to a <Accent>messy folder.</Accent>
            </>
          }
          description="Each of these runs here in your browser on sample files, so you can try it before installing anything."
        />

        <ol className="mt-14">
          {FEATURES.map((f, i) => (
            <li key={f.title} className="border-t border-white/[0.1] py-12 first:border-t-0 first:pt-0 sm:py-16">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                <Reveal className="lg:pt-2">
                  <p className="mono-label flex items-center gap-2 text-[0.7rem] text-mist-dim">
                    <span aria-hidden="true" className="text-[var(--h-accent)]">
                      +
                    </span>
                    03.{i + 1}
                  </p>
                  <h3 className="display mt-3 text-[2.1rem] leading-none tracking-[-0.015em] sm:text-[2.6rem]">{f.title}</h3>
                  <p className="mt-4 leading-relaxed text-pretty text-mist">{f.body}</p>
                  {f.note && <p className="mt-4 font-mono text-xs text-mist-dim">{f.note}</p>}
                </Reveal>
                <Reveal delay={100} className="min-w-0">
                  <Figure caption={`Fig. 03.${i + 1} — try it here`}>
                    <div className="rounded-md border border-white/[0.1] bg-night-raised p-4 shadow-[0_24px_60px_-40px_rgb(0_0_0/0.5)] sm:p-5">
                      {f.demo}
                    </div>
                  </Figure>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
