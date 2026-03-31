import React, { useEffect, useState } from 'react'
import WelcomeHeader from '../components/WelcomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import AddSubjectModal from '../components/SubjectModal';
import { addSubject } from '../features/subjectSlice';
import { getAllSubjects } from '../features/subjectSlice';
import SubjectCard from '../components/SubjectCard';

const ManageSubjects = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector(state=>state.auth);
  const {subjects} = useSelector(state=>state.subject);
  const dispatch = useDispatch();
  const handleSubmit = (data)=>{
    dispatch(addSubject(data));
  }
  useEffect(()=>{
    dispatch(getAllSubjects());
  },[dispatch]);
  return (
    <div>
    <div>
      <WelcomeHeader
        name={`Welcome back,${user?.name}`}
        subtitle="Manage all the subjects and teacher from a single page."
        buttonText="Add Subject"
        onClick={() =>{
          setOpen(true)
        }}
      />
    </div>
      {open && (
        <AddSubjectModal
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    <hr/>
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {
        subjects.length > 0 ? subjects.map((s)=>
          <SubjectCard
          key={s._id}
          id={s._id}
          name={s.name}
          className={s.class}
          teacher={s.teacher?.name}
          />
        ):null
      }
    </div>
    </div>
  )
}

export default ManageSubjects
