type Blob = {
  className: string
}

const defaultBlobs: Blob[] = [
  { className: 'right-[-10%] top-[-20%] h-[34rem] w-[34rem] bg-bleu/20 animate-blob' },
  { className: 'left-[-10%] top-[20%] h-[28rem] w-[28rem] bg-mauve/20 animate-blob-slow' },
]

export default function MeshBlobs({
  blobs = defaultBlobs,
  blur = 120,
}: {
  blobs?: Blob[]
  blur?: number
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full motion-reduce:animate-none ${b.className}`}
          style={{ filter: `blur(${blur}px)` }}
        />
      ))}
    </div>
  )
}
