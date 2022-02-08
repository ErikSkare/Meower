defmodule ApiWeb.UserView do
  use ApiWeb, :view
  alias ApiWeb.UserView

  def render("index.json", %{users: users, viewer: viewer}) do
    render_many(users, UserView, "user.json", viewer: viewer)
  end

  def render("show.json", %{user: user, viewer: viewer}) do
    render_one(user, UserView, "user.json", viewer: viewer)
  end

  def render("user.json", %{user: user, viewer: user}) do
    %{
      id: user.id,
      email: user.email,
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio
    }
  end

  def render("user.json", %{user: user, viewer: _viewer}) do
    %{
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio
    }
  end
end
