defmodule ApiWeb.MeowView do
  use ApiWeb, :view
  alias ApiWeb.MeowView
  alias ApiWeb.UserView
  alias Api.Contents.Meow

  def render("index.json", %{meows: meows, viewer: viewer}) do
    render_many(meows, MeowView, "meow.json", viewer: viewer)
  end

  def render("show.json", %{meow: meow, viewer: viewer}) do
    render_one(meow, MeowView, "meow.json", viewer: viewer)
  end

  def render("meow.json", %{meow: meow, viewer: viewer}) do
    %{
      id: meow.id,
      creator: render_one(meow.creator, UserView, "show.json", viewer: viewer),
      content: meow.content,
      image_url: meow.image_url,
      inserted_at: meow.inserted_at,
      has_liked: Meow.has_liked?(viewer, meow),
      like_count: Meow.like_count(viewer, meow)
    }
  end
end
