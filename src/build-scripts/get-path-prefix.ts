export function getPathPrefix(url: String) {
  const isRelative = import.meta.env.RELATIVE_PATHS == "yes";
  return `${isRelative ? "" : url}`;
}
