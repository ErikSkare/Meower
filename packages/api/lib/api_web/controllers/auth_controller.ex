defmodule ApiWeb.AuthController do
  use ApiWeb, :controller
  alias Api.Accounts
  alias Api.Accounts.Auth

  action_fallback ApiWeb.FallbackController

  def register(conn, %{"user" => user_params}) do
    with {:ok, user} <- Accounts.create_user(user_params) do
      new_conn = put_tokens(conn, user)
      new_conn
      |> put_status(:created)
      |> json(%{access: Auth.Token.Plug.current_token(new_conn)})
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    with {:ok, user} <- Accounts.get_user_by_credentials(email, password) do
      new_conn = put_tokens(conn, user)
      new_conn
      |> put_status(:accepted)
      |> json(%{access: Auth.Token.Plug.current_token(new_conn)})
    end
  end

  def refresh(conn, _params) do
    with {:ok, refresh} <- Guardian.Plug.find_token_from_cookies(conn),
         {:ok, {_, _}, {new_access, _}} <- Auth.Token.exchange(refresh, "refresh", "access")
    do
      conn
      |> put_status(:accepted)
      |> json(%{access: new_access})
    else
      :no_token_found -> {:error, :no_token_found}
      _ -> {:error, :bad_token}
    end
  end

  defp put_tokens(conn, user) do
    conn
    |> Auth.Token.Plug.sign_in(user)
    |> Auth.Token.Plug.remember_me(user)
  end
end
