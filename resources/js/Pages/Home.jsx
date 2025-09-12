import ImageLoader from "@/Components/ImageLoader";
import {
    Button,
    Flex,
    Image,
    Link,
    Text,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import "../../css/fonts.css";
import "../../css/style.css";
import {
    Cloud,
    EqualApproximately,
    Globe,
    KeySquare,
    LogIn,
    MoveRight,
} from "lucide-react";
import { Head } from "@inertiajs/react";
import SchemaIdeas from "@/Components/SchemaIdeas";
import { useEffect, useRef, useState } from "react";
import Login from "@/Layouts/Login";

const isDebug = import.meta.env.VITE_APP_DEBUG == "true";

const Home = ({ message }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const loginRef = useRef(null);

    const scrollToLogin = () => {
        loginRef.current?.scrollIntoView({
            behavior: "smooth", // 👈 enables smooth scrolling
            block: "start", // alignment (start, center, end, nearest)
        });
    };

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                onOpen();
            }, 1000);
        }
    }, [message]);
    return (
        <Flex
            width={"100vw"}
            minHeight={"100vh"}
            overflowY={"auto"}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={
                "linear-gradient(to bottom, #7B4019, #FF9A00 , #D96F32, #7B4019)"
            }
            pb={["0px", "0px", "10px", "10px"]}
        >
            <Head title="Welcome" />
            {/* <Flex
                width={"100vw"}
                height={"100vh"}
                position={"fixed"}
                zIndex={2}
                bg={"rgba(0,0,0,0.4)"}
            ></Flex> */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    bg={"transparent"}
                    className="white-glass"
                    color={"white"}
                    mx={"15px"}
                    borderRadius={"16px"}
                    mt={"20vh"}
                >
                    <ModalHeader>Not Allowed</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{message}</ModalBody>

                    <ModalFooter>
                        <Button
                            size={"sm"}
                            colorScheme="gray"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex
                zIndex={5}
                color={"white"}
                direction={["column-reverse", "column-reverse", "row", "row"]}
                alignItems={"center"}
                className="pt-sans-regular"
                gap={[0, 0, "150px", "150px"]}
            >
                <Flex
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"20px"}
                    id="login"
                    ref={loginRef}
                    height={["100vh", "100vh", "max-content", "max-content"]}
                >
                    <Flex
                        mt={[0, 0, "70px", "70px"]}
                        bg={"white"}
                        color={"black"}
                        height={"70px"}
                        width={"70px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"25px"}
                    >
                        <EqualApproximately color="#7B4019" size={60} />
                    </Flex>
                    <Flex
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        lineHeight={"3em"}
                    >
                        <Flex fontSize={"18px"} textTransform={"uppercase"}>
                            Welcome To
                        </Flex>
                        <Flex
                            className="asimovian-regular"
                            fontSize={["45px", "45px", "50px", "50px"]}
                        >
                            EMPIRE WAY
                        </Flex>
                        <Flex>Together we Advance in RIGHT way.</Flex>
                    </Flex>
                    <Login />
                </Flex>

                <Flex
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={["100vh", "100vh", "max-content", "max-content"]}
                >
                    <Flex
                        gap={3}
                        display={["flex", "flex", "none", "none"]}
                        mb={"20px"}
                    >
                        <Flex
                            // mt={[0, 0, "70px", "70px"]}
                            bg={"white"}
                            color={"black"}
                            height={"40px"}
                            width={"40px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            borderRadius={"12px"}
                        >
                            <EqualApproximately color="#7B4019" size={30} />
                        </Flex>
                        <Flex className="asimovian-regular" fontSize={"30px"}>
                            EMPIRE WAY
                        </Flex>
                    </Flex>
                    <SchemaIdeas />
                    <Flex
                        gap={4}
                        alignItems={"center"}
                        direction={["column", "column", "row", "row"]}
                    >
                        <Flex
                            // width={"300px"}
                            wordBreak={"break-word"}
                            // textAlign={["center", "center", "left", "left"]}
                            justifyContent={"center"}
                            textAlign={"center"}
                            maxWidth={"300px"}
                        >
                            <Text display={"inline"}>
                                What do we do?
                                <br />
                                We manage the data transport between apps in the
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        display: "inline",
                                        padding: "0px 5px",
                                    }}
                                >
                                    EMPIRE WAY&trade;
                                </div>
                                Registered network.
                            </Text>
                        </Flex>

                        <Flex
                            direction={"column"}
                            gap={1}
                            justifyContent={[
                                "center",
                                "center",
                                "flex-end",
                                "flex-end",
                            ]}
                            alignItems={[
                                "center",
                                "center",
                                "flex-end",
                                "flex-end",
                            ]}
                            display={["flex", "flex", "none", "none"]}
                        >
                            <Flex fontWeight={"bold"}>Legitimate Admin?</Flex>

                            <Flex justifyContent={"center"}>
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
                                    onClick={() => {
                                        scrollToLogin();
                                    }}
                                >
                                    Login <LogIn size={18} />
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            {/* <Flex
                width={"100vw"}
                height={"100vh"}
                position={"fixed"}
                zIndex={0}
            >
                <ImageLoader imageUrl={"storage/images/main-bg.jpg"} />
            </Flex> */}
            <Flex
                position={"fixed"}
                bottom={"0px"}
                width={"100%"}
                justifyContent={"center"}
                color={"white"}
                pb={2}
                fontWeight={"600"}
                fontSize={["13px", "13px", "14px", "14px"]}
            >
                <Flex px={2} className="white-glass ">
                    Gifted & Operated by{" "}
                    <Link
                        px={1}
                        textDecoration={[
                            "underline",
                            "underline",
                            "none",
                            "none",
                        ]}
                        _hover={{
                            textDecoration: "underline",
                        }}
                        href="https://www.sparklabz.cloud"
                        isExternal
                    >
                        SPARKLABZ.CLOUD
                    </Link>{" "}
                    &copy;
                    {new Date().getFullYear()}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Home;
