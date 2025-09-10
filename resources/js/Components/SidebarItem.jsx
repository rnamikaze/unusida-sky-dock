import { Flex } from "@chakra-ui/react";

const SidebarItem = ({ item, handleViewActiveChange, viewActive }) => {
    const isActive = viewActive.id === item.id;

    return (
        <Flex
            bg={isActive ? "#1a1f37" : "transparent"}
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
                bg={isActive ? "#0075fe" : "#191e36"}
                color={isActive ? "white" : "#0075fe"}
                borderRadius={"10px"}
            >
                {item.icon}
            </Flex>
            <Flex textTransform={"capitalize"}>{item.title}</Flex>
        </Flex>
    );
};

export default SidebarItem;
