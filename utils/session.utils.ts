export const storeSession = async ({
  session,
  token,
}: {
  session: any;
  token: string;
}) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/session`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(session),
  });
};
