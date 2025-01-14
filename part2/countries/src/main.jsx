import App from './App'
import { createRoot } from "react-dom/client";

// eslint-disable-next-line react/no-deprecated
const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)