export function useGetSession() {
  const data = {
    user: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    session: {
      id: "1",
      userId: "1",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      token: "1234567890",
    },
  };
  return { data, isPending: false, error: null };
}
