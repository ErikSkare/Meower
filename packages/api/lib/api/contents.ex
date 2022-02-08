defmodule Api.Contents do
  import Ecto.Query, warn: false
  alias Api.Repo
  alias Api.Accounts.User
  alias Api.Contents.Meow
  alias Api.Contents.Like
  alias Api.Utils.Pagination

  def list_meows(cursor \\ nil, limit \\ 5, preloads \\ []) do
    Meow
    |> Pagination.paginate(cursor, limit)
    |> Repo.all()
    |> Repo.preload(preloads)
  end

  def get_meow_by_id(id, preloads \\ []) do
    case Repo.get(Meow, id) do
      nil -> {:error, :not_found}
      user -> {:ok, Repo.preload(user, preloads)}
    end
  end

  def create_meow(attrs \\ %{}, %User{} = creator) do
    Meow.create_changeset(attrs, creator)
    |> Repo.insert()
  end

  def update_meow(%Meow{} = meow, attrs) do
    meow
    |> Meow.update_changeset(attrs)
    |> Repo.update()
  end

  def delete_meow(%Meow{} = meow) do
    Repo.delete(meow)
  end

  def toggle_like(%User{} = user, %Meow{} = meow) do
    case Repo.get_by(Like, user_id: user.id, meow_id: meow.id) do
      nil ->
        Like.create_changeset(user, meow)
        |> Repo.insert()
      meow ->
        Repo.delete(meow)
    end
  end
end
