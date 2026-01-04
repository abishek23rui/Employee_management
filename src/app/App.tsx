import { RouterProvider } from "react-router-dom";
import router from "./router";
import "../font.css";
import "../shared/components/ui/FormField.scss";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
