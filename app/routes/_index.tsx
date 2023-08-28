import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "countdown timer" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");

  return parseInt(limit ?? "0");
};


export default function Index() {
  return (
    <>
      <Main />
      <Link to={{
        pathname: "/new",
      }}>new</Link>
    </>
  )
}

function Main() {
  const completeUnix = useLoaderData<typeof loader>();
  const completeUnixwms = completeUnix * 1000;
  const limit = new Date(completeUnixwms);
  const limitUnix = limit.getTime();
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("tick")
      const now = new Date()
      if (now.getTime() >= limitUnix) {
        clearInterval(timer);
      }
      setDate(() => now)
    }, 1000);
    return () => clearInterval(timer);
  }, [limitUnix])


  // 0秒のあと数秒立つのを修正する
  if (limitUnix <= date.getTime() + 1) {
    console.log("time's up")
    return <TimeUp />
  }

  const rr = limit.getTime() - date.getTime();
  const rDays = Math.floor(rr / (1000 * 3600 * 24));
  const rHours = Math.floor((rr % (1000 * 3600 * 24)) / (1000 * 3600));
  const rMinutes = Math.floor((rr % (1000 * 3600)) / (1000 * 60));
  const rSeconds = Math.floor((rr % (1000 * 60)) / 1000);




  return (
    <div>
      <div>
        <div>{rDays} days</div>
        <div>{rHours} hours</div>
        <div>{rMinutes} minutes</div>
        <div>{rSeconds} seconds</div>
      </div>
      <div>
        {/* {r.toLocaleDateString()} */}
      </div>
      <div>
        {limit.toLocaleDateString("ja-JP")}
      </div>
    </div>
  );
}

function TimeUp() {
  return (
    <div>
      <div>Time's up!</div>
    </div>
  )
}