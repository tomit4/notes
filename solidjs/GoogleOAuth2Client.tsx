import { createSignal } from "solid-js";
const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
const googleRedirectUri = import.meta.env.VITE_GOOGLE_OAUTH2_REDIRECT_URI;

const GoogleLogin = () => {
  const [accessToken, setAccessToken] = createSignal<string | null>(null);

  const oauthSignIn = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const params = {
      client_id: googleClientId,
      redirect_uri: googleRedirectUri,
      response_type: "token",
      scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
      included_granted_scopes: "true",
      state: "pass-through value",
    };

    const urlParams = new URLSearchParams(params).toString();
    const authUrl = `${oauth2Endpoint}?${urlParams}`;

    const authWindow = window.open(authUrl, "_blank", "width=500,height=600");

    const checkAuthWindow = () => {
      try {
        const url = authWindow?.location.href;
        if (url && url.includes("access_token")) {
          const accessTokenMatch = url.match(/access_token=([^&]+)/);
          const token = accessTokenMatch ? accessTokenMatch[1] : null;

          if (token) {
            setAccessToken(token);
            console.log("Access token :=>", token);
            authWindow?.close();
          }
        }
      } catch (error) {
        // Ignore cross-origin access errors while waiting for the user to sign in
      }
    };

    const intervalId = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(intervalId);
      } else {
        checkAuthWindow();
      }
    }, 500);
  };

  return (
    <div>
      <button onClick={oauthSignIn}>Sign Up With Google</button>
      {accessToken() && <p>Access Token: {accessToken()}</p>}
    </div>
  );
};

export default GoogleLogin;
