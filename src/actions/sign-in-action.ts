"use server";

export const SignInAction = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
      }
    );

    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const user = await res.json();
      if (user.error) {
        throw new Error(user.error);
      }
      return user;
    } else {
      const text = await res.text();
      throw new Error(text);
    }
  } catch (error) {
    return null;
  }
};
