import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage= () => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-500">
      <ErrorCard />
    </div>
  )
}

export default AuthErrorPage;