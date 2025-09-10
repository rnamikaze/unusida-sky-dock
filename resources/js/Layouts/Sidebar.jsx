import LogoutButton from "@/Components/LogoutButton";
import SidebarItem from "@/Components/SidebarItem";
import { Flex } from "@chakra-ui/react";
import { EqualApproximately, LogOut, X } from "lucide-react";

const Sidebar = ({
    sidebarItem,
    handleViewActiveChange,
    viewActive,
    sidebarExpand,
    setSidebarExpand,
}) => {
    return (
        <Flex
            height={"100%"}
            width={"250px"}
            bg={"linear-gradient(to bottom, #050b26, #071333)"}
            borderRadius={"16px"}
            direction={"column"}
            color={"white"}
            px={"15px"}
            py={"10px"}
            position={["fixed", "fixed", "relative", "relative"]}
            zIndex={50}
            transform={[
                sidebarExpand ? "translateX(0)" : "translateX(-100vw)",
                sidebarExpand ? "translateX(0)" : "translateX(-100vw)",
                "translateX(0)",
                "translateX(0)",
            ]}
            transition={"250ms ease-out"}
        >
            <Flex
                height={"60px"}
                width={"100%"}
                // justifyContent={"center"}
                alignItems={"center"}
                fontSize={"20px"}
                className="asimovian-regular"
                px={4}
                justifyContent={"space-between"}
            >
                <Flex gap={3}>
                    <Flex
                        bg={"white"}
                        color={"black"}
                        height={"30px"}
                        width={"30px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"10px"}
                    >
                        <EqualApproximately size={22} />
                    </Flex>{" "}
                    <Flex>SKY DOCK</Flex>
                </Flex>
                <Flex
                    cursor={"pointer"}
                    display={["flex", "flex", "none", "none"]}
                    onClick={() => {
                        setSidebarExpand(false);
                    }}
                >
                    <X />
                </Flex>
            </Flex>
            <Flex
                height={"3px"}
                width={"100%"}
                bg={"linear-gradient(to right, #161b34, #4c5063, #161b34)"}
            ></Flex>
            <Flex
                flexGrow={1}
                mt={"20px"}
                direction={"column"}
                gap={1}
                color={"white"}
            >
                {sidebarItem.map((item) => {
                    return (
                        <SidebarItem
                            handleViewActiveChange={handleViewActiveChange}
                            key={item.id}
                            item={item}
                            viewActive={viewActive}
                        />
                    );
                })}
            </Flex>
            <LogoutButton />
        </Flex>
    );
};

export default Sidebar;
