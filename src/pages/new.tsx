import { useState } from "react"
import Nav from "../components/Nav"

import { api } from "../utils/api"

interface FormData {
  title: string,
  description: string
}

const INITIAL_STATE = {
  title: "",
  description: "",
}

const New = () => {
  const [formState, setFormState] = useState<FormData>(INITIAL_STATE)
  const addNewNote = api.note.newNote.useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNewNote.mutate(formState)
    setFormState(INITIAL_STATE)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Nav />
      <div className=" pt-3 md:pt-48  max-w-4xl">
        <h2 className="capitalize text-2xl font-semibold pb-8">Add new Note ✏️</h2>
        <hr className="border-slate-600" />
        <form className="flex gap-6 flex-col md:max-w-4xl w-screen p-4 pt-12" onSubmit={handleSubmit}>
          <input className="bg-transparent rounded-md border border-slate-600 px-2 py-3" type="text" name="title" value={formState.title} onChange={handleChange} placeholder="How is the note called?" required />
          <textarea className="bg-transparent rounded-md border border-slate-600 px-2 py-3" name="description" value={formState.description} onChange={handleChange} placeholder="Write the note description" required />
          <button type="submit" className="rounded-md border border-slate-600 bg-slate-700 p-5 font-bold hover:bg-transparent transition-colors">Add Note</button>
        </form>
      </div>
      <form>

      </form>
    </main>
  )
}

export default New
