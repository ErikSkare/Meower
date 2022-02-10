defmodule ApiWeb.CommentController do
  use ApiWeb, :controller
  alias Api.Contents
  alias Api.Accounts.Auth

  action_fallback ApiWeb.FallbackController

  def index(conn, %{"meow_id" => meow_id}) do
    current = Auth.Token.Plug.current_resource(conn)
    with {:ok, meow} <- Contents.get_meow_by_id(meow_id) do
      comments = Contents.list_comments_by_meow(
        conn.query_params["cursor"],
        conn.query_params["limit"],
        meow,
        [:user]
      )
      render(conn, "index.json", comments: comments, viewer: current)
    end
  end

  def create(conn, %{"meow_id" => meow_id, "comment" => comment_params}) do
    current = Auth.Token.Plug.current_resource(conn)
    with {:ok, meow} <- Contents.get_meow_by_id(meow_id),
         {:ok, comment} <- Contents.create_comment(comment_params, current, meow)
    do
      render(conn, "show.json", comment: comment, viewer: current)
    end
  end
end
