import { Flex } from "@chakra-ui/react";
import { CircleUserRound, Dot } from "lucide-react";

const UserRound = ({ user }) => {
    return (
        <Flex
            alignItems={"center"}
            direction={["row-reverse", "row-reverse", "row", "row"]}
        >
            <Flex
                width={"50px"}
                height={"50px"}
                justifyContent={"center"}
                alignItems={"center"}
                // onClick={() => {
                //     setSidebarExpand((p) => !p);
                // }}
                cursor={"pointer"}
            >
                <CircleUserRound size={20} />
            </Flex>
            <Flex
                fontSize={["14px", "14px", "16px", "16px"]}
                gap={2}
                alignItems={"center"}
            >
                <Flex fontWeight={"bold"}>{user.name}</Flex>
                <Flex display={["none", "none", "flex", "flex"]}>
                    <Dot size={20} />
                    <Flex>{user.email}</Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default UserRound;
