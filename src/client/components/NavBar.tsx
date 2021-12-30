import {
    Box,
    Button,
    Flex,
    HStack,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {}

const NavBar = (props: Props) => {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

    return (
        <>
            <Flex w="100%">
                <Text fontSize="x-large" m="3" className="navbar-logo">
                    FindMyFood!
                </Text>

                <HStack align="center" justify="center" spacing="10">
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                </HStack>
            </Flex>
        </>
    );
};

export default NavBar;
