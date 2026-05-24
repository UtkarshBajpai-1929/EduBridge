import React, { useEffect, useMemo, useState } from 'react'
import Video from '../components/Video'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Plus, Search, Video as VideoIcon } from 'lucide-react'
import UploadVideoModal from '../components/uploadVideoModal'
import { deleteVideo, getTeacherVideos } from '../features/videoSlice'
const TeacherVideos = () => {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const {video, loading, error} = useSelector(state=>state.video)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTeacherVideos());
  },[dispatch])

  const filteredVideos = useMemo(() => {
    return video?.filter(v => {
      const query = search.toLowerCase()
      return (
        v.title?.toLowerCase().includes(query) ||
        v.description?.toLowerCase().includes(query) ||
        v.topic?.toLowerCase().includes(query) ||
        v.class?.toLowerCase().includes(query)
      )
    })
  }, [search, video])

  if(loading){
    return <Loader/>
  }

  return (
    <div className='flex min-h-dvh flex-col gap-4 px-4 pb-8 bg-gray-100'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
        <h1 className='font-bold text-3xl'>Manage Videos</h1>
        <p className='text-gray-500'>
          Manage and view your uploaded videos here.
        </p>
      </div>
        <button
          onClick={() => setIsOpen(true)}
          className='inline-flex items-center justify-center gap-2 rounded bg-black px-4 py-3 font-medium text-white hover:bg-gray-800'
        >
          <Plus size={18} />
          Upload Video
        </button>
      </div>

      <div className='flex items-center gap-2 rounded bg-white p-3 shadow-sm'>
        <Search size={18} className='text-gray-500' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full bg-transparent outline-none'
          type='text'
          placeholder='Search by title, topic, class, or description'
        />
      </div>

      {error && <p className='rounded bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</p>}

      {filteredVideos?.length ? (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {
          filteredVideos.map(v=>(
            <Video
            key={v._id}
            title={v.title}
            description={v.description}
            topic={v.topic}
            teacher={v.teacher?.name}
            className={v.class}
            videoUrl={v.videoUrl}
            onDelete={() => dispatch(deleteVideo(v._id))}
            />
          ))
        }
      </div>
      ) : (
        <div className='flex min-h-64 flex-col items-center justify-center rounded bg-white p-8 text-center shadow-sm'>
          <VideoIcon size={46} className='text-gray-400' />
          <h2 className='mt-4 text-xl font-semibold'>No videos found</h2>
          <p className='mt-1 text-gray-500'>Upload a lecture video to make it available for your class.</p>
        </div>
      )}
      <UploadVideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default TeacherVideos
