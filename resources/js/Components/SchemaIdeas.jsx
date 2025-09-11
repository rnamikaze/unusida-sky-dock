import { Flex, useBoolean } from "@chakra-ui/react";
import { Cloud, Globe, KeySquare, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";

const SchemaIdeas = ({ zoom = ["0.8", "1.1"] }) => {
    const [cloudHovered, setCloudHovered] = useBoolean(false);
    const [dockInHovered, setDockInHovered] = useBoolean(false);
    const [appHovered, setAppHovered] = useBoolean(false);

    const [value, setValue] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => (prev >= 3 ? 1 : prev + 1));
        }, 2000); // every 3 seconds

        return () => clearInterval(interval); // cleanup
    }, []);

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
                        bg={"white"}
                        color="#0154bf"
                        style={
                            value == 2
                                ? {
                                      transform: "scale(1.1)",
                                      filter: "drop-shadow(0 0 20px white)",
                                  }
                                : null
                        }
                        _hover={{
                            transform: "scale(1.1)",
                            filter: "drop-shadow(0 0 20px white)",
                        }}
                        transition={"250ms ease-out"}
                        onMouseEnter={setCloudHovered.on}
                        onMouseLeave={setCloudHovered.off}
                    >
                        <Cloud size={70} />
                    </Flex>
                    <Flex fontStyle={"italic"}>EMPIRE WAY</Flex>
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
                        bg={"white"}
                        color="#0154bf"
                        style={
                            value == 1
                                ? {
                                      transform: "scale(1.1)",
                                      filter: "drop-shadow(0 0 20px white)",
                                  }
                                : null
                        }
                        _hover={{
                            transform: "scale(1.1)",
                            filter: "drop-shadow(0 0 20px white)",
                        }}
                        transition={"250ms ease-out"}
                        onMouseEnter={setDockInHovered.on}
                        onMouseLeave={setDockInHovered.off}
                    >
                        <KeySquare size={44} />
                    </Flex>
                    <Flex fontStyle={"italic"}>KNIGHT IN</Flex>
                </Flex>
                <Flex
                    height={"60px"}
                    position={"relative"}
                    top={"-50px"}
                    left={"-5px"}
                    transform={`rotate(-35deg) ${
                        dockInHovered ||
                        cloudHovered ||
                        value == 1 ||
                        value == 2
                            ? "scale(1.2)"
                            : ""
                    }`}
                    opacity={
                        dockInHovered ||
                        cloudHovered ||
                        value == 1 ||
                        value == 2
                            ? 1
                            : 0.6
                    }
                    transition={"250ms ease-out"}
                >
                    <MoveRight size={40} />
                </Flex>
                <Flex
                    width={"100px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    // height={"60px"}
                    gap={3}
                    transform={`${
                        dockInHovered || appHovered || value == 1 || value == 3
                            ? "scale(1.2)"
                            : ""
                    }`}
                    opacity={
                        dockInHovered || appHovered || value == 1 || value == 3
                            ? 1
                            : 0.6
                    }
                    transition={"250ms ease-out"}
                >
                    <MoveRight size={40} />
                </Flex>
                <Flex
                    height={"60px"}
                    position={"relative"}
                    top={"-50px"}
                    left={"0px"}
                    transform={`rotate(35deg) ${
                        cloudHovered || appHovered || value == 3 || value == 2
                            ? "scale(1.2)"
                            : ""
                    }`}
                    opacity={
                        cloudHovered || appHovered || value == 3 || value == 2
                            ? 1
                            : 0.6
                    }
                    transition={"250ms ease-out"}
                    // style={{
                    //     filter: "drop-shadow(0 0 10px white)",
                    // }}
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
                        bg={"white"}
                        color="#0154bf"
                        style={
                            value == 3
                                ? {
                                      transform: "scale(1.1)",
                                      filter: "drop-shadow(0 0 20px white)",
                                  }
                                : null
                        }
                        _hover={{
                            transform: "scale(1.1)",
                            filter: "drop-shadow(0 0 20px white)",
                        }}
                        transition={"250ms ease-out"}
                        onMouseEnter={setAppHovered.on}
                        onMouseLeave={setAppHovered.off}
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
