import { SHA256 } from "crypto-js";

export class Userservice {
  static async login(username: string, password: string) {
    const pwd_hash = SHA256(password);

    const credentials = `${username}:${pwd_hash}`;
    const auth = {
      method: "GET",
      Authorization: `Basic ${Buffer.from(credentials).toString("base64")}`,
    };
    const resp = await fetch("/backend/users/signin", { headers: auth });
    const data = await resp.json();
    if (data.status === "success") return data.data;
    else return null;
  }

  static async register(username: string, password: string) {
    const pwd_hash = SHA256(password);

    const credentials = `${username}:${pwd_hash}`;
    const auth = {
      method: "GET",
      Authorization: `Basic ${Buffer.from(credentials).toString("base64")}`,
    };
    const resp = await fetch("/backend/users/signup", { headers: auth });
    const data = await resp.json();
    if (data.status === "success") return data.data;
    else return null;
  }

  static StoreJWT(access_token: string) {
    // store access_token in cookie
    document.cookie = `access_token=${access_token}; path=/;`;
  }

  static async verifyAccessToken(access_token: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token}`);

    const response = await fetch("/backend/verifyJWT", { headers });
    const data = await response.json();
    return data;
  }

  static parseJwt() {
    const cookie = document.cookie;
    if (cookie !== null || cookie !== undefined) {
      const accessToken = cookie
        .split(";")
        .find((c) => c.trim().startsWith("access_token="))!
        .split("=")[1];

      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      return decoded;
    }
    return null;
  }

  static async checkLoginStatus(access_token: string) {
    if (access_token !== null) {
      const res = await Userservice.verifyAccessToken(access_token);
      if (res.res) return res.res;
    }

    return null;
  }

  static async getUserNameById(id: string) {
    if (id !== null || id !== undefined) {
      const resp = await fetch(`/backend/users/${id}`, {
        method: "GET",
      });

      const data = await resp.json();
      if (data.status === "success") return data.data[0].name as string;
      else return null;
    }
    return null
  }
}
