import client from "./apiClient";

export function getCSRFToken() {
  return client.get('csrf_token');
}
