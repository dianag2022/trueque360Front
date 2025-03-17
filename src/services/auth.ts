const API_URL = "http://localhost:3001/auth"; // Ajusta la URL si es necesario

export async function signUp(email: string, password: string) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function getUser() {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    credentials: "include", // Para mantener la sesión
  });
  return response.json();
}

export async function signOut() {
  const response = await fetch(`${API_URL}/signout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
}
