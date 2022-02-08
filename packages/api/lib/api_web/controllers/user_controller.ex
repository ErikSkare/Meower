defmodule ApiWeb.UserController do
  use ApiWeb, :controller
  alias Api.Accounts.Auth
  alias Api.Accounts

  action_fallback ApiWeb.FallbackController

  def show(conn, %{"username" => username}) do
    current = Auth.Token.Plug.current_resource(conn)
    with {:ok, user} <- Accounts.get_user_by_username(username) do
      render(conn, "show.json", user: user, viewer: current)
    end
  end

  def show_me(conn, _params) do
    current = Auth.Token.Plug.current_resource(conn)
    render(conn, "show.json", user: current, viewer: current)
  end
end
