import { Form, redirect, useLoaderData } from "@remix-run/react";
import { User, deleteUser, findUser } from "users";

export const loader = async ({ params }: { params: { id: string } }) => {
    const user = findUser(params.id);
    if (user === undefined) {
        return redirect("/");
    }

    return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
    });
};

export const action = async ({
    params,
    request,
}: {
    params: { id: string };
    request: Request;
}) => {
    const formData = await request.formData();
    const actionType = formData.get("action");

    if (actionType === "logout") {
        return redirect("/");
    }

    if (actionType === "delete") {
        deleteUser(params.id);
        return redirect("/");
    }
};

const Profile = () => {
    const user = useLoaderData<User>();

    const handleClientSideLogout = (action: string) => {
        if (action === "logout" || action === "delete") {
            localStorage.removeItem("userLogged");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-lg p-8 bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl text-white font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Welcome, {user.name}!
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">{user.email}</p>
                </div>

                <div className="space-y-4 mt-8">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Details</h2>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="font-medium">User ID:</span> {user.id}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Name:</span> {user.name}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span> {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <Form method="post" onSubmit={() => handleClientSideLogout("logout")} className="w-1/2">
                            <input type="hidden" name="action" value="logout" />
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200"
                            >
                                Logout
                            </button>
                        </Form>

                        <Form method="post" onSubmit={() => handleClientSideLogout("delete")} className="w-1/2">
                            <input type="hidden" name="action" value="delete" />
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200"
                            >
                                Delete Account
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;