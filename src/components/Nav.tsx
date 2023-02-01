import Link from "next/link"

const Nav = () => {
  return (
    <nav className="flex gap-12 md:gap-20 px-6
     md:px-14 py-5 md:border justify-between border-slate-700 rounded-2xl md:mt-8 md:fixed w-full max-w-4xl">
      <Link className="my-auto" href="/"><h1 className="text-xl md:text-2xl font-bold">Notes app</h1></Link>
      <Link className="my-auto border rounded-md p-3 transition-colors hover:bg-transparent bg-slate-700 border-slate-800" href="/new">New Note ➕</Link>
    </nav>
  )
}

export default Nav
