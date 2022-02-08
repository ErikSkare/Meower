defmodule Api.Accounts do
  import Ecto.Query, warn: false
  import Pbkdf2
  alias Api.Repo
  alias Api.Accounts.User

  def get_user_by_id(id, preloads \\ []) do
    case Repo.get(User, id) do
      nil -> {:error, :not_found}
      user -> {:ok, Repo.preload(user, preloads)}
    end
  end

  def get_user_by_username(username, preloads \\ []) do
    case Repo.get_by(User, username: username) do
      nil -> {:error, :not_found}
      user -> {:ok, Repo.preload(user, preloads)}
    end
  end

  def get_user_by_credentials(email, password, preloads \\ []) do
    case Repo.get_by(User, email: email) do
      nil -> {:error, :not_found}
      user ->
        if verify_pass(password, user.password) do
          {:ok, Repo.preload(user, preloads)}
        else
          {:error, :not_found}
        end
    end
  end

  def create_user(attrs \\ %{}) do
    User.create_changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.update_changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end
end
