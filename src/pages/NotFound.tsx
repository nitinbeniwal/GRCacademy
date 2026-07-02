import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <div className="text-6xl">🧭</div>
      <h1 className="mt-4 text-2xl font-bold">Lost in the compliance maze</h1>
      <p className="mt-2 text-cslate">That page doesn&apos;t exist.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to safety
      </Link>
    </div>
  )
}
