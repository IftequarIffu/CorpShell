// import type { Server as HTTPServer } from "http"
// import type { Socket as NetSocket } from "net"
// import type { NextApiRequest, NextApiResponse } from "next"
// import { Server as IOServer } from "socket.io"
// import { Server } from "socket.io"
// import next from "next"
// import { createServer } from "node:http";


// // const PORT = 3000

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// interface SocketServer extends HTTPServer {
//   io?: IOServer | undefined
// }

// // interface SocketWithIO extends NetSocket {
// //   server: SocketServer
// // }

// // interface NextApiResponseWithSocket extends NextApiResponse {
// //   socket: SocketWithIO
// // }

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3000;
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// // export async function GET(req: NextApiRequest, res: any) {

// //   const httpServer = req.socket as unknown as SocketServer;

// //   if (httpServer.io) {
// //     console.log('Socket is already running');
// //     res.end();
// //     return;
// //   } 

// //   const io = new Server(httpServer, {
// //     path: "/api/socket",
// //     // addTrailingSlash: false // This option is not available in the constructor
// //   });

// //   httpServer.io = io; // Assign the io instance to the HTTPServer

// //   // if (res.socket.server.io) {
// //   //   console.log('Socket is already running')
// //   //   res.end()
// //   //   return
// //   // } 

// //   //   console.log('Socket is initializing')
// //   //   // const io = new IOServer()
// //   //   // io.attach(res.socket.server);
// //   //   // io.listen(3001)
// //   //   const io = new Server(res.socket.server, {
// //   //     path: "/api/socket",
// //   //     addTrailingSlash: false
// //   //   });
// //   //   res.socket.server.io = io

// //   //   const onConnection = (socket: any) => {
// //   //       console.log("New connection", socket.id)
// //   //       // onSocketConnection(io, socket)
// //   //   }

// //   // io.on("connection", onConnection)

// //   res.end()
// // }


export async function GET(req: any, res: any) {
  
  return "Hello World"
}