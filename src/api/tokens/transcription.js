export const GET = async (req, res) => {
  const response = await fetch("https://api.assemblyai.com/v2/realtime/token", {
    method: "POST",
    body: JSON.stringify({ expires_in: 3600 }),
    headers: {
      Authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY,
      "Content-Type": "application/json",
    },
  });
  const token = await response.json();
  console.log(token);
  return res.json(token);
};
