import React from "react";
import BookingTable from "./_Component/BookingTable";

export const metadata = {
  title: "Booking Management - Admin Dashboard",
  description: "Manage and oversee all bookings within the admin dashboard.",
};

const page = () => {
  return (
    <div>
      <BookingTable />
    </div>
  );
};

export default page;
