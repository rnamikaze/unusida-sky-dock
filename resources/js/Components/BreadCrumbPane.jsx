import { getDayName, getFormattedDate } from "@/Functions/dateOps";
import { Flex } from "@chakra-ui/react";
import Clock24h from "./HourClock";

const BreadCrumbPane = () => {
    return (
        <Flex
            lineHeight={"1.2em"}
            direction={["row", "row", "column", "column"]}
            justifyContent={[
                "flex-end",
                "flex-end",
                "flex-start",
                "flex-start",
            ]}
        >
            <Flex mr={1}>
                <Clock24h />, {getDayName()}
            </Flex>
            <Flex>{getFormattedDate()}</Flex>
        </Flex>
    );
};

export default BreadCrumbPane;
