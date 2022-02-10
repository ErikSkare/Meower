import {useState} from "react";
import {Link} from "react-router-dom";
import {useMe} from "../../services/users";
import {useCreateMeow} from "../../services/meows";
import {useLogout} from "../../services/auth";
import Page5xx from "../Page5xx";
import Loader from "../../components/Loader";
import MeowCreator from "../../components/MeowCreator";
import {ReactComponent as Add} from "../../components/icons/add.svg";
import {ReactComponent as Logout} from "../../components/icons/logout.svg";

const DefaultLayout = ({children}) => {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const {data: me, isLoading: isLoadingMe, isError: isErrorMe} = useMe();
  const {mutate: createMeow, isLoading: isCreating} = useCreateMeow();
  const logout = useLogout();

  const onMeowCreate = (ev) => {
    ev.preventDefault();
    let formData = new FormData();
    formData.append("meow[content]", content);
    if (file !== null) formData.append("meow[image]", file);
    createMeow(formData);
  };

  if (isLoadingMe)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isErrorMe) return <Page5xx />;

  return (
    <>
      <div className="flex flex-col gap-10">
        <nav className="sticky top-0 border-b border-b-slate-200 bg-white">
          <div
            className="w-full py-2 flex justify-between items-center m-auto px-10"
            style={{maxWidth: "1200px"}}
          >
            <Link to="/" style={{textDecoration: "none"}}>
              <div style={{fontFamily: "yellowtail", fontSize: "2rem"}}>
                Meower
              </div>
            </Link>
            <div className="flex flex-row-reverse items-center gap-6">
              <Link to="/profile">
                <img
                  src={me!.data.avatar_url}
                  className="aspect-square object-cover w-auto h-8 rounded-full cursor-pointer"
                  alt="profile"
                />
              </Link>
              <Add
                className="aspect-square w-auto h-6 fill-slate-400 hover:fill-slate-500 cursor-pointer"
                onClick={() => setIsCreatorOpen(true)}
              />
              <Logout
                className="aspect-square w-auto h-6 fill-slate-400 hover:fill-slate-500 cursor-pointer"
                onClick={() => logout()}
              />
            </div>
          </div>
        </nav>
        <div className="flex justify-center">{children}</div>
      </div>
      <MeowCreator
        isOpen={isCreatorOpen}
        setIsOpen={setIsCreatorOpen}
        onCreate={onMeowCreate}
        isCreating={isCreating}
        content={content}
        setContent={setContent}
        file={file}
        setFile={setFile}
      />
    </>
  );
};

export default DefaultLayout;
