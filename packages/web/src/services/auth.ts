import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuthResponse} from "../types";
import useAuth from "../stores/useAuth";
import api from "../setup/api";
import queryClient from "../setup/query";

const refreshAccessToken = async () => {
  const {data} = await api.get<AuthResponse>("refresh");
  return data.access;
};

const getRequestInterceptor = (accessToken: string) => {
  return api.interceptors.request.use(
    (req) => {
      if (accessToken !== "")
        (req.headers as any)["Authorization"] = `Bearer ${accessToken}`;
      return req;
    },
    (error) => error
  );
};

const getResponseInterceptor = (
  setAuthenticated: Function,
  setUnauthenticated: Function
) => {
  return api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const req = error.config;
      if (error.response.status === 401 && !req._retry)
        try {
          req._retry = true;
          const newToken = await refreshAccessToken();
          setAuthenticated(newToken);
          (req.headers as any)["Authorization"] = `Bearer ${newToken}`;
          return api(req);
        } catch {
          setUnauthenticated();
        }
      return Promise.reject(error);
    }
  );
};

export const useAutoRefresh = () => {
  const {
    accessToken,
    isAuth,
    isLoading,
    setAuthenticated,
    setUnauthenticated,
    finishLoading,
  } = useAuth();

  useEffect(() => {
    refreshAccessToken()
      .then((token) => {
        setAuthenticated(token);
        finishLoading();
      })
      .catch(() => {
        setUnauthenticated();
        finishLoading();
      });
  }, [setAuthenticated, setUnauthenticated, finishLoading]);

  useEffect(() => {
    if (!isAuth) return;

    const reqID = getRequestInterceptor(accessToken);
    const resID = getResponseInterceptor(setAuthenticated, setUnauthenticated);

    return () => {
      api.interceptors.request.eject(reqID);
      api.interceptors.response.eject(resID);
    };
  }, [accessToken, isAuth, setAuthenticated, setUnauthenticated]);

  return {isAuth, isLoading};
};

export const useLogout = () => {
  const {setUnauthenticated} = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    api.post("logout").then(() => {
      queryClient.clear();
      setUnauthenticated();
      navigate("/");
    });
  };
  return logout;
};

export const useLogin = () => {
  const {setAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (email: string, password: string) => {
    setLoading(true);
    api
      .post<AuthResponse>("login", {email, password})
      .then(({data}) => {
        setAuthenticated(data.access);
        navigate("/");
      })
      .catch(() => {
        setError("Hibás adatok!");
        setLoading(false);
      });
  };

  return {login, error, loading};
};

export const useRegister = () => {
  const {setAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = (user: any) => {
    setLoading(true);
    api
      .post<AuthResponse>("register", {user})
      .then(({data}) => {
        setAuthenticated(data.access);
        navigate("/");
      })
      .catch(() => {
        setError("Hibás adatok!");
        setLoading(false);
      });
  };

  return {register, error, loading};
};
