import { Box, Button, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
    userLoggedIn: boolean
    avatarPath: string | null
}

const NavigationBar = (props: Props) => {
    return (
        <>
            <Flex
                className="navbar"
                w="100%"
                alignItems="center"
                mb="auto"
                position="fixed"
                top="0"
                bg="white"
            >
                <Text
                    fontSize="xx-large"
                    m="3"
                    ml="6"
                    fontFamily="GalyonBold"
                    fontWeight="bold"
                    className="navbar-logo"
                >
                    FindMyFood!
                </Text>

                <Spacer />
                <HStack spacing="10" mr="10">
                    <Link to="" className="navbar-text">
                        About
                    </Link>
                    <Link to="/about" className="navbar-text">
                        Home
                    </Link>
                </HStack>

                {/* TODO: Update new condition for when avatar path is null */}
                {props.userLoggedIn ? (
                    <Image src={`/static/${props.avatarPath}`} />
                ) : (
                    <Box mr="4">
                        <Button variant="outline" colorScheme="whatsapp" mr="4">
                            Sign In
                        </Button>
                        <Button className="navbar-signup" colorScheme="" variant="solid">
                            Sign Up
                        </Button>
                    </Box>
                )}
            </Flex>
        </>
    );
};

export default NavigationBar;
