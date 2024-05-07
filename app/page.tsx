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
import axios from 'axios'
import { copyS3Folder } from "@/app/actions/awsActions";
import { LoaderIcon } from "lucide-react"
import { createDockerImage, createContainer } from "./actions/dockerActions"



export default function Home() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [projectType, setProjectType] = useState<string>("react")
  // console.log(projectType)


  const createProject = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    setIsLoading(true);
    const projectId = uuidv4(); 
    console.log(projectId)
    let language = projectType;
    // Write the code which moves the chosen language's 
    // code from bolierplate code directory to projectId 
    // directory in AWS S3
    // await axios.post("http://localhost:3001/project", {
    //   projectId,
    //   language: projectType
    // })

    await copyS3Folder(`bolerplate-code/${language}`, `code/${projectId}`);



    // Make an API call to the Express server to fetch the 
    // projectId code from AWS S3 into /tmp/codedamn_workspaces/{projectid} directory of backend
    // linux terminal. This is already initialised when websocket connection was made after being
    // routed to the /project?projectId=${projectId} endpoint.

    // Make an API call to the Express server to create a
    // docker container with the tagName={projectId} using the custom
    // docker image which we are going to build using the Dockerfile.

    // Make an API call to the Express server to fetch the 
    // container ID of the docker container created for this project.

    // 

    createContainer(projectId as string)
    console.log("Completed the creation of docker container")
    router.push(`/project?projectId=${projectId}`)
  }




  return (
    <main className="h-screen w-full flex items-center justify-center">

      <div>
      <h1 className="font-bold mb-4 text-xl">Select a language</h1>
      {/* Select Component */}
      <Select onValueChange={(value) => setProjectType(value)} defaultValue="react">
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

    <Button className="mt-4" onClick={(e) => createProject(e)}>
      <p>Create Project</p>
      { isLoading && <LoaderIcon className="animate-spin ms-2" /> }
    </Button>
    </div>


    {/* Create Project Button */}


    </main>
  );
}
