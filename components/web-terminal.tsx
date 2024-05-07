'use client'
import React, { useEffect } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from '@xterm/addon-fit';
import { Socket, io } from 'socket.io-client';


function WebTerminal() {

  useEffect(() => {
    

    const term = new Terminal();
    const fitAddon = new FitAddon();
    const terminalContainer = document.getElementById("terminal");
    if (terminalContainer) {
      const socket = new WebSocket("ws://localhost:2375/containers/d4015d1007c2/attach/ws?stream=1&stdout=1&stdin=1&logs=1");

      socket.onopen = () => {
        console.log("WebSocket connection established.");
        const attachAddon = new AttachAddon(socket);
        term.open(terminalContainer);
        term.loadAddon(attachAddon);
        term.loadAddon(fitAddon);
      }
      
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    
    }
  }, []);

  return (
    <div id="terminal" style={{ height: '100vh', width: '100%' }}></div>
  );
}

export default WebTerminal;
