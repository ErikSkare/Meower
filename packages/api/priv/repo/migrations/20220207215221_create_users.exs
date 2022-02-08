defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :username, :string
      add :avatar_url, :string
      add :bio, :string
      add :password, :string

      timestamps()
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:email])
  end
end
