defmodule ApiWeb.MeowController do
  use ApiWeb, :controller
  alias Api.Accounts.Auth
  alias Api.Contents

  action_fallback ApiWeb.FallbackController

  def index(conn, _params) do
    current = Auth.Token.Plug.current_resource(conn)
    meows = Contents.list_meows(
      conn.query_params["cursor"],
      conn.query_params["limit"],
      [:creator]
    )
    render(conn, "index.json", meows: meows, viewer: current)
  end

  def show(conn, %{"id" => id}) do
    current = Auth.Token.Plug.current_resource(conn)
    with {:ok, meow} <- Contents.get_meow_by_id(id, [:creator]) do
      render(conn, "show.json", meow: meow, viewer: current)
    end
  end

  def create(conn, %{"meow" => meow_params}) do
    current = Auth.Token.Plug.current_resource(conn)
    with {:ok, meow} <- Contents.create_meow(meow_params, current) do
      conn
      |> put_status(:created)
      |> render("show.json", meow: meow, viewer: current)
    end
  end
end
