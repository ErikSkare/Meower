import {useState} from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import {useMe, useUpdateMe} from "../services/users";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Page5xx from "./Page5xx";
import Loader from "../components/Loader";
import FileUploader from "../components/FileUploader";
import PrimaryButton from "../components/PrimaryButton";

const Profile = () => {
  const {data: me, isLoading: isLoadingMe, isError: isErrorMe} = useMe();
  const {mutate: updateMe, isLoading: isUpdating} = useUpdateMe();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    let formData = new FormData();
    if (email !== "") formData.append("user[email]", email);
    if (username !== "") formData.append("user[username]", username);
    if (avatar !== null) formData.append("user[avatar]", avatar);
    formData.append("user[bio]", bio);
    updateMe(formData);
  };

  if (isLoadingMe)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isErrorMe) return <Page5xx />;

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center">
        <h2>Profil módosítása</h2>
        <form
          className="w-full max-w-md mx-10 flex flex-col gap-6 items-center pb-10"
          onSubmit={onSubmit}
        >
          <TextInput
            id="email"
            label="Email cím"
            placeholder={me!.data.email!}
            value={email}
            setValue={setEmail}
          />
          <TextInput
            id="username"
            label="Felhasználónév"
            placeholder={me!.data.username}
            value={username}
            setValue={setUsername}
          />
          <TextArea
            id="bio"
            label="Bio"
            placeholder={me!.data.bio}
            value={bio}
            setValue={setBio}
          />
          <FileUploader file={avatar} setFile={setAvatar} />
          <PrimaryButton className="w-full" isLoading={isUpdating}>
            Mentés
          </PrimaryButton>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
