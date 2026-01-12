import {
  Form,
  href,
  Link,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router";
import { addUser, getUsers } from "~/users.servers";
import type { Route } from "./+types/users";

export async function loader({}: Route.LoaderArgs) {
  return { usersArray: await getUsers() };
}

export default function Users() {
  const { usersArray } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="px-8 py-2 flex flex-row gap-4">
        <ul className="flex flex-col gap-4 max-w-[400px]">
          <h1 className="text-2xl font-bold">Utilisateurs</h1>
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

          <Form method="POST" className="mt-6 flex gap-2">
            <input
              type="text"
              name="name"
              className="px-3 py-2 border border-gray-300 focus:outline-none"
              placeholder="Nom d'utilisateur"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
              Ajouter un utilisateur
            </button>
          </Form>
        </ul>

        <div className="basis-[400px] flex-1 bg-slate-100 size-[400px] rounded-lg">
          <h2 className="flex items-center justify-center size-full">
            Veuillez sélectionner un profil
          </h2>
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
