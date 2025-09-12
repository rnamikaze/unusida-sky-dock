import {
    Divider,
    Flex,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    Spinner,
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

const tableWidth = ["10%", "10%", "40%", "30%", "10%"];

const UsersTable = () => {
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
    const retrieveUsers = (page) => {
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

    useEffect(() => {
        if (firstCounter.current > 0) {
            retrieveUsers();
        }
    }, [sortMode, perPage, sortModeDirection]);

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            if (firstCounter.current > 0) {
                retrieveUsers();
            }
        }, 300);

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
                    width={"100px"}
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
                <Flex direction={"column"} pr={"10px"}>
                    <Flex
                        fontWeight={"bold"}
                        width={"100%"}
                        bg={"linear-gradient(to bottom, #261805ff, #332407ff)"}
                        borderRadius={"8px"}
                        py={1}
                    >
                        <Flex
                            width={tableWidth[0]}
                            minWidth={tableWidth[0]}
                            maxWidth={tableWidth[0]}
                            px={2}
                        >
                            #
                        </Flex>
                        <Flex
                            width={tableWidth[1]}
                            minWidth={tableWidth[1]}
                            maxWidth={tableWidth[1]}
                            px={2}
                        >
                            USER ID
                        </Flex>
                        <Flex
                            width={tableWidth[2]}
                            minWidth={tableWidth[2]}
                            maxWidth={tableWidth[2]}
                            px={2}
                        >
                            NAME
                        </Flex>
                        <Flex
                            width={tableWidth[3]}
                            minWidth={tableWidth[3]}
                            maxWidth={tableWidth[3]}
                            px={2}
                        >
                            EMAIL
                        </Flex>
                        <Flex
                            width={tableWidth[4]}
                            minWidth={tableWidth[4]}
                            maxWidth={tableWidth[4]}
                            px={2}
                            alignItems={"center"}
                        >
                            <ArrowDownUp size={18} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    minHeight={window.innerHeight - 258}
                    maxHeight={window.innerHeight - 258}
                    direction={"column"}
                    gap={1}
                    overflowY={"auto"}
                    pb={"10px"}
                    pr={"10px"}
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

export default UsersTable;
