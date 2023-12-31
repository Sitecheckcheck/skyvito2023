export const baseURL = "http://localhost:8090";

export async function getTokens(email, password) {
  const response = await fetch(`${baseURL}/auth/login/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("email/пароль не верный");
  } else if (!response.ok) {
    throw new Error("ошибка сервера");
  }

  const data = await response.json();
  return data;
}
