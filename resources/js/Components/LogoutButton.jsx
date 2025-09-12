import { Flex, Spinner } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const doLogout = () => {
        setIsLoading(true);

        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 3000);

        axios
            .post("/admin/logout")
            .then(function (response) {
                // console.log(response);

                if (response.status === 200) {
                    window.location.href = "/";
                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <Flex
            bg={isLoading ? "#482610ff" : "transparent"}
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
                bg={isLoading ? "#FF7D29" : "#482610ff"}
                color={isLoading ? "white" : "#FF7D29"}
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
