export default function buildQueryString(
  url: string,
  params: Record<string, string | number | undefined>
) {
  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  Object.entries(params).forEach(([key, value]) =>
    key && value ? urlParams.set(key, value.toString()) : urlParams.delete(key)
  );

  return `${url}${urlParams ? `?${urlParams.toString()}` : ""}`;
}
