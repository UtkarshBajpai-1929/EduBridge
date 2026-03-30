import React, { use, useEffect, useState } from 'react'
import SearchBar from '../components/Searchbar'
import WelcomeHeader from '../components/WelcomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import AdminTab from '../components/AdminTab'
import UserCard from '../components/UserCard'
import { getAllStudents, getAllTeachers } from '../features/schoolSlice'

const ManageUsers = () => {
  const [clicked, setClicked] = useState("all");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {students,teachers} = useSelector(state=>state.school);
  const {user} = useSelector(state=>state.auth);
  useEffect(()=>{
    dispatch(getAllStudents());
    dispatch(getAllTeachers());
  },[dispatch])
  const data = React.useMemo(() => {
  if (clicked === "all") return [...students, ...teachers];
  if (clicked === "teacher") return teachers;
  if (clicked === "student") return students;
  return [];
}, [clicked, students, teachers]);
const filteredData = data.filter((user) => {
  const query = search.toLowerCase();

  return (
    user.name?.toLowerCase().includes(query) ||
    user.email?.toLowerCase().includes(query) ||
    user._id?.toLowerCase().includes(query)
  );
});
  return (
    <div>
    <div className='flex  items-center'>
         <WelcomeHeader
        name={`Welcome back,${user?.name}`}
        subtitle="Manage students and teacher from a single page."
        buttonText=""
        onClick={() =>{}}
      />
    </div>
    <hr/>
    <div className='mt-4 flex flex-col gap-4'>
    <SearchBar
    value={search}
    onChange={(e)=>{
      setSearch(e.target.value)
    }}
    />
    <AdminTab
    onClickStudent={()=>{
      setClicked("student")
    }
    }
    onClickTeacher={()=>{
      setClicked("teacher")
    }}
    onClickAll={()=>{
      setClicked("all");
    }}
    studentCount={students?.length}
    teacherCount={teachers?.length}
    totalCount={students?.length + teachers?.length}
    />
    <div className='flex flex-wrap gap-4'>
      {
         filteredData?.map((user)=>
          <UserCard
          key={user._id}
          name={user.name}
          email={user.email}
          role={user.role}
          profile={user.profileImage}
          />
        )
      }
    </div>
    </div>
    </div>
  )
}

export default ManageUsers
