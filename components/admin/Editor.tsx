'use client'

import { useEditor, EditorContent, type Editor as TipTapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import ImageExt from '@tiptap/extension-image'

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-2 py-1 text-sm font-medium ${
        active ? 'bg-marine text-creme' : 'text-marine hover:bg-creme'
      }`}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: TipTapEditor }) {
  async function addImage() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const body = new FormData()
      body.append('file', file)
      body.append('bucket', 'articles')
      const res = await fetch('/api/upload', { method: 'POST', body })
      if (!res.ok) return
      const data = await res.json()
      editor.chain().focus().setImage({ src: data.url }).run()
    }
    input.click()
  }

  function addLink() {
    const url = window.prompt('URL du lien')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-1 border-b border-marine/10 bg-white p-2">
      <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        Gras
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italique
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Liste
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        Liste num.
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        Citation
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('link')} onClick={addLink}>
        Lien
      </ToolbarButton>
      <ToolbarButton onClick={addImage}>Image</ToolbarButton>
    </div>
  )
}

export default function Editor({
  value,
  onChange,
}: {
  value: string
  onChange: (html: string) => void
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      ImageExt,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'richtext min-h-[300px] px-4 py-3 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) {
    return (
      <div className="rounded-md border border-marine/20 bg-white p-4 text-sm text-marine/50">
        Chargement de l'éditeur…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border border-marine/20">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
