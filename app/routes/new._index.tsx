import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import { useInput } from "./new";

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

export default function Index() {
    // FIXME timezone
    const [dateStr, timeStr] = getNow()

    const { setInput } = useInput();
    const [date, setDate] = useState(dateStr);
    const [time, setTime] = useState(timeStr);

    return (
        <main>
            <div>
                <input type="date" value={date} onChange={(e) => {
                    const date = e.target.value
                    setDate(date)
                    setInput(`${date}T${time}`)
                }} className="m-1" />
                <input type="time" value={time} onChange={(e) => {
                    const time = e.target.value
                    setTime(time)
                    setInput(`${date}T${time}`)
                }} className="m-1" />
            </div>
            <div>
                <button onClick={() => {
                    const [date, time] = getNow()
                    setInput(`${date}T${time}`)
                    setDate(date)
                    setTime(time)
                }} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-1">refresh now</button>
            </div>
        </main>
    );
}
