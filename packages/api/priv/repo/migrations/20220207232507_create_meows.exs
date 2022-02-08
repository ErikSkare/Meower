defmodule Api.Repo.Migrations.CreateMeows do
  use Ecto.Migration

  def change do
    create table(:meows) do
      add :content, :string
      add :image_url, :string
      add :creator_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:meows, [:creator_id])
  end
end
