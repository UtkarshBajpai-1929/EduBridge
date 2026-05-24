import React, { useEffect, useState } from 'react'
import WelcomeHeader from '../components/WelcomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import AddSubjectModal from '../components/SubjectModal';
import { addSubject, updateSubject } from '../features/subjectSlice';
import { getAllSubjects } from '../features/subjectSlice';
import SubjectCard from '../components/SubjectCard';
import { Search } from 'lucide-react';

const ManageSubjects = () => {
  const [open, setOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [search, setSearch] = useState("");
  const {user} = useSelector(state=>state.auth);
  const {subjects} = useSelector(state=>state.subject);
  const dispatch = useDispatch();
  const handleSubmit = (data)=>{
    if(editingSubject){
      dispatch(updateSubject({ id: editingSubject._id, data }));
    }else{
      dispatch(addSubject(data));
    }
    setEditingSubject(null);
  }
  const filteredSubjects = subjects?.filter((subject) => {
    const query = search.toLowerCase();
    return (
      subject.name?.toLowerCase().includes(query) ||
      subject.class?.toLowerCase().includes(query) ||
      subject.teacher?.name?.toLowerCase().includes(query)
    );
  });

  useEffect(()=>{
    dispatch(getAllSubjects());
  },[dispatch]);
  return (
    <div className='min-h-dvh bg-gray-100 px-4 pb-8'>
    <div>
      <WelcomeHeader
        name={`Welcome back,${user?.name}`}
        subtitle="Manage all the subjects and teacher from a single page."
        buttonText="Add Subject"
        onClick={() =>{
          setEditingSubject(null)
          setOpen(true)
        }}
      />
    </div>
      {open && (
        <AddSubjectModal
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          initialSubject={editingSubject}
        />
      )}
    <hr/>
    <div className='mt-4 flex items-center gap-2 rounded bg-white p-3 shadow-sm'>
      <Search size={18} className='text-gray-500' />
      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='w-full bg-transparent outline-none'
        placeholder='Search by subject, class, or teacher'
      />
    </div>
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        filteredSubjects?.length > 0 ? filteredSubjects.map((s)=>
          <SubjectCard
          key={s._id}
          id={s._id}
          name={s.name}
          className={s.class}
          teacher={s.teacher?.name}
          onEdit={()=>{
            setEditingSubject(s);
            setOpen(true);
          }}
          />
        ):(
          <div className='col-span-full rounded bg-white p-8 text-center text-gray-500 shadow-sm'>
            No subjects found.
          </div>
        )
      }
    </div>
    </div>
  )
}

export default ManageSubjects
