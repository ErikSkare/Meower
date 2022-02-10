import {useState} from "react";
import {Link} from "react-router-dom";
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
    <div className="w-screen h-screen flex flex-col items-center justify-center px-6">
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
      <Link to="/register" className="mt-2">
        <a className="text-slate-400">Nincs még fiókod?</a>
      </Link>
    </div>
  );
};

export default Login;
