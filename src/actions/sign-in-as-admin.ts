export const SignInAsAdministrator = async () => {
  const resAdminSession = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
    {
      method: "POST",
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  const adminSessionToken = await resAdminSession.json();
  if (adminSessionToken.error) {
    return { error: "Something went wrong" };
  }
  return adminSessionToken.token;
};
