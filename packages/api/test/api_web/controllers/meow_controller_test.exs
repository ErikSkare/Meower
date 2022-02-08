defmodule ApiWeb.MeowControllerTest do
  use ApiWeb.ConnCase

  import Api.ContentsFixtures

  alias Api.Contents.Meow

  @create_attrs %{
    content: "some content",
    image_url: "some image_url"
  }
  @update_attrs %{
    content: "some updated content",
    image_url: "some updated image_url"
  }
  @invalid_attrs %{content: nil, image_url: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all meows", %{conn: conn} do
      conn = get(conn, Routes.meow_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create meow" do
    test "renders meow when data is valid", %{conn: conn} do
      conn = post(conn, Routes.meow_path(conn, :create), meow: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.meow_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "content" => "some content",
               "image_url" => "some image_url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.meow_path(conn, :create), meow: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update meow" do
    setup [:create_meow]

    test "renders meow when data is valid", %{conn: conn, meow: %Meow{id: id} = meow} do
      conn = put(conn, Routes.meow_path(conn, :update, meow), meow: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.meow_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "content" => "some updated content",
               "image_url" => "some updated image_url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, meow: meow} do
      conn = put(conn, Routes.meow_path(conn, :update, meow), meow: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete meow" do
    setup [:create_meow]

    test "deletes chosen meow", %{conn: conn, meow: meow} do
      conn = delete(conn, Routes.meow_path(conn, :delete, meow))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.meow_path(conn, :show, meow))
      end
    end
  end

  defp create_meow(_) do
    meow = meow_fixture()
    %{meow: meow}
  end
end
