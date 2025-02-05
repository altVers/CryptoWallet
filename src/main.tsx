import { createRoot } from 'react-dom/client';  
import App from './App';  
import "./index.css"

const rootElement = document.getElementById('root');  

if (rootElement) {  
    const root = createRoot(rootElement);  
    root.render(<App />);  
} else {  
    console.error('Элемент с id "root" не найден');  
}