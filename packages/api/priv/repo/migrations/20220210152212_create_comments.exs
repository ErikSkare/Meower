defmodule Api.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :content, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :meow_id, references(:meows, on_delete: :nothing)

      timestamps()
    end

    create index(:comments, [:user_id])
    create index(:comments, [:meow_id])
  end
end
