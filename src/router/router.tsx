import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./root";
import Code from "../pages/code/Code";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "code/:roomId",
        element: <Code />,
    },
]);

export default router;