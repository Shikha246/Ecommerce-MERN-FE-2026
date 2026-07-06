
// Your JWT token already contains the user's ID inside it (your backend signs it with { userId: user.id, ... }), so we can read it directly without an extra API call.


export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.userId;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};