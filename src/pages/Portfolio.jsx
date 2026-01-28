import Gallery from '../components/Gallery'

export default function Portfolio() {
  return (
    <div className="page-transition pb-4">
      <header className="pt-20 pb-8 px-6">
        <p className="text-gray-400 text-sm tracking-wide uppercase mb-2">Галерея</p>
        <h1 className="text-3xl font-light">Портфолио</h1>
      </header>
      <Gallery />
    </div>
  )
}
