import {Link} from "react-router-dom";
import {useMe} from "../../services/users";
import Page5xx from "../Page5xx";
import Loader from "../../components/Loader";

const DefaultLayout = ({children}) => {
  const {data: me, isLoading: isLoadingMe, isError: isErrorMe} = useMe();

  if (isLoadingMe)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isErrorMe) return <Page5xx />;

  return (
    <div className="flex flex-col gap-10">
      <nav className="sticky top-0 border-b border-b-slate-200 bg-white">
        <div
          className="w-full py-2 flex justify-between items-center m-auto px-10"
          style={{maxWidth: "1200px"}}
        >
          <Link to="/">
            <div style={{fontFamily: "yellowtail", fontSize: "2rem"}}>
              Meower
            </div>
          </Link>
          <img
            src={me!.data.avatar_url}
            className="aspect-square object-cover w-auto h-8 rounded-full cursor-pointer"
            alt="profile"
          />
        </div>
      </nav>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default DefaultLayout;
