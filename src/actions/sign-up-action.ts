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

    const contentType = resUser.headers.get("content-type");
    if (!resUser.ok) {
      const errorData = await resUser.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const newUser = await resUser.json();
      if (newUser.error) {
        console.error("User error:", newUser.error);
        throw new Error(newUser.error);
      }
      return { success: "User signed up" };
    } else {
      const text = await resUser.text();
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
