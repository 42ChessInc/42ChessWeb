export async function patchMatchResult(
  url: string,
  body: Record<string, unknown>,
  token?: string
) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.message || `Request failed: ${res.status}`);
  }
  return res.json();
}
