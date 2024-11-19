export const SignUpAction = async (user: {
  name: string;
  surname: string;
  email: string;
  password: string;
}) => {
  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        surname: user?.surname,
        email: user?.email,
        password: user.password,
      }),
    }
  );

  const signedUpUser = await resUser.json();
  if (signedUpUser.error) {
    return { error: signedUpUser.message };
  }
  return { success: "User signed up" };
};
