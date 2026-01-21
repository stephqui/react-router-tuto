import {
  Form,
  href,
  Link,
  Outlet,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router";
import { addUser, getUsers } from "~/users.servers";
import type { Route } from "./+types/_usersLayout";
import { isRouteErrorResponse, useRouteError } from "react-router";

export async function loader({}: Route.LoaderArgs) {
  return { usersArray: await getUsers() };
}

export default function Users() {
  const { usersArray } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="px-8 py-2 flex flex-row gap-4">
        <ul className="flex flex-col gap-4 basis-[400px] flex-1">
          <div className="flex flex-row gap-2 w-full justify-between">
            <h1 className="text-2xl font-bold">Utilisateurs</h1>
            <Link
              to={href("/users/:userSlug", {
                userSlug: "new",
              })}
              className="px-4 py-2 bg-emerald-600 text-white"
            >
              Ajouter un utilisateur
            </Link>
          </div>
          {usersArray.map((user) => (
            <li
              key={user.id}
              className="text-lg font-mono p-4 bg-white
            shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <Link
                className="text-blue-500 hover:text-blue-700 text-xl"
                to={href("/users/:userSlug", {
                  userSlug: user.slug,
                })}
              >
                {user.name}
              </Link>
            </li>
          ))}

          {/* <Form method="POST" className="mt-6 flex gap-2">
            <input
              type="text"
              name="name"
              className="px-3 py-2 border border-gray-300 focus:outline-none"
              placeholder="Nom d'utilisateur"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
              Ajouter un utilisateur
            </button>
          </Form>*/}
        </ul>

        <div className="basis-[400px] flex-1 bg-slate-100 size-[400px] rounded-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  console.log({ name });
  await addUser({ name: name });
  return { ok: true };
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
