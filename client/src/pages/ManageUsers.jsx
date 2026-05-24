import React, { useEffect, useState } from 'react'
import SearchBar from '../components/Searchbar'
import WelcomeHeader from '../components/WelcomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import AdminTab from '../components/AdminTab'
import UserCard from '../components/UserCard'
import { getAllStudents, getAllTeachers } from '../features/schoolSlice'
import UserModal from '../components/UserModal' // ✅ added

const ManageUsers = () => {
  const [clicked, setClicked] = useState("all");
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const {students = [],teachers = []} = useSelector(state=>state.school);
  const {user} = useSelector(state=>state.auth);

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

  useEffect(()=>{
    dispatch(getAllStudents());
    dispatch(getAllTeachers());
  },[dispatch])

return (
  <div className="min-h-screen w-full bg-gray-100 px-4 py-4 flex flex-col">
    
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      
      <div className="flex items-start justify-between">
        <WelcomeHeader
          name={`Welcome back, ${user?.name}`}
          subtitle="Manage students and teacher from a single page."
          buttonText=""
          onClick={() => {}}
        />
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <AdminTab
          onClickStudent={() => setClicked("student")}
          onClickTeacher={() => setClicked("teacher")}
          onClickAll={() => setClicked("all")}
          studentCount={students?.length}
          teacherCount={teachers?.length}
          totalCount={students?.length + teachers?.length}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
          {filteredData?.map((user) => (
            <UserCard
              key={user._id}
              name={user.name}
              email={user.email}
              role={user.role}
              profile={user.profileImage}
              userId={user._id}
              onView={() => {
                setSelectedUser(user);
                setShowModal(true);
              }}
            />
          ))}
        </div>

      </div>
    </div>

    {showModal && (
      <UserModal
        user={selectedUser}
        onClose={() => setShowModal(false)}
      />
    )}
    
  </div>
)
}

export default ManageUsers
