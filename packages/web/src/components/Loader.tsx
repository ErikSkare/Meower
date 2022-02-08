import React from "react";
import {ClipLoader} from "react-spinners";

type LoaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div {...props}>
      <ClipLoader color="var(--loader-color)" />
    </div>
  );
};

export default Loader;
