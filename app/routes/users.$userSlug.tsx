import { Form, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getUserBySlug } from "~/users.servers";

export async function loader({ params }: LoaderFunctionArgs) {
  const userSlug = params.userSlug as string;
  const user = await getUserBySlug({ slug: userSlug });
  if (!user) {
    throw new Response(`User ${userSlug} was not found`, {
      status: 404,
    });
  }
  console.log({ user });
  return { user };
}

export default function User() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="px-8 py-2">
      <Form
        method="post"
        className="flex flex-col gap-3 p-4 
      bg-white rounded-lg shadow-sm"
      >
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Modifier
        </button>
      </Form>
      {/*<h1 className="text-2xl font-bold">{user?.name}</h1>*/}
    </div>
  );
}
