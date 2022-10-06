import React from 'react';
import './index.css';
import { EntertainMe } from './EntertainMe';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <EntertainMe />
    </BrowserRouter>
)