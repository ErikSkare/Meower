defmodule Api.Contents.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias __MODULE__
  alias Api.Accounts.User
  alias Api.Contents.Meow

  schema "comments" do
    belongs_to :user, User
    belongs_to :meow, Meow
    field :content, :string
    timestamps([type: :utc_datetime])
  end

  def update_changeset(comment, attrs) do
    comment
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end

  def create_changeset(attrs, %User{} = user, %Meow{} = meow) do
    %Comment{}
    |> update_changeset(attrs)
    |> put_assoc(:user, user)
    |> put_assoc(:meow, meow)
  end
end
