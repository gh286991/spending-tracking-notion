import Link from 'next/link'
export default function About() {
  const envURL = process.env.BACKEND_URL
  return (
    <div>
      <div>About us</div>
      <div>
        Back to{' '}
        <Link href="/" as={envURL+ '/'}>
          <a>Home</a>
        </Link>
      </div>
    </div>
  )
}
