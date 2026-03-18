import { retryRequest } from "@/utils/retry";
import api from "./api";

export async function getCourses() {
  const res = await retryRequest(() => api.get("/public/randomproducts"));

  return res.data;
}
export async function getInstructors() {
  const res = await api.get("/public/randomusers");
  return res.data;
}
