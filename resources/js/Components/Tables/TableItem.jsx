import { formatTimestamp } from "@/Functions/dateOps";
import { Divider, Flex } from "@chakra-ui/react";
import {
    ClockArrowUp,
    Network,
    OctagonMinus,
    TrendingUpDown,
} from "lucide-react";

const tableWidth = ["10%", "10%", "40%", "30%", "10%"];

const TableItem = ({ item, from, index, handleClick }) => {
    return (
        <Flex
            width={"100%"}
            bg={"#F3E9DC"}
            color={"gray.700"}
            borderRadius={"8px"}
            py={1}
            cursor={"pointer"}
            direction={"column"}
            onClick={() => {
                handleClick(item);
            }}
        >
            <Flex
                width={"100%"}
                pb={1}
                // direction={["row", "row", "column", "column"]}
                wrap={"wrap"}
            >
                <Flex
                    width={[
                        "max-content",
                        "max-content",
                        tableWidth[0],
                        tableWidth[0],
                    ]}
                    minWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[0],
                        tableWidth[0],
                    ]}
                    maxWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[0],
                        tableWidth[0],
                    ]}
                    px={2}
                    fontWeight={"bold"}
                >
                    {from + index}
                </Flex>
                <Flex
                    width={[
                        "max-content",
                        "max-content",
                        tableWidth[1],
                        tableWidth[1],
                    ]}
                    minWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[1],
                        tableWidth[1],
                    ]}
                    maxWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[1],
                        tableWidth[1],
                    ]}
                    px={2}
                >
                    {item.ext_dat_id}
                </Flex>
                <Flex
                    width={[
                        "max-content",
                        "max-content",
                        tableWidth[2],
                        tableWidth[2],
                    ]}
                    minWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[2],
                        tableWidth[2],
                    ]}
                    maxWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[2],
                        tableWidth[2],
                    ]}
                    px={2}
                >
                    {item.name}
                </Flex>
                <Flex
                    width={[
                        "max-content",
                        "max-content",
                        tableWidth[3],
                        tableWidth[3],
                    ]}
                    minWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[3],
                        tableWidth[3],
                    ]}
                    maxWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[3],
                        tableWidth[3],
                    ]}
                    px={2}
                >
                    {item.email}
                </Flex>
                <Flex
                    width={[
                        "max-content",
                        "max-content",
                        tableWidth[4],
                        tableWidth[4],
                    ]}
                    minWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[4],
                        tableWidth[4],
                    ]}
                    maxWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[4],
                        tableWidth[4],
                    ]}
                    px={2}
                >
                    {item?.traffic_status?.allow ? "Allow" : "Block"}
                </Flex>
            </Flex>
            <Divider borderColor={"#9c9c9aff"} />
            <Flex
                py={1}
                justifyContent={"flex-start"}
                px={2}
                direction={["column", "column", "row", "row"]}
                // wrap={"wrap"}
            >
                <Flex px={2} alignItems={"center"} gap={2}>
                    <TrendingUpDown size={16} /> Traffic Request{" "}
                    {item?.traffic_status?.allow ? "Allowed" : "Blocked"}
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
