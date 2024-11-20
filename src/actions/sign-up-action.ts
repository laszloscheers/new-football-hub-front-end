"use server";

export const SignUpAction = async (user: {
  name: string;
  surname: string;
  email: string;
  password: string;
}) => {
  try {
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
          password: user?.password,
        }),
      }
    );

    if (resUser.status === 201) {
      return { success: "User signed up" };
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
