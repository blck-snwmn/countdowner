import { Link } from "@remix-run/react";
import { useState } from "react";

export default function New() {
    const [input, setInput] = useState(new Date().toISOString().slice(0, -5));
    console.log(`name: ${input}, ${input === ""}}`);
    console.log(new Date().toISOString())
    console.log(new Date().toISOString().slice(0, -5))
    // const date = new Date(input);
    // const unix = date.getTime() / 1000;
    return (
        <main>
            <input
                type="datetime-local"
                name="limit"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <div>
                new link: <NewLink input={input} />
            </div>
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
            pathname: "../",
            search: `?limit=${unix}`
        }}>limit={unix}</Link>
    )
}