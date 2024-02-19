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

export const getSessions = async ({
  token,
}: {
  token: string;
}): Promise<any> => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/session`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const responseData = await response.json();
  return responseData;
};

export const getSessionQuery = async ({
  token,
  searchQuery,
}: {
  token: string;
  searchQuery: string;
}): Promise<any> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/session/${searchQuery}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const responseData = await response.json();
  return responseData;
};
