defmodule Api.Accounts.Auth.AccessPipeline do
  use Guardian.Plug.Pipeline,
   otp_app: :api,
   module: Api.Accounts.Auth.Token,
   error_handler: Api.Accounts.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
