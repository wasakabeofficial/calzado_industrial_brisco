import { Routes, Route } from "react-router";
import { Layout } from "../../presentation/layout";
import { Dashboard, Clientes, Campanas, CampanaDetail, LeadDetail } from "../../presentation/pages";

export default function AppRoutes() {
  return (
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
        path="/campanas"
        element={
          <Layout>
            <Campanas />
          </Layout>
        }
      />
      <Route
        path="/campanas/:id"
        element={
          <Layout>
            <CampanaDetail />
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
  );
}
