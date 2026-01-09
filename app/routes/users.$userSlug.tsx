import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getUserBySlug } from "~/users.servers";

export async function loader({ params }: LoaderFunctionArgs) {
  const userSlug = params.userSlug as string;
  const user = await getUserBySlug({ slug: userSlug });
  console.log({ user });
  return { user };
}

export default function User() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-2xl font-bold">{user?.name}</h1>
    </div>
  );
}
