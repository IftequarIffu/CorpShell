'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';
 
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

  const createProject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const projectId = uuidv4(); 
    console.log(projectId)

  }




  return (
    <main className="h-screen w-full flex items-center justify-center">

      <div>
      {/* <h1 className="font-bold mb-4 text-xl">Select a language</h1> */}
      {/* Select Component */}
      <Select>
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
