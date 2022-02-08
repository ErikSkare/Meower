defmodule Api.Repo.Migrations.CreateLikes do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :user_id, references(:users, on_delete: :nothing)
      add :meow_id, references(:meows, on_delete: :nothing)

      timestamps()
    end

    create index(:likes, [:user_id])
    create index(:likes, [:meow_id])
  end
end
