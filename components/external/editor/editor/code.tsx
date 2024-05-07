import Editor from "@monaco-editor/react";
import { File } from "../utils/file-manager";
import { Socket } from "socket.io-client";
import { OnChange } from "@monaco-editor/react";

export const Code = ({ selectedFile, socket }: { selectedFile: File | undefined, socket: Socket }) => {
  if (!selectedFile)
    return null

  const code = selectedFile.content
  let language = selectedFile.name.split('.').pop()

  if (language === "js" || language === "jsx")
    language = "javascript";
  else if (language === "ts" || language === "tsx")
    language = "typescript"
  else if (language === "python" )
    language = "python"
  else if (language === "react" || language === "next.js")
      language = "typescript"
  

    // function debounce(func: (value: string) => void, wait: number) {
    //   let timeout: number;
    //   return (value: string) => {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //       func(value);
    //     }, wait);
    //   };
    // }

    function debounce(func: (value: string) => void, wait: number) {
      let timeout: NodeJS.Timeout | undefined;
      return (value: string) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func(value);
        }, wait);
      };
    }

    // const onChangeHandler: OnChange = (value: string|undefined, ev: editor.IModelContentChangedEvent) => {
    //   // Your logic here
    //   socket.emit("updateContent", { path: selectedFile!.path, content: value });
    // };

  return (
      <Editor
        height="100vh"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(value, ev) => debounce((value) => { socket.emit("updateContent", { path: selectedFile.path, content: value });
       }, 500)}
        // onChange={debounce((value) => {
        //   // Should send diffs, for now sending the whole file
        //   // PR and win a bounty!
        //   socket.emit("updateContent", { path: selectedFile.path, content: value });
        // }, 500)}
      />
  )
}


    // Should send diffs, for now sending the whole file
    // PR and win a bounty!
    