
export async function signUp(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (response.ok && data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }

  return data;
}

export async function getUser() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "GET",
    credentials: "include", // Para mantener la sesión
  });
  return response.json();
}

export async function signOut() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
}
