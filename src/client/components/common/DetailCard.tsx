import { Box, Flex, Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { uuid } from "../../utilities/uuid";

interface Props {
    header?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    fields?: { title: string; value: string }[];
    others?: any[];
}

const DetailCard = (props: Props) => {
    const {
        header = "",
        title = "",
        description = "",
        imageUrl = "https://picsum.photos/seed/picsum/536/354",
        fields = [],
        others = [],
    } = props;

    const { isOpen, onClose, onOpen, } = useDisclosure();

    return (
        <>
            <Box
                className="d-card"
                m="15"
                maxW="md"
                borderRadius="xl"
                overflow="hidden"
            >
                <Image className="d-card-img" src={imageUrl} marginBottom="5" />
                <Stack paddingStart="6" paddingEnd="6" paddingBottom="6">
                    <Text fontSize="sm" className="d-card-header">{header}</Text>
                    <Text

                        className="d-card-desc"
                    >
                        {description}
                    </Text>
                    {fields.map(field => (
                        <Box

                            key={uuid()}
                            className="d-card-field"
                        >
                            <Text key={uuid()} className="d-card-field title">
                                {field.title}:
                            </Text>
                            <Text key={uuid()} className="d-card-field value">
                                {field.value}
                            </Text>
                        </Box>
                    ))}
                </Stack>
                {others}
            </Box>
        </>
    );
};


export const getMockDetailCard = () => {
    return (
        <>
            <DetailCard
                title="This is a detail card title"
                description="This is the description for the detail card, and pertains a high amount of boilerplate to illustrate it."
                fields={[
                    { title: "Field 1", value: "Lorem Ipsum" },
                    { title: "Field 2", value: "Lorem Ipsum" },
                    { title: "Field 3", value: "Lorem Ipsum" },
                ]}
            />
        </>
    );
};

export default DetailCard;
