export const baseURL = "http://localhost:8090";

export async function addUser(email, password, name, surname, city) {
  const response = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
      surname,
      city,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.status === 400) {
    throw new Error("такой пользователь уже есть");
  } else if (!response.ok) {
    throw new Error("ошибка сервера");
  }

  const data = await response.json();
  return data;
}

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

export async function getUser(access_token) {
  const response = await fetch(`${baseURL}/user`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("токен не рабочий");
  } else if (!response.ok) {
    throw new Error("ошибка сервера");
  }

  const data = await response.json();
  return data;
}

export async function updateUser(
  name = "",
  surname = "",
  city = "",
  phone = ""
) {
  const access_token = localStorage.getItem("access_token");
  const response = await fetch(`${baseURL}/user`, {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      surname: surname,
      city: city,
      phone: phone,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("токен не рабочий");
  } else if (!response.ok) {
    throw new Error("ошибка сервера");
  }

  const data = await response.json();
  return data;
}

export async function setAvatarUser(body) {
  const access_token = localStorage.getItem("access_token");
  const formData = new FormData();
  console.log(body)
  formData.append("file", body);

  const response = await fetch(`${baseURL}/user/avatar`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${access_token}`,
      // "Content-Type": undefined,
    },
  });

  if (response.status === 401) {
    throw new Error("токен не рабочий");
  } else if (!response.ok) {
    throw new Error("ошибка сервера");
  }

  const data = await response.json();
  return data;
}
