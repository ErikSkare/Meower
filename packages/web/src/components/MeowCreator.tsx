import React, {FormEventHandler} from "react";
import FileUploader from "./FileUploader";
import Modal from "./Modal";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";

type MeowCreatorProps = {
  isOpen: boolean;
  setIsOpen: Function;
  onCreate: FormEventHandler<HTMLFormElement>;
  isCreating?: boolean;
  content: string;
  setContent: Function;
  file: File | null;
  setFile: Function;
};

const MeowCreator: React.FC<MeowCreatorProps> = ({
  isOpen,
  setIsOpen,
  onCreate,
  isCreating = false,
  content,
  setContent,
  file,
  setFile,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col items-center">
        <h2>Új meow hozzáadása</h2>
        <form
          className="w-full flex flex-col items-center gap-6"
          onSubmit={onCreate}
        >
          <TextArea
            id="content"
            label="A meow szövege"
            value={content}
            setValue={setContent}
          />
          <FileUploader file={file} setFile={setFile} />
          <PrimaryButton className="w-full max-w-md" isLoading={isCreating}>
            Meow hozzáadása
          </PrimaryButton>
        </form>
      </div>
    </Modal>
  );
};

export default MeowCreator;
