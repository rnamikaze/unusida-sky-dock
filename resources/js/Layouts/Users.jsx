import BreadCrumbPane from "@/Components/BreadCrumbPane";
import TableItem from "@/Components/Tables/TableItem";
import { Divider, Flex } from "@chakra-ui/react";
import { ArrowDownUp, OctagonMinus, TrendingUpDown } from "lucide-react";

const tableWidth = ["10%", "10%", "40%", "30%", "10%"];

const Users = ({ viewActive }) => {
    return (
        <Flex direction={"column"} gap={3} width={"100%"}>
            <BreadCrumbPane />
            <Flex fontWeight={"bold"}>{viewActive.title}</Flex>
            <Flex direction={"column"} width={"100%"} gap={1}>
                <Flex
                    fontWeight={"bold"}
                    width={"100%"}
                    bg={"linear-gradient(to bottom, #261805ff, #332407ff)"}
                    borderRadius={"8px"}
                    py={1}
                >
                    <Flex
                        width={tableWidth[0]}
                        minWidth={tableWidth[0]}
                        maxWidth={tableWidth[0]}
                        px={2}
                    >
                        #
                    </Flex>
                    <Flex
                        width={tableWidth[1]}
                        minWidth={tableWidth[1]}
                        maxWidth={tableWidth[1]}
                        px={2}
                    >
                        USER ID
                    </Flex>
                    <Flex
                        width={tableWidth[2]}
                        minWidth={tableWidth[2]}
                        maxWidth={tableWidth[2]}
                        px={2}
                    >
                        NAME
                    </Flex>
                    <Flex
                        width={tableWidth[3]}
                        minWidth={tableWidth[3]}
                        maxWidth={tableWidth[3]}
                        px={2}
                    >
                        EMAIL
                    </Flex>
                    <Flex
                        width={tableWidth[4]}
                        minWidth={tableWidth[4]}
                        maxWidth={tableWidth[4]}
                        px={2}
                        alignItems={"center"}
                    >
                        <ArrowDownUp size={18} />
                    </Flex>
                </Flex>
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
            </Flex>
        </Flex>
    );
};

export default Users;
