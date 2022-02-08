defmodule Api.Contents.Like do
  use Ecto.Schema
  import Ecto.Changeset
  alias __MODULE__
  alias Api.Accounts.User
  alias Api.Contents.Meow

  schema "likes" do
    belongs_to :user, User
    belongs_to :meow, Meow
    timestamps([type: :utc_datetime])
  end

  def create_changeset(%User{} = user, %Meow{} = meow) do
    %Like{}
    |> change()
    |> put_assoc(:user, user)
    |> put_assoc(:meow, meow)
  end
end
