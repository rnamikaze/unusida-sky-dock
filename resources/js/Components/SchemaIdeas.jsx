import { Flex } from "@chakra-ui/react";
import { Cloud, Globe, KeySquare, MoveRight } from "lucide-react";

const SchemaIdeas = ({ zoom = ["0.8", "1.1"] }) => {
    return (
        <Flex
            gap={"10px"}
            direction={"column"}
            // width={"300px"}
            position={"relative"}
            mt={[0, 0, "40px", "40px"]}
            mb={[0, 0, "40px", "40px"]}
            transform={[
                `scale(${zoom[0]})`,
                `scale(${zoom[0]})`,
                `scale(${zoom[1]})`,
                `scale(${zoom[1]})`,
            ]}
        >
            <Flex width={"100%"} justifyContent={"center"}>
                <Flex direction={"column"} alignItems={"center"} gap={2}>
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
            <Flex gap={"10px"} width={"100%"} justifyContent={"space-between"}>
                <Flex direction={"column"} gap={2} alignItems={"center"}>
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
                <Flex direction={"column"} gap={2} alignItems={"center"}>
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
    );
};

export default SchemaIdeas;
