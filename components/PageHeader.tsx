import Reveal from '@/components/motion/Reveal'
import MeshBlobs from '@/components/motion/MeshBlobs'

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
      <MeshBlobs
        blobs={[
          { className: 'right-[-10%] top-[-30%] h-80 w-80 bg-bleu/15 animate-blob' },
          { className: 'left-[-8%] top-[10%] h-72 w-72 bg-mauve/15 animate-blob-slow' },
        ]}
        blur={110}
      />
      <div className="container-page py-14 md:py-20">
        <Reveal>
          {eyebrow && (
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-marine sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-marine/65 md:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
