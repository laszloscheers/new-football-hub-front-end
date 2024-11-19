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
      console.error("Login failed:", errorData);
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const adminSessionToken = await res.json();
      if (adminSessionToken.error) {
        console.error("User error:", adminSessionToken.error);
        throw new Error(adminSessionToken.error);
      }
      return adminSessionToken.token;
    } else {
      const text = await res.text();
      console.error("Unexpected response format:", text);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during admin sign-in:", error);
    return { error: "Something went wrong" };
  }
};
