defmodule ApiWeb.FallbackController do
  use ApiWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(ApiWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, :no_token_found}) do
    conn
    |> put_status(:bad_request)
    |> json(%{detail: "No token found"})
  end

  def call(conn, {:error, :bad_token}) do
    conn
    |> put_status(:bad_request)
    |> json(%{detail: "Bad token"})
  end
end
