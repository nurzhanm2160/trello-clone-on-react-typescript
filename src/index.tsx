import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AppStateProvider} from "./AppStateContext";
import { DndProvider } from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <DndProvider backend={HTML5Backend}>
        <AppStateProvider>
            <App/>
        </AppStateProvider>
    </DndProvider>
);


