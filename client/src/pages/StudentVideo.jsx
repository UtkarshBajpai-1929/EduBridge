import React, { useEffect, useMemo, useState } from 'react'
import Video from '../components/Video'
import { useDispatch, useSelector } from 'react-redux'
import { Search, Video as VideoIcon } from 'lucide-react'
import Loader from '../components/Loader'
import { getStudentVideos } from '../features/videoSlice'

const StudentVideo = () => {
  const [search, setSearch] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { video, loading, error } = useSelector(state => state.video)

  useEffect(() => {
    if (user?.className) {
      dispatch(getStudentVideos(user.className))
    }
  }, [dispatch, user?.className])

  const topics = useMemo(() => {
    return [...new Set(video?.map(v => v.topic).filter(Boolean))]
  }, [video])

  const filteredVideos = useMemo(() => {
    return video?.filter(v => {
      const query = search.toLowerCase()
      const matchesSearch =
        v.title?.toLowerCase().includes(query) ||
        v.description?.toLowerCase().includes(query) ||
        v.topic?.toLowerCase().includes(query) ||
        v.teacher?.name?.toLowerCase().includes(query)
      const matchesTopic = selectedTopic ? v.topic === selectedTopic : true

      return matchesSearch && matchesTopic
    })
  }, [search, selectedTopic, video])

  if(loading){
    return <Loader/>
  }

  return (
    <div className='flex min-h-dvh flex-col gap-4 px-4 pb-8 bg-gray-100'>
      <div>
        <h1 className='text-3xl font-bold'>Class Videos</h1>
        <p className='text-gray-500'>Watch lectures uploaded for Grade {user?.className}.</p>
      </div>

      <div className='flex flex-col gap-3 rounded bg-white p-3 shadow-sm sm:flex-row'>
        <div className='flex flex-1 items-center gap-2 rounded bg-gray-100 p-2'>
          <Search size={18} className='text-gray-500' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full bg-transparent outline-none'
            type='text'
            placeholder='Search videos'
          />
        </div>

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className='rounded border border-gray-200 bg-white px-3 py-2 outline-none'
        >
          <option value="">All Topics</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      {error && <p className='rounded bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</p>}

      {filteredVideos?.length ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredVideos.map(v => (
            <Video
              key={v._id}
              title={v.title}
              description={v.description}
              topic={v.topic}
              teacher={v.teacher?.name}
              className={v.class}
              videoUrl={v.videoUrl}
            />
          ))}
        </div>
      ) : (
        <div className='flex min-h-64 flex-col items-center justify-center rounded bg-white p-8 text-center shadow-sm'>
          <VideoIcon size={46} className='text-gray-400' />
          <h2 className='mt-4 text-xl font-semibold'>No videos available</h2>
          <p className='mt-1 text-gray-500'>New lecture videos for your class will appear here.</p>
        </div>
      )}
    </div>
  )
}

export default StudentVideo
