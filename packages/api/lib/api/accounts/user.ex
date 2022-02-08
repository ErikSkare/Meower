defmodule Api.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Pbkdf2
  alias __MODULE__
  alias Api.Contents.Meow

  schema "users" do
    field :email, :string, unique: true
    field :username, :string, unique: true
    field :avatar_url, :string, default: "http://localhost:4000/uploads/default.jpg"
    field :bio, :string, default: ""
    field :password, :string
    timestamps([type: :utc_datetime])

    has_many :meows, Meow, foreign_key: :creator_id, on_replace: :delete, on_delete: :delete_all
  end

  def update_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :username, :avatar_url, :bio])
    |> validate_required([:email, :username])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def create_changeset(attrs) do
    %User{}
    |> update_changeset(attrs)
    |> cast(attrs, [:password])
    |> validate_required([:password])
    |> validate_confirmation(:password, required: true)
    |> put_password_hash()
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    put_change(changeset, :password, add_hash(password).password_hash)
  end
  defp put_password_hash(%Ecto.Changeset{valid?: false} = changeset), do: changeset
end
