import { resolve } from "path";

const db = {
  users: [
    { id: 1, name: "Virgile", slug: "vir" },
    { id: 2, name: "Robert", slug: "rob" },
    { id: 3, name: "Alain", slug: "ala" },
    { id: 4, name: "Bob", slug: "bob" },
  ],
  userSettings: [
    { id: 1, userId: 1, settings: { theme: "light" } },
    { id: 2, userId: 2, settings: { theme: "dark" } },
    { id: 3, userId: 3, settings: { theme: "light" } },
    { id: 4, userId: 4, settings: { theme: "dark" } },
  ],
};

export async function getUsers() {
  //On simule un délai
  //await new Promise((resolve) => setTimeout(resolve, 100));
  return db.users;
}

export async function addUser({ name }: { name: string }) {
  const newUser = { id: db.users.length + 1, name, slug: name.toLowerCase() };
  db.users.push(newUser);
  return newUser;
}

export async function getUserBySlug({ slug }: { slug: string }) {
  return db.users.find((user) => user.slug === slug);
}
