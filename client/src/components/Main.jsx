import React from 'react'
import FeatureCard from './FeatureCard'
import { features } from '../assets/features'
import { Data } from '../assets/data'
import MainCard from './MainCard'

const Main = () => {
  return (
    <div className='flex flex-col justify-center items-center px-12 py-16'>
      <h1 className='text-black font-bold text-4xl text-center'>
        Everything You Need for Modern Education
      </h1>
      <div className=' mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          features.map((item, index)=>{
            return(
            <FeatureCard 
            key={index}
            icon={item.icon}
            description={item.description}
            title={item.title}
            />
            )
          })
        }
      </div>
      <h1 className='text-black font-bold text-4xl text-center mt-16'>
        Built for Everyone in Education
      </h1>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {
          Data.map((item,index)=>{
            return(
              <MainCard 
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Main
