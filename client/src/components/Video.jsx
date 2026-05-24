import React, { useState } from 'react'
import thumbnail from '../assets/thumb_3.png'
import { Play, Trash2, X } from "lucide-react";
import {useSelector} from 'react-redux'
const Video = ({ title, topic, description, teacher, className, videoUrl, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const {user} = useSelector(state=>state.auth);
  return (
    <>
  <div className="rounded bg-white shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
      
      <div className="relative h-56 overflow-hidden">
        <img
          src={thumbnail}
          alt="video thumbnail"
          className="w-full h-full object-cover"
        />

        <span className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
          Grade {className}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(true)}
            className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
            aria-label={`Play ${title}`}
          >
            <Play className="text-slate-800 fill-slate-800 ml-1" size={32} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-800 text-sm font-medium">
            Video
          </span>

          <span className="px-4 py-1 rounded-full border border-slate-200 text-slate-700 text-sm">
            {topic}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 leading-tight mb-3">
          {title}
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <p className="font-medium text-slate-800">
            {teacher || "Teacher"}
          </p>

          <div>
            {
              user?.role === "teacher" || user?.role === "admin" ? (
                <button
                  onClick={onDelete}
                  className='inline-flex items-center gap-2 bg-red-50 px-3 py-2 text-red-700 rounded hover:bg-red-100'
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>

    {isPlaying && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={() => setIsPlaying(false)}
      >
        <div className="w-full max-w-4xl overflow-hidden rounded bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between bg-white px-4 py-3">
            <div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500">{topic}</p>
            </div>
            <button
              onClick={() => setIsPlaying(false)}
              className="rounded p-2 hover:bg-gray-100"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>
          <video
            src={videoUrl}
            controls
            autoPlay
            className="max-h-[75vh] w-full bg-black"
          />
        </div>
      </div>
    )}
    </>
  )
}

export default Video
