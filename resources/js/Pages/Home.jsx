import ImageLoader from "@/Components/ImageLoader";
import { Flex } from "@chakra-ui/react";
import "../../css/fonts.css";
import { Cloud, Globe, KeySquare, MoveRight } from "lucide-react";
import { Head } from "@inertiajs/react";
import SchemaIdeas from "@/Components/SchemaIdeas";

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

                <SchemaIdeas />
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
