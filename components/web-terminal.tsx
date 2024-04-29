// import React from 'react'
// import Script from 'next/script'
// import Link from 'next/link'
// import { Terminal } from '@xterm/xterm';



// const WebTerminal = () => {
//   return (
//     <>
//     <Link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
//     <Script src="node_modules/@xterm/xterm/lib/xterm.js"></Script>
//     <Script>
//         var term = new Terminal();
//         term.open(document.getElementById('terminal'));
//         term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
//     </Script>
//     <div id="terminal"></div>
//     </>
//   )
// }

// export default WebTerminal

import React, { useEffect } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { AttachAddon } from 'xterm-addon-attach';

function WebTerminal() {
  useEffect(() => {
    const term = new Terminal();
    const terminalContainer = document.getElementById("terminal");
    if (terminalContainer) {
      const socket = new WebSocket("ws://localhost:2375/containers/3f7fe9a3eba8672b86321acb5a9c27ccdbf5bff061334aa65a23465e724cb3dd/attach/ws?stream=1&stdout=1&stdin=1&logs=1");
      const attachAddon = new AttachAddon(socket);
      term.open(terminalContainer);
      term.loadAddon(attachAddon);
    }
  }, []);

  return (
    <div id="terminal"></div>
  );
}

export default WebTerminal;
