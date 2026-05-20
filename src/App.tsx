import { BrowserRouter, Routes, Route } from "react-router";
import Logo from "./components/Logo";
import LeadTable from "./components/LeadTable";
import LeadDetail from "./components/LeadDetail";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6"></div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-100 py-4 text-center border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Diseñado por el equipo de Neuropoint.ai
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LeadTable />
            </Layout>
          }
        />
        <Route
          path="/lead/:id"
          element={
            <Layout>
              <LeadDetail />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
