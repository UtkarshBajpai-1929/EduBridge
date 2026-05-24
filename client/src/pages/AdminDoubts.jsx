import React, { useEffect, useMemo, useState } from 'react'
import { Image, Search, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDoubts } from '../features/schoolSlice'
import { deleteDoubt } from '../features/doubtSlice'
import Loader from '../components/Loader'

const AdminDoubts = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()
  const { doubts, loading, error } = useSelector(state => state.school)

  useEffect(() => {
    dispatch(getAllDoubts())
  }, [dispatch])

  const filteredDoubts = useMemo(() => {
    return doubts?.filter(d => {
      const query = search.toLowerCase()
      const matchesSearch =
        d.title?.toLowerCase().includes(query) ||
        d.questionText?.toLowerCase().includes(query) ||
        d.student?.name?.toLowerCase().includes(query) ||
        d.subject?.name?.toLowerCase().includes(query) ||
        d.teacherId?.name?.toLowerCase().includes(query)
      const matchesStatus = status === "all" ? true : d.status === status

      return matchesSearch && matchesStatus
    })
  }, [doubts, search, status])

  const openCount = doubts?.filter(d => d.status === "open").length || 0
  const resolvedCount = doubts?.filter(d => d.status !== "open").length || 0

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doubt?")) return
    await dispatch(deleteDoubt(id))
    dispatch(getAllDoubts())
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='flex min-h-dvh flex-col gap-4 bg-gray-100 px-4 pb-8'>
      <div>
        <h1 className='text-3xl font-bold'>All Doubts</h1>
        <p className='text-gray-500'>Monitor student questions and teacher responses across the school.</p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='rounded bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Total Doubts</p>
          <p className='mt-1 text-2xl font-semibold'>{doubts?.length || 0}</p>
        </div>
        <div className='rounded bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Pending</p>
          <p className='mt-1 text-2xl font-semibold text-red-700'>{openCount}</p>
        </div>
        <div className='rounded bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Answered</p>
          <p className='mt-1 text-2xl font-semibold text-emerald-700'>{resolvedCount}</p>
        </div>
      </div>

      <div className='flex flex-col gap-3 rounded bg-white p-3 shadow-sm sm:flex-row'>
        <div className='flex flex-1 items-center gap-2 rounded bg-gray-100 p-2'>
          <Search size={18} className='text-gray-500' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full bg-transparent outline-none'
            type='text'
            placeholder='Search doubts by student, teacher, subject, or text'
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='rounded border border-gray-200 bg-white px-3 py-2 outline-none'
        >
          <option value="all">All Statuses</option>
          <option value="open">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {error && <p className='rounded bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</p>}

      <div className='flex flex-col gap-4'>
        {filteredDoubts?.length ? filteredDoubts.map(d => (
          <div key={d._id} className='rounded bg-white p-4 shadow-sm'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
              <div>
                <h2 className='text-lg font-semibold'>{d.title || "Untitled Doubt"}</h2>
                <div className='mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600'>
                  <span>{d.student?.name || "Student"}</span>
                  {d.student?.className && <span className='rounded bg-gray-100 px-2 py-1'>Grade {d.student.className}</span>}
                  {d.subject?.name && <span className='rounded border border-gray-200 px-2 py-1'>{d.subject.name}</span>}
                  {d.teacherId?.name && <span>Assigned to {d.teacherId.name}</span>}
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className={`rounded px-3 py-1 text-sm font-medium ${d.status === "open" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                  {d.status === "open" ? "Pending" : "Resolved"}
                </span>
                <button
                  onClick={() => handleDelete(d._id)}
                  className='rounded p-2 text-red-600 hover:bg-red-50'
                  aria-label='Delete doubt'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {d.questionText && <p className='mt-4 text-gray-700'>{d.questionText}</p>}

            {d.image && (
              <button
                onClick={() => setSelectedImage(d.image)}
                className='mt-4 inline-flex items-center gap-2 rounded border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'
              >
                <Image size={16} />
                View attached image
              </button>
            )}
          </div>
        )) : (
          <div className='rounded bg-white p-8 text-center text-gray-500 shadow-sm'>
            No doubts found.
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt='Doubt attachment'
            className='max-h-[85vh] max-w-[90vw] rounded bg-white object-contain shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default AdminDoubts
