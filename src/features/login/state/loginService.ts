export interface LoginResult {
  token: string;
  userID: string;
}

export async function authenticate(userID: string, password: string): Promise<LoginResult> {
  const credentials = btoa(`${userID}:${password}`);

  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/authenticate`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const authHeader = response.headers.get("Authorization");
  const token = authHeader!.slice("Bearer ".length);

  const payload = JSON.parse(atob(token.split(".")[1])); // JWT payload is the second part of the token

  return {
    token,
    userID: payload.userID,
  };
}
