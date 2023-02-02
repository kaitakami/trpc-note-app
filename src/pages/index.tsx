import { useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { api } from "../utils/api";


const Home: NextPage = () => {
  const utils = api.useContext();

  const { data: allNotes, isLoading } = api.note.allNotes.useQuery()

  const deleteNote = api.note.deleteNote.useMutation({
    onSettled: async () => {
      await utils.note.allNotes.invalidate()
    }
  })

  const handleDelete = (id: string) => {
    deleteNote.mutate({ id })
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Nav />
        <div className=" md:max-w-4xl w-full pt-3 md:pt-48">
          <hr className="border-slate-600" />
          <div className="flex gap-3 md:gap-8 flex-col w-full text-left items-center p-2">
            <h2 className="p-8 font-bold">Todo List</h2>
            {isLoading && <Loading />}
            {!isLoading && !allNotes?.length && <div className="bg-gray-800 p-3 text-center rounded-md">Start by creating a note!</div>}
            {allNotes?.map(note => (
              <div key={note.id} className="border rounded-md border-slate-500 w-full" >
                <Link href={note.id}>
                  <h3 className="p-4">{note.title}</h3>
                  <p className="px-4 truncate  text-slate-300">{note.description}</p>
                </Link>
                <div className="p-4 flex gap-3 justify-end w-full">
                  <Link href={`/edit/${note.id}`} className="p-1 rounded-md text-slate-400">
                    Edit
                  </Link>
                  <button className="z-10 p-1 rounded-md text-red-300" onClick={() => handleDelete(note.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
