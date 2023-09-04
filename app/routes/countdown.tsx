import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet, } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Countdown" },
    { name: "description", content: "countdown timer" },
  ];
};


export default function Index() {
  return (
    <>
      <Outlet />
      <div>
        <Link to={{
          pathname: "/new",
        }} className="underline text-blue-600 visited:text-purple-600">new</Link>
      </div>
    </>
  )
}
