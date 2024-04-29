'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import WebTerminal from '@/components/web-terminal'


const ProjectPage = () => {

    const urlParams = useSearchParams()
    const projectId = urlParams.get('projectId')

  return (
    <div className='flex'>
        {/* ProjectPage: #{projectId} */}
        <div className='w-1/4'></div>
        <div className='w-1/2'></div>
        <div className='flex justify-end'>
            <div className='w-1/2 overflow-hidden'><WebTerminal /></div>
        </div>
        
    </div>
  )
}

export default ProjectPage