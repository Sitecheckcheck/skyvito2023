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

// export async function updateToken(access_token, refresh_token) {
//   const response = await fetch(`${baseURL}/auth/login`, {
//     method: "PUT",
//     body: JSON.stringify({
//       access_token: access_token,
//       refresh_token: refresh_token,
//     }),
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   if (!response.ok && !response.status === "401") {
//     throw new Error("Сервер сломался");
//   }

//   const data = await response.json();

//   localStorage.getItem("access_token", data.access_token);
//   localStorage.getItem("refresh_token", data.refresh_token);
//   return data;
// }

export async function getUser(access_token, refresh_token) {
  let response = await fetch(`${baseURL}/user`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {

      // const newToken = await updateToken(access_token, refresh_token);

      // response = await fetch(`${baseURL}/user`, {
      //   method: "GET",
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: `Bearer ${newToken.access_token}`,
      //   },
      // });
    } else {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await response.json();
  return data;
}

export async function addProductText(access_token, title, description, price) {
  let response = await fetch(`${baseURL}/adstext`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: {
      title: title,
      description: description,
      price: price,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {

      // const newToken = await updateToken(access_token, localStorage.getItem("refresh_token"));

      // response = await fetch(`${baseURL}/adstext`, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: `Bearer ${newToken.access_token}`,
      //   },
      //   body: {
      //     title: title,
      //     description: description,
      //     price: price,
      //   },
      // });
    } else {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await response.json();
  return data;
}

export async function getProductsMe(access_token) {
  let response = await fetch(`${baseURL}/ads/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {


      // const newToken = await updateToken(access_token, localStorage.getItem("refresh_token"));

      // console.log(newToken)

      // response = await fetch(`${baseURL}/ads/me`, {
      //   method: "GET",
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: `Bearer ${newToken.access_token}`,
      //   },
      // });
    } else {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await response.json();
  return data;
}

// export async function addFavorite(id, accessToken) {
//   const response = await fetch(`${baseURL}/catalog/track/${id}/favorite/`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'content-type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     if (response.status === 401) {
//       const refteshToken = localStorage.getItem('refresh');
//       const token = await refreshingToken(refteshToken);

//       localStorage.setItem('access', token.access);

//       const access = localStorage.getItem('access');

//       fetch(
//         `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${access}`,
//             'content-type': 'application/json',
//           },
//         },
//       );
//       // window.location.reload();
//     } else {
//       throw new Error('Ошибка сервера');
//     }
//   }
//   const data = await response.json();
//   return data;
// }

// export async function deleteFavorite(id, accessToken) {
//   const response = await fetch(`${baseURL}/catalog/track/${id}/favorite/`, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'content-type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     if (response.status === 401) {
//       const refteshToken = localStorage.getItem('refresh');
//       const token = await refreshingToken(refteshToken);

//       localStorage.setItem('access', token.access);

//       const access = localStorage.getItem('access');

//       fetch(
//         `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${access}`,
//             'content-type': 'application/json',
//           },
//         },
//       );
//       // window.location.reload();
//     } else {
//       throw new Error('Ошибка сервера');
//     }
//   }

//   const data = await response.json();

//   return data;
// }
