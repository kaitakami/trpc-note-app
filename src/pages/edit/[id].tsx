import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loading from "../../components/Loading"
import Nav from "../../components/Nav"

import { api } from "../../utils/api"
import { redirect } from "next/dist/server/api-utils"

interface FormData {
  id: string,
  title: string,
  description: string
}

const INITIAL_STATE = {
  id: "",
  title: "",
  description: "",
}

const Edit = () => {
  const [formState, setFormState] = useState<FormData>(INITIAL_STATE)
  const editNote = api.note.editNote.useMutation()
  const router = useRouter()
  const id = router.query.id as string
  const { data: note, isLoading } = api.note.getNote.useQuery({ id })

  useEffect(() => {
    if (note?.title && note?.description) {
      setFormState({
        id: note.id,
        title: note.title,
        description: note.description
      })
    }
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      editNote.mutate(formState)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({
        pathname: '/post/[pid]',
      })

      setFormState(INITIAL_STATE)
    }
    catch (err) {
      console.log(err)
    }
  }

  if (isLoading) return <Loading />

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Nav />
      <div className=" pt-3 md:pt-48  max-w-4xl">
        <h2 className="capitalize text-2xl font-semibold pb-8">Edit Note ✏️</h2>
        <hr className="border-slate-600" />
        {isLoading ? <div className="flex justify-center"><Loading /></div> :
          <form className="flex gap-6 flex-col md:max-w-4xl w-screen p-4 pt-12" onSubmit={handleSubmit}>
            <input className="bg-transparent rounded-md border border-slate-600 px-2 py-3" type="text" name="title" value={formState.title} onChange={handleChange} placeholder="Change the title" required />
            <textarea className="bg-transparent rounded-md border border-slate-600 px-2 py-3" name="description" value={formState.description} onChange={handleChange} placeholder="Change the note's content" required />
            <button type="submit" className="rounded-md border border-slate-600 bg-slate-700 p-5 font-bold hover:bg-transparent transition-colors">Add Note</button>
          </form>
        }
      </div>
    </main>
  )
}

export default Edit
