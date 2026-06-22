import Reveal from '@/components/motion/Reveal'

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-30%] h-80 w-80 rounded-full bg-bleu/15 blur-[110px]" />
        <div className="absolute left-[-8%] top-[10%] h-72 w-72 rounded-full bg-mauve/15 blur-[110px]" />
      </div>
      <div className="container-page py-14 md:py-20">
        <Reveal>
          {eyebrow && (
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-marine sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-marine/65">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
