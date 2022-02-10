import {useState} from "react";
import {Link} from "react-router-dom";
import {useRegister} from "../services/auth";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const {register, error, loading} = useRegister();

  const onSubmit = (ev) => {
    ev.preventDefault();
    register({
      email: email,
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h2>Regisztráció</h2>
      <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={onSubmit}>
        <TextInput
          id="email"
          label="Email cím"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          id="username"
          label="Felhasználónév"
          value={username}
          setValue={setUsername}
        />
        <TextInput
          id="password"
          label="Jelszó"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <TextInput
          id="password_confirmation"
          label="Jelszó újra"
          type="password"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
        />
        <PrimaryButton isLoading={loading}>
          {error === "" ? <>Mehet</> : error}
        </PrimaryButton>
      </form>
      <Link to="/" className="mt-2">
        <a className="text-slate-400">Van már fiókod?</a>
      </Link>
    </div>
  );
};

export default Register;
