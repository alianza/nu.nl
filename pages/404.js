import Link from "next/link"

export default function NotFound() {
    return (
        <div className='text-center'>
            <h1 className='text-3xl'>404 Oops...</h1>
            <h2 className='text-xl'>Page not found!</h2>
            <span>Go back <b><Link href="/"><a>Home</a></Link></b>.</span>
        </div>
    )
}
