import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Header from "../components/Header";
import "./ErrorPage.css";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <Header />
            <div id="error-page">
                <div id="error-message">
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>
                            {
                                isRouteErrorResponse(error) ?
                                    error.statusText :
                                    "Unknown error"
                            }
                        </i>
                    </p>
                </div>
            </div>
        </>
    );
}

export default ErrorPage;