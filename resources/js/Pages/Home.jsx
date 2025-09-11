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
import { useEffect } from "react";

const isDebug = import.meta.env.VITE_APP_DEBUG == "true";

const Home = ({ message }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                "linear-gradient(to bottom, #021230, #006ef8 , #0043bc, #00153b)"
            }
            pb={"100px"}
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
                direction={"column"}
                alignItems={"center"}
                className="pt-sans-regular"
                gap={3}
            >
                <Flex
                    mt={"70px"}
                    bg={"white"}
                    color={"black"}
                    height={"70px"}
                    width={"70px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"25px"}
                >
                    <EqualApproximately color="#0154bf" size={60} />
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
                    <Flex className="asimovian-regular" fontSize={"60px"}>
                        EMPIRE WAY
                    </Flex>
                    <Flex>We're going RIGHT, always.</Flex>
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
                        textAlign={["center", "center", "left", "left"]}
                        justifyContent={"center"}
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
                    >
                        <Flex fontWeight={"bold"}>Legitimate Admin?</Flex>
                        {isDebug ? (
                            <Link href="/dashboard">
                                <Button
                                    borderRadius={"8px"}
                                    rightIcon={<LogIn size={16} />}
                                    size={["md", "md", "sm", "sm"]}
                                    width={"max-content"}
                                    cursor={"pointer"}
                                >
                                    Yeah, i'm in
                                </Button>
                            </Link>
                        ) : (
                            <Tooltip label={"Available Soon"}>
                                <Button
                                    borderRadius={"8px"}
                                    rightIcon={<LogIn size={16} />}
                                    size={["md", "md", "sm", "sm"]}
                                    width={"max-content"}
                                    cursor={"pointer"}
                                >
                                    Yeah, i'm in
                                </Button>
                            </Tooltip>
                        )}
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
