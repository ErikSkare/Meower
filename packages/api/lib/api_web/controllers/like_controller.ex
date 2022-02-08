defmodule ApiWeb.LikeController do
  use ApiWeb, :controller
  alias Api.Accounts.Auth
  alias Api.Contents

  action_fallback ApiWeb.FallbackController

  def toggle(conn, %{"id" => id}) do
    current = Auth.Token.Plug.current_resource(conn)
    with {:ok, meow} <- Contents.get_meow_by_id(id) do
      Contents.toggle_like(current, meow)
      send_resp(conn, :no_content, "")
    end
  end
end
