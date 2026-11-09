import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeScript from '@/components/ThemeScript'
import Noise from '@/components/motion/Noise'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="site-shell" className="flex min-h-screen flex-col bg-creme text-marine">
      <ThemeScript />
      <Noise />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
