import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as Photo} from "./icons/photo.svg";

type FileUploaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  file: File | null;
  setFile: Function;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  file,
  setFile,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragCounter = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length === 1)
        setDragging(true);
    };

    const handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current > 0) return;
      setDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
        setFile(e.dataTransfer.files[0]);
        setDragging(false);
        dragCounter.current = 0;
      }
    };

    ref.current?.addEventListener("dragenter", handleDragIn);
    ref.current?.addEventListener("dragleave", handleDragOut);
    ref.current?.addEventListener("dragover", handleDrag);
    ref.current?.addEventListener("drop", handleDrop);
  }, [setDragging, setFile]);

  return (
    <div
      ref={ref}
      className={`w-full max-w-md bg-white flex flex-col gap-2 items-center justify-center p-5 border border-slate-400 rounded cursor-pointer ${className}`}
      {...props}
    >
      {file === null ? (
        <Photo
          className={`aspect-square w-10 h-auto ${dragging && "fill-sky-500"}`}
        />
      ) : (
        <img
          src={URL.createObjectURL(file)}
          className="aspect-square w-10 h-auto rounded"
          alt="upload"
        />
      )}
      <div className={`${dragging && "text-sky-500"}`}>
        Ide húzhatod a képet
      </div>
    </div>
  );
};

export default FileUploader;
