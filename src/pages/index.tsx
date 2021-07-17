import Link from 'next/link'
export default function Home() {
  const envURL = process.env.BACKEND_URL
  return (
    <div>
      Hello World.
      <Link href="/about" as={envURL + '/about'}>
        <a>About</a>
      </Link>
    </div>
  )
}
