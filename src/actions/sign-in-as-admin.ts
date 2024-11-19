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

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const adminSessionToken = await res.json();
      if (adminSessionToken.error) {
        console.error("Admin session error:", adminSessionToken.error);
        throw new Error(adminSessionToken.error);
      }
      return adminSessionToken.token;
    } else {
      const text = await res.text();
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
