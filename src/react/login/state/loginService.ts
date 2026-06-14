const Backend_URL = "https://localhost:443";

export interface LoginResult {
  token: string;
  userID: string;
  isAdministrator: boolean;
}

export async function authenticate(userID: string, password: string): Promise<LoginResult> {
  const credentials = btoa(`${userID}:${password}`);

  const response = await fetch(`${Backend_URL}/api/authenticate`, {
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

  const data = await response.json();

  return {
    token,
    userID: data.userID,
    isAdministrator: data.isAdministrator,
  };
}
