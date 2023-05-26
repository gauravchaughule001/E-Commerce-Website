import axios from "axios";
import { config } from "../config/config";

export const client=axios.create({
    baseURL: config.BASE_URL,
    imageUrl: config.IMAGE_BASE_URL
})