import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

interface Props {
    title?: string;
    description?: string;
    imageUrl?: string;
    hasShadow?: boolean;
    fields?: { title: string; value: string }[];
}

const DetailCard = (props: Props) => {
    const {
        title = "",
        description = "",
        imageUrl = "https://picsum.photos/318/180",
        fields = [],
        hasShadow = true,
    } = props;

    const shadow =
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

    return (
        <>
            <Card
                className="d-card"
                style={hasShadow ? { boxShadow: shadow } : {}}
            >
                <CardImg className="d-card img" src={imageUrl} />
                <CardBody className="">
                    <CardTitle className="d-card title">{title}</CardTitle>
                    <CardText className="d-card desc">{description}</CardText>

                    {fields.map(field => (
                        <CardText
                            className="d-card field"
                            key={`id_${field.title}`}
                        >
                            <span className="d-card field title">
                                {field.title}
                            </span>
                            <span className="d-card field value">
                                : {field.value}
                            </span>
                        </CardText>
                    ))}
                </CardBody>
            </Card>
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
