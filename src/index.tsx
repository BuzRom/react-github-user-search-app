import { createRoot } from "react-dom/client"
import App from "./App"

import './style/index.scss';

const rootElement = document.getElementById("root")
const root = createRoot(rootElement ? rootElement : document.body)
root.render(<App />)
