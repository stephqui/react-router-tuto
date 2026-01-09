import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("users", [
    index("routes/users.tsx"),
    route(":userSlug", "routes/users.$userSlug.tsx"),
  ]),
] satisfies RouteConfig;
