import React from "react";
import ServicesTable from "./_Component/ServicesTable";
export const metadata = {
  title: "Services Management - Admin Dashboard",
  description: "Manage and oversee all services within the admin dashboard.",
};
export default function page() {
  return (
    <div>
      <ServicesTable />
    </div>
  );
}
