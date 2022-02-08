defmodule ApiWeb.LikeView do
  use ApiWeb, :view
  alias ApiWeb.LikeView
  alias ApiWeb.UserView

  def render("index.json", %{likes: likes, viewer: viewer}) do
    render_many(likes, LikeView, "like.json", viewer: viewer)
  end

  def render("show.json", %{like: like, viewer: viewer}) do
    render_one(like, LikeView, "like.json", viewer: viewer)
  end

  def render("like.json", %{like: like, viewer: viewer}) do
    %{
      id: like.id,
      user: render_one(like.user, UserView, "show.json", viewer: viewer),
      meow_id: like.meow_id
    }
  end
end
