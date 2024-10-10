import { TLoginBody, TRegisterBody } from "@/types";
import axios from "axios";
import config from "@/config";

const BASE_URL = config.server_url;

export class UserAPI {
  static async login(data: TLoginBody) {
    return axios.post(`${BASE_URL}/auth/login`, data);
  }

  static async register(data: TRegisterBody) {
    return axios.post(`${BASE_URL}/auth/register`, data);
  }
}
