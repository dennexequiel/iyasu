import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-500">
      <div className="text-center">
        <h1 className="text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight font-bold text-white mb-6">Page Not Found</h1>
        <p className="text-base mb-6 font-poppins text-justify text-white">Sorry, we couldn’t find the page you’re looking for.</p>
        <Link href="/">
          <button className="uppercase bg-white text-teal-500 font-bold border border-white hover:bg-teal-600 hover:text-white px-6 py-2 rounded-full transition duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  )
}
