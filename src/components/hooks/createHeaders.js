export default function useHeaderHook() {
  function createHeaders(token) {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    if (token) {
      requestHeaders.append("Authorization", `Bearer ${token}`);
    }
    return requestHeaders;
  }
  return { createHeaders };
}
