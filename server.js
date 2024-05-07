import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import fs from "fs"
import { fetchS3Folder, saveToS3 } from "./app/actions/awsActions.js";
import path from "path";
import { fetchDir, fetchFileContent, saveFile } from "./app/actions/fileSystemActions.js";
import { fileURLToPath } from "url"; // Import fileURLToPath


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to __filename
const __dirname = path.dirname(__filename);

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    const projectId = socket.handshake.query.projectId;
    console.log("ProjectId", projectId)

        if (!projectId) {
            socket.disconnect();
            return;
        }

        // await createLocalDirectoryForUser(path.join(__dirname, `../tmp/${projectId}`));
        // console.log("Folder created successfully")

        await fetchS3Folder(`code/${projectId}`, `/tmp/${projectId}`);
        socket.emit("loaded", {
            rootContent: await fetchDir(`/tmp/${projectId}`, "")
        });

        initHandlers(socket, projectId);
  });


  function initHandlers(socket, projectId) {

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("fetchDir", async (dir, callback) => {
        const dirPath = `/tmp/${projectId}/${dir}`
        const contents = await fetchDir(dirPath, dir);
        callback(contents);
    });

    socket.on("fetchContent", async ({ path: filePath }, callback) => {
        const fullPath = `/tmp/${projectId}/${filePath}`
        const data = await fetchFileContent(fullPath);
        callback(data);
    });

    // TODO: contents should be diff, not full file
    // Should be validated for size
    // Should be throttled before updating S3 (or use an S3 mount)
    socket.on("updateContent", async ({ path: filePath, content }) => {
        const fullPath = `/tmp/${projectId}/${filePath}`
        await saveFile(fullPath, content);
        await saveToS3(`code/${projectId}`, filePath, content);
    });
}

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});