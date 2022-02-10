import {useState} from "react";
import {useLogin} from "../services/auth";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, loading} = useLogin();

  const onSubmit = (ev) => {
    ev.preventDefault();
    login(email, password);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h2>Bejelentkezés</h2>
      <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={onSubmit}>
        <TextInput
          id="email"
          label="Email cím"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          id="password"
          label="Jelszó"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <PrimaryButton isLoading={loading}>
          {error === "" ? <>Mehet</> : error}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Login;
