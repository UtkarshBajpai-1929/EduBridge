import React from 'react'

const MainCard = ({image, title, description}) => {
  return (
    <div className='flex flex-col bg-white shadow-sm hover:shadow-md transition rounded-2xl'>
      <img src = {image} alt={title} className='rounded-t-2xl'/>
      <div className='flex flex-col px-8 py-4'>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
      </div>
    </div>
  )
}

export default MainCard
