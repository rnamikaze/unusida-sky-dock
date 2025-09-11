import BreadCrumbPane from "@/Components/BreadCrumbPane";
import UsersTable from "@/Components/Tables/UsersTable";
import { Flex } from "@chakra-ui/react";

const Users = ({ viewActive }) => {
    return (
        <Flex direction={"column"} gap={2} width={"100%"}>
            <BreadCrumbPane />
            <Flex fontWeight={"bold"}>{viewActive.title}</Flex>
            <UsersTable />
        </Flex>
    );
};

export default Users;
