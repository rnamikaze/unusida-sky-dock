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
    ArrowDownUp,
    OctagonMinus,
    Search,
    TrendingUpDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TableItem from "./TableItem";
import Pagination from "./Pagination";
import { formatTimestamp } from "@/Functions/dateOps";

const tableWidth = ["10%", "10%", "40%", "30%", "10%"];

const UsersTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setUsers] = useState([]);
    const [perPage, setPerPage] = useState("25");
    const [search, setSearch] = useState("");
    const [sortMode, setSortMode] = useState(null);
    const [sortModeDirection, setSortModeDirection] = useState("asc");
    const firstCounter = useRef(0);
    const [paginationProps, setPaginationProps] = useState({
        page: 1,
        last: 1,
        from: 1,
    });

    // Edit Val
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserReqAllow, setSelectedUserReqAllow] = useState(false);
    const [trafficStatus, setTrafficStatus] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const retrieveUsers = (page = 1) => {
        setIsLoading(true);

        axios
            .post(`/users/all?page=${page}`, {
                search: search,
                per_page: parseInt(perPage),
                sort_mode: sortMode,
                sort_direction: sortModeDirection,
            })
            .then(function (response) {
                // console.log(response);

                if (response.status === 200) {
                    setUsers(response.data.users.data);
                    // console.log(response.data.users.data);
                    setPaginationProps({
                        page: response.data.users.current_page,
                        last: response.data.users.last_page,
                        from: response.data.users.from,
                    });
                }
                setIsLoading(false);
            })
            .catch(function (error) {
                // console.log(error);
                setIsLoading(false);
            });
    };

    const [isUpdating, setIsUpdating] = useState(false);
    const updateReqAllow = () => {
        setIsUpdating(true);

        // setTimeout(() => {
        //     setIsUpdating(false);
        // }, 3000);

        axios
            .post("/users/update-setting", {
                user_id: selectedUser?.id,
                allow: selectedUserReqAllow,
            })
            .then(function (response) {
                console.log(response);

                if (response.status === 200) {
                    retrieveUsers();
                    setTrafficStatus(response.data.traffic_status);
                }
                setIsUpdating(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsUpdating(false);
            });
    };

    useEffect(() => {
        if (firstCounter.current > 0) {
            retrieveUsers();
        }
    }, [sortMode, perPage, sortModeDirection]);

    useEffect(() => {
        let searchTimeout;

        if (firstCounter.current > 0) {
            searchTimeout = setTimeout(() => {
                retrieveUsers();
            }, 300);
        }

        return () => {
            clearTimeout(searchTimeout); // ✅ correct cleanup
        };
    }, [search]);

    useEffect(() => {
        retrieveUsers();
        firstCounter.current += 1;
    }, []);

    return (
        <>
            <Flex justifyContent={"flex-start"} gap={1}>
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
                        <ModalHeader>Manage User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex direction={"column"}>
                                <Flex>
                                    <Button
                                        variant="solid"
                                        borderRadius={"full"}
                                        colorScheme="orange"
                                        size={"sm"}
                                    >
                                        Load Master User Data
                                    </Button>
                                </Flex>
                                <Divider my={2} />
                                <Flex fontWeight={"bold"}>
                                    USER ID {selectedUser?.ext_dat_id}
                                </Flex>
                                <Flex>{selectedUser?.name}</Flex>
                                <Flex>{selectedUser?.email}</Flex>
                                {trafficStatus ? (
                                    <>
                                        {" "}
                                        <Divider my={2} />
                                        <Flex>
                                            <FormControl
                                                display="flex"
                                                // alignItems="center"
                                                flexDirection={"column"}
                                            >
                                                <FormLabel
                                                    htmlFor="email-alerts"
                                                    mb="0"
                                                >
                                                    Traffic Request
                                                </FormLabel>
                                                <Flex alignItems={"center"}>
                                                    <Switch
                                                        id="email-alerts"
                                                        isChecked={
                                                            selectedUserReqAllow
                                                        }
                                                        colorScheme="orange"
                                                        onChange={(e) => {
                                                            setSelectedUserReqAllow(
                                                                e.target.checked
                                                            );
                                                        }}
                                                        isDisabled={isUpdating}
                                                    />
                                                    <Flex
                                                        ml={2}
                                                        fontWeight={"bold"}
                                                    >
                                                        {selectedUserReqAllow
                                                            ? "Allowed"
                                                            : "Blocked"}
                                                    </Flex>
                                                </Flex>
                                            </FormControl>
                                        </Flex>
                                        <Flex mt={4}>Last Modified</Flex>
                                        <Flex>
                                            {formatTimestamp(
                                                trafficStatus?.updated_at
                                            )}
                                        </Flex>
                                    </>
                                ) : (
                                    ""
                                )}
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button> */}
                            <Button
                                variant="solid"
                                borderRadius={"full"}
                                colorScheme="orange"
                                isLoading={isUpdating}
                                onClick={() => {
                                    updateReqAllow();
                                }}
                                isDisabled={!trafficStatus}
                            >
                                Apply
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <InputGroup size={"sm"} width={"250px"}>
                    <Input
                        borderLeftRadius={"8px"}
                        size={"sm"}
                        bg={"#2e2006"}
                        border={"transparent"}
                        placeholder="Search"
                        _placeholder={{
                            color: "white",
                        }}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <InputRightAddon
                        bg={"#2e2006"}
                        borderRightRadius={"8px"}
                        border={"transparent"}
                    >
                        <Search size={18} />
                    </InputRightAddon>
                </InputGroup>
                <Select
                    size={"sm"}
                    bg={"#2e2006"}
                    borderRadius={"8px"}
                    border={"transparent"}
                    width={["max-content", "max-content", "100px", "100px"]}
                    flexGrow={[1, 1, 0, 0]}
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(e.target.value);
                    }}
                >
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option value={"75"}>75</option>
                </Select>
            </Flex>
            <Flex direction={"column"} width={"100%"} gap={1}>
                <Flex direction={"column"} pr={[0, 0, "10px", "10px"]}>
                    <Flex
                        fontWeight={"bold"}
                        width={"100%"}
                        bg={"linear-gradient(to bottom, #261805ff, #332407ff)"}
                        borderRadius={"8px"}
                        py={1}
                        wrap={"wrap"}
                        // direction={["row", "row", "column", "column"]}
                    >
                        <Flex
                            width={[
                                "max-content",
                                "max-content",
                                tableWidth[0],
                                tableWidth[0],
                            ]}
                            minWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[0],
                                tableWidth[0],
                            ]}
                            maxWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[0],
                                tableWidth[0],
                            ]}
                            px={2}
                        >
                            #
                        </Flex>
                        <Flex
                            width={[
                                "max-content",
                                "max-content",
                                tableWidth[1],
                                tableWidth[1],
                            ]}
                            minWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[1],
                                tableWidth[1],
                            ]}
                            maxWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[1],
                                tableWidth[1],
                            ]}
                            px={2}
                        >
                            USER ID
                        </Flex>
                        <Flex
                            width={[
                                "max-content",
                                "max-content",
                                tableWidth[2],
                                tableWidth[2],
                            ]}
                            minWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[2],
                                tableWidth[2],
                            ]}
                            maxWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[2],
                                tableWidth[2],
                            ]}
                            px={2}
                        >
                            NAME
                        </Flex>
                        <Flex
                            width={[
                                "max-content",
                                "max-content",
                                tableWidth[3],
                                tableWidth[3],
                            ]}
                            minWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[3],
                                tableWidth[3],
                            ]}
                            maxWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[3],
                                tableWidth[3],
                            ]}
                            px={2}
                        >
                            EMAIL
                        </Flex>
                        <Flex
                            width={[
                                "max-content",
                                "max-content",
                                tableWidth[4],
                                tableWidth[4],
                            ]}
                            minWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[4],
                                tableWidth[4],
                            ]}
                            maxWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[4],
                                tableWidth[4],
                            ]}
                            px={2}
                            alignItems={"center"}
                        >
                            <ArrowDownUp size={18} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    minHeight={[
                        window.innerHeight - 310,
                        window.innerHeight - 310,
                        window.innerHeight - 262,
                        window.innerHeight - 262,
                    ]}
                    maxHeight={[
                        window.innerHeight - 310,
                        window.innerHeight - 310,
                        window.innerHeight - 262,
                        window.innerHeight - 262,
                    ]}
                    direction={"column"}
                    gap={1}
                    overflowY={"auto"}
                    pb={"10px"}
                    pr={[0, 0, "10px", "10px"]}
                    flexGrow={1}
                >
                    {isLoading ? (
                        <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            height={"100%"}
                            direction={"column"}
                            gap={2}
                        >
                            <Spinner thickness="5px" size={"lg"} />
                            <Flex fontWeight={"bold"} letterSpacing={"2px"}>
                                LOADING
                            </Flex>
                        </Flex>
                    ) : (
                        users.map((user, index) => {
                            return (
                                <TableItem
                                    key={user.id}
                                    item={user}
                                    from={paginationProps.from}
                                    index={index}
                                    handleClick={(e) => {
                                        setSelectedUser(e);
                                        setSelectedUserReqAllow(
                                            e?.traffic_status?.allow == 1 ||
                                                false
                                        );
                                        setTrafficStatus(e?.traffic_status);
                                        onOpen();
                                    }}
                                />
                            );
                        })
                    )}
                </Flex>
                <Pagination
                    currentPage={paginationProps.page}
                    lastPage={paginationProps.last}
                    onPageChange={(page) => {
                        retrieveUsers(page);
                    }}
                />
            </Flex>
        </>
    );
};

export default UsersTable;
