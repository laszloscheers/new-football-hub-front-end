export const SignInAsAdministrator = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        }),
      }
    );

    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const adminSessionToken = await res.json();
      if (adminSessionToken.error) {
        throw new Error(adminSessionToken.error);
      }
      return adminSessionToken.token;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during admin sign-in:", error);
    return { error: "Something went wrong" };
  }
};
