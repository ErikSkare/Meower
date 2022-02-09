defmodule Api.Utils.Uploader do
  import Ecto.Changeset

  @base_url "http://localhost:4000"
  @accept_only [".jpg", ".png"]

  def cast_upload(%Ecto.Changeset{valid?: true} = changeset, attrs, param, dest) do
    if upload = attrs[param] do
      extension = Path.extname(upload.filename)
      if extension in @accept_only do
        path = "uploads/#{get_file_name()}#{extension}"
        File.cp(upload.path, path)
        put_change(changeset, dest, "#{@base_url}/#{path}")
      else
        add_error(changeset, dest, "wrong file format")
      end
    else
      changeset
    end
  end

  def cast_upload(%Ecto.Changeset{valid?: false} = changeset, _attrs, _param, _dest), do: changeset

  defp get_file_name() do
    time = DateTime.utc_now()
    "media_#{time.year}_#{time.month}_#{time.day}_#{time.hour}_#{time.minute}_#{time.second}_#{elem(time.microsecond, 0)}"
  end
end
