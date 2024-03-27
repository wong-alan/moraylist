import { useEffect, useState } from "react";
import { Navigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import "./ErrorPage.css";

interface ErrorPageProps {
    children?: React.ReactNode;
}

const ErrorPage = ({children}: ErrorPageProps) => {
    const REDIRECT_TIME = 5;
    const [timeLeft, setTimeLeft] = useState<number>(REDIRECT_TIME);
    const error = useRouteError();

    useEffect(() => {
        if (!timeLeft) {
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    if (timeLeft == 0) {
        return <Navigate to="/" />
    }

    return (
        <div id="error-page">
            <div id="error-message">
                <h1>Oops!</h1>
                {
                    children ??
                    <>
                        <p>Sorry, an unexpected error has occurred.</p>
                        <p><i>
                            {isRouteErrorResponse(error) ?
                                `${error.status} - ${error.statusText}` :
                                "Unknown error"
                            }
                        </i></p>
                    </>
                }
                <p>Taking you back in ... {timeLeft}</p>
            </div>
        </div>
    );
}

export default ErrorPage;