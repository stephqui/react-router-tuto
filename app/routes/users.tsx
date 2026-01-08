import {
  Form,
  Link,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router";
import { addUser, getUsers } from "~/users.servers";

export async function loader() {
  return { usersArray: await getUsers() };
}

export default function Users() {
  const { usersArray } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="px-8 py-2">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <ul>
          {usersArray.map((user) => (
            <li key={user.id} className="text-lg font-mono">
              <Link
                className="text-blue-500 hover:text-blue-700"
                to={`/users/${user.slug}`}
              >
                {" "}
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
        <Form method="POST">
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
