defmodule ApiWeb.CommentView do
  use ApiWeb, :view
  alias ApiWeb.CommentView
  alias ApiWeb.UserView

  def render("index.json", %{comments: comments, viewer: viewer}) do
    render_many(comments, CommentView, "comment.json", viewer: viewer)
  end

  def render("show.json", %{comment: comment, viewer: viewer}) do
    render_one(comment, CommentView, "comment.json", viewer: viewer)
  end

  def render("comment.json", %{comment: comment, viewer: viewer}) do
    %{
      id: comment.id,
      user: render_one(comment.user, UserView, "show.json", viewer: viewer),
      content: comment.content,
      inserted_at: comment.inserted_at
    }
  end
end
