import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
              Loading todo app…
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
