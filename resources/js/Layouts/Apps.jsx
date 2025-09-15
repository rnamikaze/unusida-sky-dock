import BreadCrumbPane from "@/Components/BreadCrumbPane";
import IconBgRounder from "@/Components/IconBgRounded";
import UsersTable from "@/Components/Tables/UsersTable";
import {
    Divider,
    Flex,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormLabel,
    FormControl,
    Switch,
} from "@chakra-ui/react";
import {
    CircleArrowOutUpLeft,
    CloudCheck,
    LayoutGrid,
    Orbit,
    SquareArrowOutUpRight,
    TriangleAlert,
    UserStar,
    Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatTimestamp } from "@/Functions/dateOps";

const Apps = ({ viewActive, user }) => {
    const [apps, setApps] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedApps, setSelectedApps] = useState(false);

    const retrieveApps = () => {
        setIsLoading(true);

        axios
            .post("/apps/all")
            .then(function (response) {
                console.log(response);

                if (response.status === 200) {
                    setApps(response.data);
                }

                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);

                setIsLoading(false);
            });
    };

    const [isSending, setIsSending] = useState(false);
    const [alertText, setAlertText] = useState(null);

    const sendSuperadminVisitNotify = (app_name) => {
        setIsSending(true);

        axios
            .post("/apps/superadmin-visit-notify", {
                app_name,
            })
            .then(function (response) {
                console.log(response);

                if (response.status === 200) {
                    // setApps(response.data);
                    window.open(
                        `${selectedApps.host}/account/login/superadmin?ssid=${response.data.token}`,
                        "_blank"
                    );
                }

                setIsSending(false);
            })
            .catch(function (error) {
                console.log(error);

                setAlertText(error?.response?.data?.error || "Error Happen");
                setIsSending(false);
            });
    };

    useEffect(() => {
        retrieveApps();
    }, []);

    return (
        <Flex direction={"column"} gap={2} width={"100%"}>
            <BreadCrumbPane />
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
                    <ModalHeader>Manage App</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={"column"} pb={"20px"}>
                            <Flex direction={"column"}>
                                <Flex fontWeight={"bold"}>APP NAME</Flex>

                                <Flex alignItems={"center"} gap={2}>
                                    <LayoutGrid size={18} />
                                    {selectedApps?.name}
                                </Flex>
                            </Flex>
                            <Divider my={2} borderStyle={"dashed"} />
                            <Flex direction={"column"}>
                                <Flex
                                    fontWeight={"bold"}
                                    gap={2}
                                    alignItems={"center"}
                                >
                                    <UserStar size={20} /> Superadmin Account
                                </Flex>
                                <Flex direction={"column"} mt={"10px"}>
                                    <Flex>Name: {user?.name}</Flex>
                                    <Flex>Email: {user?.email}</Flex>
                                    <Flex>Last Login N/A</Flex>
                                    <Flex
                                        fontSize={"14px"}
                                        mt={2}
                                        justifyContent={"flex-end"}
                                        mb={2}
                                    >
                                        login directly using button bellow
                                    </Flex>
                                </Flex>
                                <Flex justifyContent={"flex-end"} mb={2}>
                                    <Button
                                        variant="solid"
                                        borderRadius={"10px"}
                                        colorScheme="orange"
                                        // isLoading={isUpdating}
                                        // isDisabled={!trafficStatus}
                                        gap={2}
                                        size={"sm"}
                                        onClick={() => {
                                            sendSuperadminVisitNotify(
                                                selectedApps?.id
                                            );
                                        }}
                                    >
                                        <SquareArrowOutUpRight size={14} />
                                        <Flex>_superadmin</Flex>
                                    </Button>
                                </Flex>
                                {alertText ? (
                                    <Flex
                                        alignItems={"center"}
                                        gap={2}
                                        justifyContent={"flex-end"}
                                        mt={1}
                                    >
                                        <TriangleAlert size={18} /> {alertText}
                                    </Flex>
                                ) : (
                                    ""
                                )}
                            </Flex>
                            <Divider my={2} borderStyle={"dashed"} />
                            <Flex direction={"column"}>
                                <Flex
                                    fontWeight={"bold"}
                                    gap={2}
                                    alignItems={"center"}
                                >
                                    <Orbit size={20} /> App State
                                </Flex>
                                <Flex direction={"column"} my={"10px"}>
                                    <Flex>Active since N/A</Flex>
                                    <Flex>Maintenance since N/A</Flex>
                                </Flex>
                                <Flex justifyContent={"flex-end"} gap={2}>
                                    <Button
                                        variant="solid"
                                        borderRadius={"10px"}
                                        colorScheme="red"
                                        // isLoading={isUpdating}
                                        // isDisabled={!trafficStatus}
                                        gap={2}
                                        size={"sm"}
                                    >
                                        Disable
                                    </Button>
                                    <Button
                                        variant="solid"
                                        borderRadius={"10px"}
                                        colorScheme="purple"
                                        // isLoading={isUpdating}
                                        // isDisabled={!trafficStatus}
                                        gap={2}
                                        size={"sm"}
                                    >
                                        Maintenance Mode
                                    </Button>
                                </Flex>
                            </Flex>
                            {/* <Divider my={2} /> */}
                        </Flex>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button
                            variant="solid"
                            borderRadius={"10px"}
                            colorScheme="orange"
                            // isLoading={isUpdating}
                            // isDisabled={!trafficStatus}
                            gap={2}
                            size={"sm"}
                        >
                            Login Superadmin <CircleArrowOutUpLeft size={16} />
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
            <Flex fontWeight={"bold"} gap={2} alignItems={"center"}>
                <Flex
                    border={"2px"}
                    width={"30px"}
                    height={"30px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderColor={"white"}
                    borderRadius={"10px"}
                    bg={"white"}
                    color={"#2f2006"}
                >
                    {viewActive.icon}
                </Flex>
                <Flex fontSize={"18px"} textTransform={"uppercase"}>
                    {viewActive.title}
                </Flex>
            </Flex>
            <Flex gap={1} direction={"column"}>
                {apps.map((app) => {
                    return (
                        <AppsItem
                            key={app.id}
                            app={app}
                            onClick={(e) => {
                                setSelectedApps(e);
                                onOpen();
                            }}
                        />
                    );
                })}
            </Flex>
        </Flex>
    );
};

const AppsItem = ({ app, onClick }) => {
    return (
        <Flex
            direction={"column"}
            bg={"#F3E9DC"}
            width={"100%"}
            color={"gray.700"}
            borderRadius={"8px"}
            py={1}
            cursor={"pointer"}
            px={3}
            onClick={() => {
                onClick(app);
            }}
        >
            <Flex>{app.name}</Flex>
            <Divider borderColor={"#9c9c9aff"} />
            <Flex gap={3} pt={2} pb={1}>
                <Flex gap={1}>
                    <IconBgRounder bg="blue.400">
                        <CloudCheck size={18} />
                    </IconBgRounder>{" "}
                    Active
                </Flex>
                <Flex alignItems={"center"} gap={1}>
                    <IconBgRounder bg="gray.500">
                        <Wrench size={16} />
                    </IconBgRounder>
                    Last Maintenance N/A
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Apps;
