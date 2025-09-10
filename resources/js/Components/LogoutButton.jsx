import { Flex, Spinner } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const doLogout = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <Flex
            bg={isLoading ? "#1a1f37" : "transparent"}
            px={4}
            py={3}
            // height={"40px"}
            alignItems={"center"}
            gap={3}
            borderRadius={"16px"}
            cursor={"pointer"}
            onClick={() => {
                // handleViewActiveChange(item);
                doLogout();
            }}
        >
            <Flex
                width={"30px"}
                height={"30px"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={isLoading ? "red.400" : "#191e36"}
                color={isLoading ? "white" : "red.400"}
                borderRadius={"10px"}
            >
                {isLoading ? (
                    <Spinner size={"sm"} thickness="3px" />
                ) : (
                    <LogOut size={20} />
                )}
            </Flex>
            <Flex textTransform={"capitalize"}>
                {isLoading ? "Sedang Keluar" : "Keluar"}
            </Flex>
        </Flex>
    );
};

export default LogoutButton;
