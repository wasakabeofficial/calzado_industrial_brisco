import { Routes, Route } from "react-router";
import { Layout } from "../../presentation/layout";
import { LeadTable, LeadDetail } from "../../presentation/pages";

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
