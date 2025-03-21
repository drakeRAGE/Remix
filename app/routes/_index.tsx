import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { User, addUser, findUserByEmailPassword } from "users";
import { v4 as uuidv4 } from 'uuid';

type ActionData = {
  error?: string;
  user?: User;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return Response.json(
      {
        error: "Email and password are required."
      },
      {
        status: 400,
      }
    );
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  }

  const existingUser = findUserByEmailPassword(email, password);
  const user = existingUser ?? newUser;

  if (existingUser === undefined) {
    addUser(user);
  }

  return Response.json({ user }, { status: 200 })
}

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userLogged');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      location.pathname = `/profile/${user.id}`;
    }

    if (actionData?.user) {
      localStorage.setItem('userLogged', JSON.stringify(actionData.user));
      navigate(`/profile/${actionData.user.id}`);
    }
  }, [actionData, navigate]);

  // Add error display
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900 p-12 items-center justify-center">
        <div className="max-w-lg">
          <h2 className="text-5xl font-bold text-white mb-6">Welcome Back!</h2>
          <p className="text-purple-200 text-lg">Enter your personal details and start your journey with us.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-12">
        <div className="max-w-md w-full">
          {actionData?.error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
              {actionData.error}
            </div>
          )}
          {/* Rest of your form remains the same */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-2">Dragbos</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <Form method="post" className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-fuchsia-700 transition duration-200 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}