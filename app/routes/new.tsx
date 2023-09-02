import { Link } from "@remix-run/react";
import { useState } from "react";

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

export default function New() {
    // FIXME timezone
    const [dateStr, timeStr] = getNow()

    const [input, setInput] = useState(`${dateStr}T${timeStr}`);
    const [date, setDate] = useState(dateStr);
    const [time, setTime] = useState(timeStr);

    return (
        <main>
            <div>
                new link: <NewLink input={input} />
            </div>
            <div>
                <input type="date" value={date} onChange={(e) => {
                    const date = e.target.value
                    setDate(date)
                    setInput(`${date}T${time}`)
                }} />
                <input type="time" value={time} onChange={(e) => {
                    const time = e.target.value
                    setTime(time)
                    setInput(`${date}T${time}`)
                }} />
            </div>
            <div>
                <button onClick={() => {
                    const [date, time] = getNow()
                    setInput(`${date}T${time}`)
                    setDate(date)
                    setTime(time)
                }}>refresh now</button>
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
            pathname: "/countdown",
            search: `?limit=${unix}`
        }}>limit={unix}</Link>
    )
}