export const shortenURL = async (data) => {
  const res = await fetch("https://api.affordmed.com/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Shorten API failed");
  return await res.json();
};