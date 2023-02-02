import React from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { api } from '../utils/api'
import Loading from '../components/Loading'

const Note = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data: note, isLoading } = api.note.getNote.useQuery({ id })
  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white'>
      <Nav />
      <div className='max-w-4xl w-full pt-3 md:pt-48'>
        {isLoading ? <div className='flex justify-center'><Loading /></div> :
          <div className='flex flex-col text-left gap-14 px-3'>
            <h1 className='text-3xl font-bold text-left md:pl-12'>{note?.title}</h1>
            <hr className='border-slate-500' />
            <p className=''>{note?.description}</p>
          </div>
        }
      </div>
    </div >
  )
}

export default Note
