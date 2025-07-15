import { getToken } from "./token";

class Api {
  constructor({ baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // _getHeaders() {
  //    const token = getToken();
  // console.log("Token leído en _getHeaders:", token); // 👈
  //   return {
  //     Authorization: `Bearer ${getToken()}`,
  //     "Content-Type": "application/json",
  //   };
  // }


  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 403) {
      localStorage.removeItem('jwt');
      return Promise.reject('No autorizado, redirigiendo a login');
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
    });
  }
  getUserCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  } 

  editUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  createCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error al crear la tarjeta");
    });
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      // method: isLiked ? "DELETE" : "PUT",
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error al dar Like");
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error al eliminar la tarjeta");
      }
    });
  }
  resetProfilePic(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: url }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error al actualizar la foto");
      }
    });
  }
}

export const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  
   headers: {
    authorization: "68d25659-39a7-419d-bdd8-a2efe774d95f",
  //   authorization: `Bearer ${getToken()}`,
     "Content-type": "application/json",
  },
});
