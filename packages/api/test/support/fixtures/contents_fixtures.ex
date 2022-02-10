defmodule Api.ContentsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Contents` context.
  """

  @doc """
  Generate a meow.
  """
  def meow_fixture(attrs \\ %{}) do
    {:ok, meow} =
      attrs
      |> Enum.into(%{
        content: "some content",
        image_url: "some image_url"
      })
      |> Api.Contents.create_meow()

    meow
  end

  @doc """
  Generate a like.
  """
  def like_fixture(attrs \\ %{}) do
    {:ok, like} =
      attrs
      |> Enum.into(%{

      })
      |> Api.Contents.create_like()

    like
  end

  @doc """
  Generate a comment.
  """
  def comment_fixture(attrs \\ %{}) do
    {:ok, comment} =
      attrs
      |> Enum.into(%{
        content: "some content"
      })
      |> Api.Contents.create_comment()

    comment
  end
end
