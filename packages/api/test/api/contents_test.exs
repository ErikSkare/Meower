defmodule Api.ContentsTest do
  use Api.DataCase

  alias Api.Contents

  describe "meows" do
    alias Api.Contents.Meow

    import Api.ContentsFixtures

    @invalid_attrs %{content: nil, image_url: nil}

    test "list_meows/0 returns all meows" do
      meow = meow_fixture()
      assert Contents.list_meows() == [meow]
    end

    test "get_meow!/1 returns the meow with given id" do
      meow = meow_fixture()
      assert Contents.get_meow!(meow.id) == meow
    end

    test "create_meow/1 with valid data creates a meow" do
      valid_attrs = %{content: "some content", image_url: "some image_url"}

      assert {:ok, %Meow{} = meow} = Contents.create_meow(valid_attrs)
      assert meow.content == "some content"
      assert meow.image_url == "some image_url"
    end

    test "create_meow/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Contents.create_meow(@invalid_attrs)
    end

    test "update_meow/2 with valid data updates the meow" do
      meow = meow_fixture()
      update_attrs = %{content: "some updated content", image_url: "some updated image_url"}

      assert {:ok, %Meow{} = meow} = Contents.update_meow(meow, update_attrs)
      assert meow.content == "some updated content"
      assert meow.image_url == "some updated image_url"
    end

    test "update_meow/2 with invalid data returns error changeset" do
      meow = meow_fixture()
      assert {:error, %Ecto.Changeset{}} = Contents.update_meow(meow, @invalid_attrs)
      assert meow == Contents.get_meow!(meow.id)
    end

    test "delete_meow/1 deletes the meow" do
      meow = meow_fixture()
      assert {:ok, %Meow{}} = Contents.delete_meow(meow)
      assert_raise Ecto.NoResultsError, fn -> Contents.get_meow!(meow.id) end
    end

    test "change_meow/1 returns a meow changeset" do
      meow = meow_fixture()
      assert %Ecto.Changeset{} = Contents.change_meow(meow)
    end
  end

  describe "likes" do
    alias Api.Contents.Like

    import Api.ContentsFixtures

    @invalid_attrs %{}

    test "list_likes/0 returns all likes" do
      like = like_fixture()
      assert Contents.list_likes() == [like]
    end

    test "get_like!/1 returns the like with given id" do
      like = like_fixture()
      assert Contents.get_like!(like.id) == like
    end

    test "create_like/1 with valid data creates a like" do
      valid_attrs = %{}

      assert {:ok, %Like{} = like} = Contents.create_like(valid_attrs)
    end

    test "create_like/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Contents.create_like(@invalid_attrs)
    end

    test "update_like/2 with valid data updates the like" do
      like = like_fixture()
      update_attrs = %{}

      assert {:ok, %Like{} = like} = Contents.update_like(like, update_attrs)
    end

    test "update_like/2 with invalid data returns error changeset" do
      like = like_fixture()
      assert {:error, %Ecto.Changeset{}} = Contents.update_like(like, @invalid_attrs)
      assert like == Contents.get_like!(like.id)
    end

    test "delete_like/1 deletes the like" do
      like = like_fixture()
      assert {:ok, %Like{}} = Contents.delete_like(like)
      assert_raise Ecto.NoResultsError, fn -> Contents.get_like!(like.id) end
    end

    test "change_like/1 returns a like changeset" do
      like = like_fixture()
      assert %Ecto.Changeset{} = Contents.change_like(like)
    end
  end

  describe "comments" do
    alias Api.Contents.Comment

    import Api.ContentsFixtures

    @invalid_attrs %{content: nil}

    test "list_comments/0 returns all comments" do
      comment = comment_fixture()
      assert Contents.list_comments() == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert Contents.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      valid_attrs = %{content: "some content"}

      assert {:ok, %Comment{} = comment} = Contents.create_comment(valid_attrs)
      assert comment.content == "some content"
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Contents.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      comment = comment_fixture()
      update_attrs = %{content: "some updated content"}

      assert {:ok, %Comment{} = comment} = Contents.update_comment(comment, update_attrs)
      assert comment.content == "some updated content"
    end

    test "update_comment/2 with invalid data returns error changeset" do
      comment = comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Contents.update_comment(comment, @invalid_attrs)
      assert comment == Contents.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{}} = Contents.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Contents.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      comment = comment_fixture()
      assert %Ecto.Changeset{} = Contents.change_comment(comment)
    end
  end
end
