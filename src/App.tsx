import { Routes, Route, BrowserRouter } from "react-router";
import { Layout } from "./presentation/layout";
import { Dashboard, Clientes, LeadDetail } from "./presentation/pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/clientes"
          element={
            <Layout>
              <Clientes />
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