import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("users", [
    layout("routes/_usersLayout.tsx", [
      index("routes/users.index.tsx"),
      route(":userSlug", "routes/users.$userSlug.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
