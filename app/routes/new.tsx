import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet, useOutletContext } from "@remix-run/react";
import { useState } from "react";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "New Countdown Timer" },
        { name: "description", content: "new countdown timer" },
    ];
};


function getNow() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);

    const hour = ("0" + now.getHours()).slice(-2)
    const minute = ("0" + now.getMinutes()).slice(-2);
    const second = ("0" + now.getSeconds()).slice(-2);

    return [
        `${year}-${month}-${day}`,
        `${hour}:${minute}:${second}`,
    ]
}

type ContextType = { input: string; setInput: (input: string) => void; };

export default function New() {
    // FIXME timezone
    const [dateStr, timeStr] = getNow()
    const [input, setInput] = useState(`${dateStr}T${timeStr}`);

    return (
        <main>
            <div>
                new link: <NewLink input={input} />
            </div>
            <Outlet context={{ input, setInput } satisfies ContextType} />
        </main>
    );
}

function NewLink({ input }: { input: string }) {
    const date = new Date(input);
    const unix = date.getTime() / 1000;
    if (isNaN(unix)) {
        return null;
    }
    return (
        <Link to={{
            pathname: "/countdown",
            search: `?limit=${unix}`
        }}
            className="underline text-blue-600 visited:text-purple-600"
        >limit={unix}</Link>
    )
}

export function useInput() {
    return useOutletContext<ContextType>();
}