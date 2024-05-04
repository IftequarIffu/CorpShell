import { createServer } from "node:http";
import next from "next";
import { fetchS3Folder, saveToS3 } from "./actions/awsActions";
import { fetchDir, fetchFileContent, saveFile } from "./actions/fileSystemActions";
import { Server, Socket } from "socket.io";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async(socket) => {
    
    const projectId = socket.handshake.query.projectId as string;

        if (!projectId) {
            socket.disconnect();
            return;
        }

        await fetchS3Folder(`code/${projectId}`, path.join(__dirname, `../tmp/${projectId}`));
        socket.emit("loaded", {
            rootContent: await fetchDir(path.join(__dirname, `../tmp/${projectId}`), "")
        });

        initHandlers(socket, projectId);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

function initHandlers(socket: Socket, projectId: string) {

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("fetchDir", async (dir: string, callback) => {
        const dirPath = path.join(__dirname, `../tmp/${projectId}/${dir}`);
        const contents = await fetchDir(dirPath, dir);
        callback(contents);
    });

    socket.on("fetchContent", async ({ path: filePath }: { path: string }, callback) => {
        const fullPath = path.join(__dirname, `../tmp/${projectId}/${filePath}`);
        const data = await fetchFileContent(fullPath);
        callback(data);
    });

    // TODO: contents should be diff, not full file
    // Should be validated for size
    // Should be throttled before updating S3 (or use an S3 mount)
    socket.on("updateContent", async ({ path: filePath, content }: { path: string, content: string }) => {
        const fullPath = path.join(__dirname, `../tmp/${projectId}/${filePath}`);
        await saveFile(fullPath, content);
        await saveToS3(`code/${projectId}`, filePath, content);
    });
}