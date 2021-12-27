import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <div>
                <h1
                    className="pnf-header"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Whoops! Where are we?
                </h1>

                <h3>
                    That page doesn't seem to exist. Wanna go back to the{" "}
                    <Link to={"/examplecomponent"}>home page?</Link>
                </h3>
            </div>
        </>
    );
};

export default PageNotFound;
