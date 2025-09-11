import { Divider, Flex } from "@chakra-ui/react";
import { OctagonMinus, TrendingUpDown } from "lucide-react";

const tableWidth = ["10%", "10%", "40%", "30%", "10%"];

const TableItem = () => {
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
                    1
                </Flex>
                <Flex
                    width={tableWidth[1]}
                    minWidth={tableWidth[1]}
                    maxWidth={tableWidth[1]}
                    px={2}
                >
                    1
                </Flex>
                <Flex
                    width={tableWidth[2]}
                    minWidth={tableWidth[2]}
                    maxWidth={tableWidth[2]}
                    px={2}
                >
                    Yusuf
                </Flex>
                <Flex
                    width={tableWidth[3]}
                    minWidth={tableWidth[3]}
                    maxWidth={tableWidth[3]}
                    px={2}
                >
                    Bagus
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
            <Flex py={1} justifyContent={"space-around"}>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <TrendingUpDown size={16} /> Traffic Request Allowed
                </Flex>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <OctagonMinus size={16} /> Traffic Request Blocked
                </Flex>
            </Flex>
        </Flex>
    );
};

export default TableItem;
