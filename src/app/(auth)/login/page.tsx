import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <div className="w-full">
        {searchParams?.message && (
          <div className="max-w-md mx-auto mb-4 p-4 text-sm font-medium text-green-800 bg-green-100 rounded-md">
            {searchParams.message}
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
