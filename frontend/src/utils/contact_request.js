import client from "./apiClient";

export function contactRequest(params) {
  return client.post('contacts', params)
}
