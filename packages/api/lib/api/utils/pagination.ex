defmodule Api.Utils.Pagination do
  import Ecto.Query

  def paginate(query, cursor, limit) do
    if is_nil(cursor) do
      from [x] in query,
      limit: ^limit,
      order_by: [desc: x.id]
    else
      from [x] in query,
      where: x.id < ^cursor,
      limit: ^limit,
      order_by: [desc: x.id]
    end
  end
end
