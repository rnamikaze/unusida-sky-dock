import { Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Clock24h() {
    const [time, setTime] = useState(getCurrentTime());

    // Function to format current time as HH:mm:ss (24-hour)
    function getCurrentTime() {
        const now = new Date();
        return now
            .toLocaleTimeString("en-GB", { hour12: false }) // en-GB gives 24h format
            .padStart(8, "0"); // ensure always HH:mm:ss
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);

    return <Text display={"inline"}>{time}</Text>;
}
