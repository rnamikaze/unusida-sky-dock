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
} from "@chakra-ui/react";
import {
    ArrowDownUp,
    OctagonMinus,
    Search,
    TrendingUpDown,
    ClockArrowUp,
    Network,
    UserRound,
} from "lucide-react";
import { formatTimestamp } from "@/Functions/dateOps";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";

const tableWidth = ["10%", "15%", "19%", "19%", "19%", "18%"];

const TrafficLogsTable = () => {
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

    const [isLoading, setIsLoading] = useState(false);
    const retrieveUsers = (page = 1) => {
        setIsLoading(true);

        axios
            .post(`/traffics/all?page=${page}`, {
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
                {/* <InputGroup size={"sm"} width={"250px"}>
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
                </InputGroup> */}
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
                            ACTION
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
                            EVENT
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
                            ISSUER
                        </Flex>
                        <Flex
                            width={[
                                "max-content",
                                "max-content",
                                tableWidth[5],
                                tableWidth[5],
                            ]}
                            minWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[5],
                                tableWidth[5],
                            ]}
                            maxWidth={[
                                "max-content",
                                "max-content",
                                tableWidth[5],
                                tableWidth[5],
                            ]}
                            px={2}
                            alignItems={"center"}
                        >
                            APP NAME
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

const TableItem = ({ item, from, index }) => {
    return (
        <Flex
            width={"100%"}
            bg={"#F3E9DC"}
            color={"gray.700"}
            borderRadius={"8px"}
            py={1}
            cursor={"pointer"}
            direction={"column"}
        >
            <Flex
                width={"100%"}
                pb={1}
                // direction={["row", "row", "column", "column"]}
                wrap={"wrap"}
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
                    fontWeight={"bold"}
                >
                    {from + index}
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
                    {item?.user?.ext_dat_id || "N/A"}
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
                    textTransform={"capitalize"}
                >
                    {item?.action || "N/A"}
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
                    textTransform={"capitalize"}
                >
                    {item?.event || "N/A"}
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
                >
                    {item?.token_deck?.issuer || "N/A"}
                </Flex>
                <Flex
                    width={[
                        "max-content",
                        "max-content",
                        tableWidth[5],
                        tableWidth[5],
                    ]}
                    minWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[5],
                        tableWidth[5],
                    ]}
                    maxWidth={[
                        "max-content",
                        "max-content",
                        tableWidth[5],
                        tableWidth[5],
                    ]}
                    px={2}
                >
                    {item?.token_deck?.app_name || "N/A"}
                </Flex>
            </Flex>
            <Divider borderColor={"#9c9c9aff"} />
            <Flex
                py={1}
                justifyContent={"flex-start"}
                px={2}
                direction={["column", "column", "row", "row"]}
                // wrap={"wrap"}
            >
                <Flex px={2} alignItems={"center"} gap={2}>
                    <UserRound size={16} /> {item?.user?.name}
                </Flex>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <ClockArrowUp size={16} />
                    {formatTimestamp(item?.created_at)}
                </Flex>
                <Flex px={2} alignItems={"center"} gap={2}>
                    <Network size={16} /> Last IP{" "}
                    {item?.token_deck?.ip_address || "N/A"}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default TrafficLogsTable;
