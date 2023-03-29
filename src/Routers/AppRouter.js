
import React from 'react'

import { Routes, Route } from "react-router-dom";

export default function AppRouter() {
    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    )
}