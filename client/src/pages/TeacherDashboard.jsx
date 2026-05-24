import React, { useEffect, useState } from "react";

import { Video, CheckCircle, Clock, Eye, Upload } from "lucide-react";
import StatCard from "../components/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDoubts } from "../features/doubtSlice";
import Doubt from "../components/Doubt";
import UploadVideoModal from "../components/uploadVideoModal";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {doubts} = useSelector(state => state.doubt)
  const {user} = useSelector(state=>state.auth);
  const {loading} = useSelector(state=> state.video);
  useEffect(()=>{
    dispatch(getTeacherDoubts())
  },[dispatch]);
  let pendingDoubts = 0;
  if(doubts){
     pendingDoubts = doubts.filter((d)=> d.status === "open");
  }
  if(loading){
    return<Loader/>
  }
  return (
      <>
      {/* Header */}
      <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back<span className="text-blue-600">,</span> {user?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your teaching today
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90"
        onClick={()=>{
          setIsOpen(true);
        }}
        >
          <Upload size={18} />
          Upload Video
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <StatCard
          title="Videos Uploaded"
          value="0"
          icon={<Video size={22} />}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
          bg="bg-white"
        />

        <StatCard
          title="Doubts Answered"
          value={doubts?.length - pendingDoubts?.length}
          icon={<CheckCircle size={22} />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
           bg="bg-white"
        />

        <StatCard
          title="Pending Doubts"
          value={pendingDoubts?.length}
          icon={<Clock size={22} />}
          bgColor="bg-orange-100"
          bg="bg-white"
          iconColor="text-orange-600"
        />

        <StatCard
          title="Total Views"
          value="0"
           bg="bg-white"
          icon={<Eye size={22} />}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
    </div>

{/*Doubts...........................................................*/}
      <div className="bg-white shadow-md w-full rounded p-4">
        <div>
        <h3 className="text-lg font-semibold">Recent Doubts</h3>
        <p className="text-gray-500">Latest questions from students</p>
        </div>
        <div>
        {
          pendingDoubts.slice(0,3).toReversed().map(d=> <Doubt
          name={d.student?.name}
          grade={d.student?.className}
          title={d.title}
          subject={d.subject?.name}
          />)
        }
        </div>
      </div>


{/*Videos...........................................................*/}
      <div className="h-24 bg-white shadow-md w-full rounded p-4">
        <div>
        <h3 className="text-lg font-semibold">Recent Videos</h3>
        <p className="text-gray-500">Your latest uploaded lecture videos</p>
        </div>
      </div>
      </div>
      <div>
      <UploadVideoModal
      isOpen={isOpen}
      onClose={()=>{
        setIsOpen(false)
      }}
      />
      </div>
    </>
  );
}