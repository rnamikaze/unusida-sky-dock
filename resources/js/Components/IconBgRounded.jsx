import { Flex } from "@chakra-ui/react";

const IconBgRounder = ({ children, bg = "red.400", borderRadius = "full" }) => {
    return (
        <Flex
            bg={bg}
            color={"white"}
            borderRadius={borderRadius}
            width={"24px"}
            height={"24px"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {children}
        </Flex>
    );
};

export default IconBgRounder;
