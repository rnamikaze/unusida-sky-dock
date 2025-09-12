import {
    Badge,
    Button,
    Checkbox,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";
import axios from "axios";
import { Key, LogIn, Mail } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const [loginVal, setLoginVal] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleLoginValChange = (key, value) => {
        setLoginVal((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [warningText, setWarningText] = useState("");

    const initLogin = () => {
        setIsLoading(true);
        setWarningText("");

        axios
            .post("/admin/login", {
                ...loginVal,
            })
            .then(function (response) {
                console.log(response);

                if (response.status === 200) {
                    window.location.href = "/dashboard";
                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
                setWarningText(
                    "Login failed, maybe email or password is wrong !"
                );
            });
    };

    return (
        <Flex
            direction={"column"}
            gap={2}
            as={"form"}
            onSubmit={(e) => {
                e.preventDefault();
                initLogin();
            }}
        >
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
                    value={loginVal.email}
                    onChange={(e) => {
                        handleLoginValChange("email", e.target.value);
                    }}
                    type="email"
                    isRequired
                    minLength={8}
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
                    value={loginVal.password}
                    onChange={(e) => {
                        handleLoginValChange("password", e.target.value);
                    }}
                    isRequired
                    minLength={8}
                />
            </InputGroup>
            <Flex justifyContent={"flex-end"}>
                <Checkbox
                    colorScheme="yellow"
                    isChecked={loginVal.remember}
                    onChange={(e) => {
                        handleLoginValChange("remember", e.target.checked);
                    }}
                >
                    Stay Log In
                </Checkbox>
            </Flex>
            <Flex>
                <Badge colorScheme="red" variant={"solid"}>
                    {warningText}
                </Badge>
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
                    type="submit"
                    isLoading={isLoading}
                >
                    Login <LogIn size={18} />
                </Button>
            </Flex>
        </Flex>
    );
};

export default Login;
