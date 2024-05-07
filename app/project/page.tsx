'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import WebTerminal from '@/components/web-terminal'
// import WebEditor from '@/components/web-editor'

import { useEffect, useState } from 'react';
import { Editor } from '@/components/Editor';
import { Type, File, RemoteFile } from '@/components/external/editor/utils/file-manager';
import { Socket, io } from 'socket.io-client';
import { EXECUTION_ENGINE_URI } from './_config'
import {PORT} from '../../constants'
import { LoaderIcon } from "lucide-react"
import {createContainer} from '../actions/dockerActions'



function useSocket(projectId: string) {
    const [sock, setSock] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`http://localhost:3000?projectId=${projectId}`);
        console.log("Socket", newSocket)

        newSocket.on("connect", () => {
            console.log(newSocket.id)
        })

        setSock(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [projectId]);

    return sock;

}


const ProjectPage = () => {

    const urlParams = useSearchParams()
    const projectId = urlParams.get('projectId')

    const [loaded, setLoaded] = useState(false);
    const socket = useSocket(projectId as string);
    const [fileStructure, setFileStructure] = useState<RemoteFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        console.log("Reached UseEffect of page.tsx of project page", socket)

        if (socket) {
            socket.on('loaded', ({ rootContent }: { rootContent: RemoteFile[] }) => {

                console.log("Reached loaded on client", rootContent);
                setLoaded(true);
                setFileStructure(rootContent);
            });

        }
    }, [socket]);

    const onSelect = (file: File) => {
        if (file.type === Type.DIRECTORY) {
            socket?.emit("fetchDir", file.path, (data: RemoteFile[]) => {
                setFileStructure(prev => {
                    const allFiles = [...prev, ...data];
                    return allFiles.filter((file, index, self) =>
                        index === self.findIndex(f => f.path === file.path)
                    );
                });
            });

        } else {
            socket?.emit("fetchContent", { path: file.path }, (data: string) => {
                file.content = data;
                setSelectedFile(file);
            });
        }
    };

    if (!loaded) {
        return <div className='flex justify-center items-center'><LoaderIcon className="animate-spin ms-2 " /></div>;
    }


    return (
        <div className='grid grid-cols-4 h-screen '>
            {/* ProjectPage: #{projectId} */}
            {/* <div className='w-1/4'></div> */}

            <div className='col-span-3'>
                {socket && <Editor socket={socket} selectedFile={selectedFile} onSelect={onSelect} files={fileStructure} />}
            </div>
            
            <div className='h-screen'>
                <iframe src='http://localhost:8080' className='w-full h-1/2'></iframe>
                <iframe src='http://localhost:3000' className='w-full h-1/2'></iframe>
                {/* <WebTerminal /> */}
            </div>

        </div>
    )   
}

export default ProjectPage