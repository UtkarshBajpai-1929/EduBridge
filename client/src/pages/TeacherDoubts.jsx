import { Search, Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherDoubts } from '../features/doubtSlice'
import ResponseModal from '../components/Response'

const TeacherDoubts = () => {
 const [value, setValue] = useState("All")
  const [selectedImage, setSelectedImage] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [openModel, setOpenModel] = useState(false);
  const [doubtID, setDoubtID] = useState(null);
  const { subjects } = useSelector(state => state.subject)
  const { doubts } = useSelector(state => state.doubt)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTeacherDoubts())
  }, [dispatch])
  const filteredDoubts = useMemo(() => {
    return doubts?.filter(d => {
      const matchesSearch =
        d.title?.toLowerCase().includes(search.toLowerCase()) ||
        d.questionText?.toLowerCase().includes(search.toLowerCase()) ||
        d.student?.name?.toLowerCase().includes(search.toLowerCase())

      const matchesSubject = selectedSubject ? d.subject?._id === selectedSubject : true

      const matchesStatus =
        value === "All"
          ? true
          : value === "Pending"
          ? d.status === "open"
          : d.status !== "open"

      return matchesSearch && matchesSubject && matchesStatus
    })
  }, [doubts, search, selectedSubject, value])

  const pendingCount = doubts?.filter(d => d.status === "open").length || 0
  const answeredCount = doubts?.filter(d => d.status !== "open").length || 0

  return (
    <div className='px-4 pb-8 min-h-dvh flex flex-col gap-4 bg-gray-100 relative'>
      <h1 className='text-2xl font-bold'>Student Doubts</h1>
      <p className='text-gray-400'>View students doubts and responses</p>

      <div className='px-4 w-full flex justify-start gap-6 items-center shadow-sm rounded py-4 bg-white'>
        <div className='w-full flex items-center gap-2 bg-gray-200 p-2 rounded'>
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-transparent outline-none'
            type='text'
            placeholder='Search doubts'
          />
        </div>
      </div>

      <div className='flex bg-white py-4 shadow-sm justify-evenly rounded'>
        <button
          className={`px-4 py-1 rounded-xl ${value === "All" ? "bg-gray-300" : "bg-white"}`}
          onClick={() => setValue("All")}
        >
          All ({doubts?.length || 0})
        </button>

        <button
          className={`px-4 py-1 rounded-xl ${value === "Pending" ? "bg-gray-300" : "bg-white"}`}
          onClick={() => setValue("Pending")}
        >
          Pending ({pendingCount})
        </button>

        <button
          className={`px-4 py-1 rounded-xl ${value === "Answered" ? "bg-gray-300" : "bg-white"}`}
          onClick={() => setValue("Answered")}
        >
          Answered ({answeredCount})
        </button>
      </div>

      <div className='flex flex-col gap-4'>
        {
          filteredDoubts?.map((d) => {
            const imageSrc = d?.image 

            return (
              <div key={d._id} className='flex flex-col px-4 py-4 shadow-sm rounded bg-white'>
                <div className='flex justify-between'>
                <h3 className='font-semibold text-lg'>{d.title}</h3>
                </div>
                <div className='flex items-center gap-3'>
                  <p className='text-gray-600'>{d.student?.name}</p>
                  <button className='bg-gray-300 px-3 rounded text-sm font-semibold'>
                    {`Grade ${d.student?.className}`}
                  </button>
                  <button className='border border-gray-300 px-3 rounded text-sm'>
                    {d.subject?.name}
                  </button>
                </div>

                <div className='mt-3'>
                  <p className='text-gray-600'>{d.questionText}</p>
                </div>

                <div className='mt-3'>
                  <img
                    src={imageSrc}
                    onClick={() => setSelectedImage(imageSrc)}
                    className='h-24 rounded cursor-pointer hover:opacity-80'
                    alt="doubt"
                  />
                </div>

                <div className='flex gap-4 mt-4'>
                  {
                    d.status === "open" ? (
                      <button className='bg-red-700 text-white px-4 py-1 rounded'>
                        Pending
                      </button>
                    ) : (
                      <button className='bg-emerald-700 text-white px-4 py-1 rounded'>
                        Responded
                      </button>
                    )
                  }

                  <button
                  onClick={()=>{
                  setOpenModel(true)
                  setDoubtID(d._id)
                  }}
                  className={`${
                    d.status === "resolved" ? "hidden" : "border border-gray-600 rounded px-4 py-1 hover:bg-gray-100"
                  }`}>
                    Respond
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>

      {
        selectedImage && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-h-[80%] max-w-[90%] rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
              alt="preview"
            />
          </div>
        )
      }


      <ResponseModal 
      doubtId={doubtID}
      isOpen={openModel}
      onClose={()=>setOpenModel(false)}
      />

    </div>
  )
}

export default TeacherDoubts
