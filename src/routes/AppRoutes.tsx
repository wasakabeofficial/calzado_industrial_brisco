import { Routes, Route } from "react-router";
import Layout from "../components/ux/Layout";
import LeadTable from "../components/ux/LeadTable";
import LeadDetail from "../components/ux/LeadDetail";

export default function AppRoutes() {
  return (
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
  );
}
