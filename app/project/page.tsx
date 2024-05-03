'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import WebTerminal from '@/components/web-terminal'
// import WebEditor from '@/components/web-editor'

import { useEffect, useState } from 'react';
import { Editor } from '@/components/Editor';
import { File, RemoteFile, Type } from '@/components/external/editor/utils/file-manager';
import { Socket, io } from 'socket.io-client';
import { EXECUTION_ENGINE_URI } from './_config'


function useSocket(projectId: string) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`${EXECUTION_ENGINE_URI}?projectId=${projectId}`);
        console.log("Socket", newSocket)
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [projectId]);

    return socket;
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
        if (socket) {
            socket.on('loaded', ({ rootContent }: { rootContent: RemoteFile[] }) => {
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
        return "Loading...";
    }


    return (
        <div className='grid grid-cols-4 gap-2 h-screen '>
            {/* ProjectPage: #{projectId} */}
            {/* <div className='w-1/4'></div> */}

            <div className='col-span-3 h-screen'>
                {socket && <Editor socket={socket} selectedFile={selectedFile} onSelect={onSelect} files={fileStructure} />}
            </div>
            
            <div className='h-screen'>
                <iframe src='http://localhost:7681' className='w-full h-1/2'></iframe>
                
            </div>

        </div>
    )
}

export default ProjectPage