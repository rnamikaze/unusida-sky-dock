import Sidebar from "@/Layouts/Sidebar";
import { Flex } from "@chakra-ui/react";
import "../../css/fonts.css";
import {
    ArrowDownUp,
    CircleUserRound,
    Clover,
    House,
    LayoutGrid,
    Leaf,
    Menu,
    Sprout,
    UserRoundCheck,
    UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import DashboardPane from "@/Layouts/DashboardPane";
import SchemaIdeas from "@/Components/SchemaIdeas";
import UserRound from "@/Components/UserRound";
import Users from "@/Layouts/Users";

const sidebarItem = [
    {
        id: 6,
        title: "Welcome",
        icon: <Leaf size={20} />,
    },
    {
        id: 1,
        title: "Dashboard",
        icon: <House size={20} />,
    },
    {
        id: 2,
        title: "Traffic Log",
        icon: <ArrowDownUp size={20} />,
    },
    {
        id: 5,
        title: "Session",
        icon: <UserRoundCheck size={20} />,
    },
    {
        id: 3,
        title: "Users",
        icon: <UsersRound size={20} />,
    },
    {
        id: 4,
        title: "Apps",
        icon: <LayoutGrid size={20} />,
    },
];
const Dashboard = ({ user }) => {
    const [sidebarExpand, setSidebarExpand] = useState(false);
    const [logedInUser, setLogedInUser] = useState(false);

    const [viewActive, setViewActive] = useState({
        id: 6,
        title: "Welcome",
        icon: <Leaf size={20} />,
    });

    const handleViewActiveChange = (item) => {
        setViewActive(item);
        setSidebarExpand(false);
    };

    const renderView = () => {
        const viewCode = viewActive?.id || 1;

        switch (viewCode) {
            case 1:
                return <DashboardPane viewActive={viewActive} />;

            case 3:
                return <Users viewActive={viewActive} />;

            default:
                return (
                    <Flex
                        flexGrow={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"100%"}
                        maxWidth={"100vw"}
                        direction={"column"}
                    >
                        <Flex>Welcome to</Flex>
                        <Flex className="asimovian-regular" fontSize={"30px"}>
                            EMPIRE WAY
                        </Flex>
                        <Flex
                            // bg={"yellow"}
                            justifyContent={"center"}
                            width={"100%"}
                            maxWidth={"80vw"}
                            overflowX={"hidden"}
                        >
                            <SchemaIdeas zoom={["0.6", "0.9"]} />
                        </Flex>
                    </Flex>
                );
        }
    };

    useEffect(() => {
        if (user) {
            setLogedInUser(user);
        }
    }, [user]);

    return (
        <Flex
            width={"100vw"}
            height={"100vh"}
            bg={
                "linear-gradient(to bottom, #7B4019, #FF9A00 , #D96F32, #7B4019)"
            }
            px={2}
            py={2}
            className="pt-sans-regular"
            position={"relative"}
        >
            <Head title={viewActive.title} />
            <Sidebar
                viewActive={viewActive}
                handleViewActiveChange={handleViewActiveChange}
                sidebarItem={sidebarItem}
                sidebarExpand={sidebarExpand}
                setSidebarExpand={setSidebarExpand}
            />
            <Flex
                color={"white"}
                px={[0, 0, "20px", "20px"]}
                flexGrow={1}
                direction={"column"}
            >
                <Flex
                    height={"50px"}
                    // borderBottom={"1px"}
                    // borderBottomColor={"white"}
                    width={"100%"}
                    alignItems={"center"}
                    justifyContent={[
                        "space-between",
                        "space-between",
                        "flex-end",
                        "flex-end",
                    ]}
                    // direction={"column"}
                    bg={[
                        "linear-gradient(to bottom, #261805ff, #332407ff)",
                        "linear-gradient(to bottom, #261805ff, #332407ff)",
                        "transparent",
                        "transparent",
                    ]}
                    borderRadius={"10px"}
                >
                    <Flex
                        width={"50px"}
                        height={"50px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={() => {
                            setSidebarExpand((p) => !p);
                        }}
                        cursor={"pointer"}
                        display={["flex", "flex", "none", "none"]}
                    >
                        <Menu size={20} />
                    </Flex>
                    <UserRound user={logedInUser} />
                </Flex>
                <Flex
                    flexGrow={1}
                    mt={[3, 3, 0, 0]}
                    px={[1, 1, 0, 0]}
                    direction={"column"}
                    width={"100%"}
                >
                    {renderView()}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Dashboard;
