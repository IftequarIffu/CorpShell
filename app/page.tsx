'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { useState } from "react";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Home() {

  const router = useRouter()

  const [language, setLanguage] = useState<string>()


  const createProject = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const projectId = uuidv4(); 
    console.log(projectId)
    
    // Write the code which moves the chosen language's 
    // code from bolierplate code directory to projectId 
    // directory in AWS S3


    // Make an API call to the Express server to fetch the 
    // projectId code from AWS S3 into /tmp/codedamn_workspaces/{projectid} directory of backend
    // linux terminal.

    // Make an API call to the Express server to create a
    // docker container with the tagName={projectId} using the custom
    // docker image which we are going to build using the Dockerfile.

    // Make an API call to the Express server to fetch the 
    // container ID of the docker container created for this project.

    // 


    router.push(`/project?projectId=${projectId}`)
  }




  return (
    <main className="h-screen w-full flex items-center justify-center">

      <div>
      <h1 className="font-bold mb-4 text-xl">Select a language</h1>
      {/* Select Component */}
      <Select onValueChange={(value) => setLanguage(value)} defaultValue="react">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="next.js">Next.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Button className="mt-4" onClick={(e) => createProject(e)}>Create Project</Button>
    </div>


    {/* Create Project Button */}


    </main>
  );
}
