import BreadCrumbPane from "@/Components/BreadCrumbPane";
import TrafficLogsTable from "@/Components/Tables/TrafficLogsTable";
import UsersTable from "@/Components/Tables/UsersTable";
import { Flex } from "@chakra-ui/react";

const TrafficLogs = ({ viewActive }) => {
    return (
        <Flex direction={"column"} gap={2} width={"100%"}>
            <BreadCrumbPane />
            <Flex fontWeight={"bold"} gap={2} alignItems={"center"}>
                <Flex
                    border={"2px"}
                    width={"30px"}
                    height={"30px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderColor={"white"}
                    borderRadius={"10px"}
                    bg={"white"}
                    color={"#2f2006"}
                >
                    {viewActive.icon}
                </Flex>
                <Flex fontSize={"18px"} textTransform={"uppercase"}>
                    {viewActive.title}
                </Flex>
            </Flex>
            <TrafficLogsTable />
        </Flex>
    );
};

export default TrafficLogs;
