import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
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
    );
}

export default ErrorPage;