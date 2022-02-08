defmodule Api.Contents.Meow do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias __MODULE__
  alias Api.Repo
  alias Api.Accounts.User
  alias Api.Contents.Like

  schema "meows" do
    belongs_to :creator, User
    field :content, :string
    field :image_url, :string, default: ""
    timestamps([type: :utc_datetime])

    has_many :likes, Like, foreign_key: :meow_id, on_replace: :delete, on_delete: :delete_all

    field :has_liked, :boolean, virtual: :true
    field :like_count, :integer, virtual: true
  end

  def update_changeset(meow, attrs) do
    meow
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end

  def create_changeset(attrs, %User{} = creator) do
    %Meow{}
    |> update_changeset(attrs)
    |> cast(attrs, [:image_url])
    |> put_assoc(:creator, creator)
  end

  def has_liked?(%User{} = viewer, %Meow{} = meow) do
    query =
      from l in Like,
      where: l.user_id == ^viewer.id and l.meow_id == ^meow.id
    Repo.exists?(query)
  end

  def like_count(%User{}, %Meow{} = meow) do
    query =
      from l in Like,
      where: l.meow_id == ^meow.id,
      select: count(l.id)
    Repo.one(query)
  end
end
