import { Flex } from "@chakra-ui/react";

const SidebarItem = ({ item, handleViewActiveChange, viewActive }) => {
    const isActive = viewActive.id === item.id;

    return (
        <Flex
            bg={isActive ? "#482610ff" : "transparent"}
            px={4}
            py={3}
            // height={"40px"}
            alignItems={"center"}
            gap={3}
            borderRadius={"16px"}
            cursor={"pointer"}
            onClick={() => {
                handleViewActiveChange(item);
            }}
        >
            <Flex
                width={"30px"}
                height={"30px"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={isActive ? "#FF7D29" : "#482610ff"}
                color={isActive ? "white" : "#FF7D29"}
                borderRadius={"10px"}
            >
                {item.icon}
            </Flex>
            <Flex textTransform={"capitalize"}>{item.title}</Flex>
        </Flex>
    );
};

export default SidebarItem;
