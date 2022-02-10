defmodule ApiWeb.CommentControllerTest do
  use ApiWeb.ConnCase

  import Api.ContentsFixtures

  alias Api.Contents.Comment

  @create_attrs %{
    content: "some content"
  }
  @update_attrs %{
    content: "some updated content"
  }
  @invalid_attrs %{content: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all comments", %{conn: conn} do
      conn = get(conn, Routes.comment_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create comment" do
    test "renders comment when data is valid", %{conn: conn} do
      conn = post(conn, Routes.comment_path(conn, :create), comment: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.comment_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "content" => "some content"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.comment_path(conn, :create), comment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update comment" do
    setup [:create_comment]

    test "renders comment when data is valid", %{conn: conn, comment: %Comment{id: id} = comment} do
      conn = put(conn, Routes.comment_path(conn, :update, comment), comment: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.comment_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "content" => "some updated content"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, comment: comment} do
      conn = put(conn, Routes.comment_path(conn, :update, comment), comment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete comment" do
    setup [:create_comment]

    test "deletes chosen comment", %{conn: conn, comment: comment} do
      conn = delete(conn, Routes.comment_path(conn, :delete, comment))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.comment_path(conn, :show, comment))
      end
    end
  end

  defp create_comment(_) do
    comment = comment_fixture()
    %{comment: comment}
  end
end
