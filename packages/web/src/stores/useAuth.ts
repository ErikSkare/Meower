import create from "zustand";
import {combine} from "zustand/middleware";

export default create(
  combine(
    {
      accessToken: "",
      isAuth: false,
      isLoading: true,
    },
    (set) => ({
      setAuthenticated: (accessToken: string) =>
        set((state) => ({...state, accessToken: accessToken, isAuth: true})),

      setUnauthenticated: () =>
        set((state) => ({...state, accessToken: "", isAuth: false})),

      finishLoading: () => set((state) => ({...state, isLoading: false})),
    })
  )
);
