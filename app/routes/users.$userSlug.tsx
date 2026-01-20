import { isRouteErrorResponse, useRouteError } from "react-router";
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
  //throw new Error("test error");
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-8 py-2">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-red-500">{error.message}</p>
        {/*<p>The stack trace is:</p>
        <pre>{error.stack}</pre>*/}
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
