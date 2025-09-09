import ImageLoader from "@/Components/ImageLoader";
import { Flex } from "@chakra-ui/react";
import "../../css/fonts.css";
import { Cloud, Globe, KeySquare, MoveRight } from "lucide-react";
import { Head } from "@inertiajs/react";

const Home = () => {
    return (
        <Flex
            width={"100vw"}
            height={"100vh"}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            className="pt-sans-regular"
        >
            <Head title="Welcome" />
            <Flex
                width={"100vw"}
                height={"100vh"}
                position={"fixed"}
                zIndex={2}
                bg={"rgba(0,0,0,0.4)"}
            ></Flex>
            <Flex
                zIndex={5}
                color={"white"}
                direction={"column"}
                alignItems={"center"}
            >
                <Flex fontSize={"18px"}>Welcome to</Flex>
                <Flex className="asimovian-regular" fontSize={"60px"}>
                    SKY DOCK
                </Flex>

                <Flex
                    gap={"10px"}
                    direction={"column"}
                    // width={"300px"}
                    position={"relative"}
                    mt={[0, 0, "40px", "40px"]}
                    mb={[0, 0, "40px", "40px"]}
                    transform={[
                        "scale(0.8)",
                        "scale(0.8)",
                        "scale(1.1)",
                        "scale(1.1)",
                    ]}
                >
                    <Flex width={"100%"} justifyContent={"center"}>
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            gap={2}
                        >
                            <Flex
                                borderRadius={"full"}
                                width={"100px"}
                                height={"100px"}
                                border={"4px"}
                                borderColor={"white"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Cloud size={70} />
                            </Flex>
                            <Flex fontStyle={"italic"}>SKY DOCK</Flex>
                        </Flex>
                    </Flex>
                    <Flex
                        gap={"10px"}
                        width={"100%"}
                        justifyContent={"space-between"}
                    >
                        <Flex
                            direction={"column"}
                            gap={2}
                            alignItems={"center"}
                        >
                            <Flex
                                borderRadius={"full"}
                                width={"80px"}
                                height={"80px"}
                                border={"4px"}
                                borderColor={"white"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <KeySquare size={44} />
                            </Flex>
                            <Flex fontStyle={"italic"}>DOCK IN</Flex>
                        </Flex>
                        <Flex
                            height={"60px"}
                            position={"relative"}
                            top={"-50px"}
                            left={"-5px"}
                            transform={"rotate(-35deg)"}
                            opacity={0.6}
                        >
                            <MoveRight size={40} />
                        </Flex>
                        <Flex
                            width={"100px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            // height={"60px"}
                            gap={3}
                            opacity={0.6}
                        >
                            <MoveRight size={40} />
                        </Flex>
                        <Flex
                            height={"60px"}
                            position={"relative"}
                            top={"-50px"}
                            left={"0px"}
                            transform={"rotate(35deg)"}
                            opacity={0.6}
                        >
                            <MoveRight size={40} />
                        </Flex>
                        <Flex
                            direction={"column"}
                            gap={2}
                            alignItems={"center"}
                        >
                            <Flex
                                borderRadius={"full"}
                                width={"80px"}
                                height={"80px"}
                                border={"4px"}
                                borderColor={"white"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Globe size={44} />
                            </Flex>
                            <Flex fontStyle={"italic"}>APP</Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex>for UNUSIDA</Flex>
            </Flex>
            <Flex
                width={"100vw"}
                height={"100vh"}
                position={"fixed"}
                zIndex={0}
            >
                <ImageLoader imageUrl={"storage/images/main-bg.jpg"} />
            </Flex>
        </Flex>
    );
};

export default Home;
