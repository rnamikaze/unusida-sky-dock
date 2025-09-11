import {
    Button,
    Checkbox,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";
import { Key, LogIn, Mail } from "lucide-react";

const Login = () => {
    return (
        <Flex direction={"column"} gap={2}>
            <Flex mt={"10px"} fontWeight={"bold"}>
                Legitimate Admin Login
            </Flex>
            <InputGroup>
                <InputLeftAddon bg={"#2e2006"} borderColor={"transparent"}>
                    <Mail size={18} />
                </InputLeftAddon>
                <Input
                    bg={"#2e2006"}
                    borderColor={"transparent"}
                    _placeholder={{ color: "white" }}
                    placeholder="Email"
                />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon bg={"#2e2006"} borderColor={"transparent"}>
                    <Key size={18} />
                </InputLeftAddon>
                <Input
                    bg={"#2e2006"}
                    borderColor={"transparent"}
                    _placeholder={{ color: "white" }}
                    placeholder="Password"
                    type="password"
                />
            </InputGroup>
            <Flex justifyContent={"flex-end"}>
                <Checkbox colorScheme="yellow" defaultChecked>
                    Stay Log In
                </Checkbox>
            </Flex>
            <Flex justifyContent={"center"} mt={"20px"}>
                <Button
                    gap={2}
                    borderLeft={"4px"}
                    borderRight={"4px"}
                    borderColor={"#2e2006"}
                    colorScheme="gray"
                    borderRadius={"full"}
                    _hover={{
                        bg: "#2e2006",
                        color: "white",
                    }}
                    _focus={{
                        bg: "#2e2006",
                        color: "white",
                    }}
                >
                    Login <LogIn size={18} />
                </Button>
            </Flex>
        </Flex>
    );
};

export default Login;
