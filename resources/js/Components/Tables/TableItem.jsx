import { formatTimestamp } from "@/Functions/dateOps";
import { Divider, Flex } from "@chakra-ui/react";
import {
    ClockArrowUp,
    Network,
    OctagonMinus,
    TrendingUpDown,
} from "lucide-react";

const tableWidth = ["10%", "10%", "40%", "30%", "10%"];

const TableItem = ({ item, from, index }) => {
    return (
        <Flex
            width={"100%"}
            bg={"#F3E9DC"}
            color={"gray.700"}
            borderRadius={"8px"}
            py={1}
            cursor={"pointer"}
            direction={"column"}
        >
            <Flex width={"100%"} pb={1}>
                <Flex
                    width={tableWidth[0]}
                    minWidth={tableWidth[0]}
                    maxWidth={tableWidth[0]}
                    px={2}
                    fontWeight={"bold"}
                >
                    {from + index}
                </Flex>
                <Flex
                    width={tableWidth[1]}
                    minWidth={tableWidth[1]}
                    maxWidth={tableWidth[1]}
                    px={2}
                >
                    {item.ext_dat_id}
                </Flex>
                <Flex
                    width={tableWidth[2]}
                    minWidth={tableWidth[2]}
                    maxWidth={tableWidth[2]}
                    px={2}
                >
                    {item.name}
                </Flex>
                <Flex
                    width={tableWidth[3]}
                    minWidth={tableWidth[3]}
                    maxWidth={tableWidth[3]}
                    px={2}
                >
                    {item.email}
                </Flex>
                <Flex
                    width={tableWidth[4]}
                    minWidth={tableWidth[4]}
                    maxWidth={tableWidth[4]}
                    px={2}
                >
                    Allow
                </Flex>
            </Flex>
            <Divider borderColor={"#9c9c9aff"} />
            <Flex py={1} justifyContent={"flex-start"} px={2}>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <TrendingUpDown size={16} /> Traffic Request Allowed
                </Flex>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <ClockArrowUp size={16} /> Last Attempt&nbsp;
                    {formatTimestamp(item?.attempt_latest?.created_at)}
                </Flex>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <Network size={16} /> Last IP{" "}
                    {item?.token_decks_latest?.ip_address || "N/A"}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default TableItem;
