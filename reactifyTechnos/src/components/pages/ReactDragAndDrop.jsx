import React from "react";

const ReactDragAndDrop = () => {
  let code = `
  import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
  `;
  return (
    <div className="flex flex-col items-center text-gray-300 gap-[20px]  mx-auto h-[100vh] max-w-5xl mt-[90px] border-[1px] border-gray-500 p-[20px] rounded-[18px]">
      <h5 className="text-4xl font-semibold">React-dropzone</h5>
      <pre className="relative text-start bg-slate-600 rounded-[18px] p-[20px]">
        <button className="absolute top-3 right-3 px-2 py-1 text-black rounded-[5px] hover:opacity-[80%]  bg-slate-300">
          Copy
        </button>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default ReactDragAndDrop;
