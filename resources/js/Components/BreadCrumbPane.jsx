import { getDayName, getFormattedDate } from "@/Functions/dateOps";
import { Flex } from "@chakra-ui/react";

const BreadCrumbPane = () => {
    return (
        <Flex lineHeight={"1.2em"}>
            {getDayName()},
            <br />
            {getFormattedDate()}
        </Flex>
    );
};

export default BreadCrumbPane;
