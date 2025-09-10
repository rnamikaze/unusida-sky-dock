import BreadCrumbPane from "@/Components/BreadCrumbPane";
import { Flex } from "@chakra-ui/react";

const DashboardPane = ({ viewActive }) => {
    return (
        <Flex direction={"column"} gap={3}>
            <BreadCrumbPane />
            <Flex fontWeight={"bold"}>{viewActive.title}</Flex>
        </Flex>
    );
};

export default DashboardPane;
