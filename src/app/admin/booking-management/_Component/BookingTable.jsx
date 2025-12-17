"use client";

import { Input, Table, Tag, Button } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search, Trash } from "lucide-react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import toast from "react-hot-toast";

export default function BookingTable({ limit }) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingData, isLoading } = useGetBookingsQuery({
    limit: limit || 10,
    page: currentPage,
    searchTerm: searchText,
  });

  // delte booking api call
  const [deleteBooking, { isLoading: deleteLoading }] =
    useDeleteBookingMutation();
  const bookings = bookingData?.data;

  const data = bookings?.map((item, i) => ({
    key: i,
    id: item?._id,
    customer_name: item?.name,
    service_name: item?.service?.title,
    customer_email: item?.email,
    price: item?.amount,
  }));

  // delete booking handler
  const handledelete = async (id) => {
    try {
      const result = await deleteBooking(id).unwrap();
      if (result.success) {
        toast.success("Booking deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete booking");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Service  Name",
      dataIndex: "service_name",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Customer Email",
      dataIndex: "customer_email",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => <span className="text-gray-700"> $ {value}</span>,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Tooltip title="Delete Booking">
          <CustomConfirm
            title="Are you sure to delete this booking?"
            description="This action cannot be undone."
            okText="Yes, Delete"
            cancelText="Cancel"
            onCancel={() => {
              console.log("Cancel");
            }}
            onConfirm={() => {
              handledelete(record?.id);
            }}
            okButtonProps={{ loading: deleteLoading }}
            loading={deleteLoading}
          >
            <Button
              type="primary"
              color="white"
              shape="circle"
              icon={<Trash color="red" size={16} />}
              style={{ border: "none", background: "transparent" }}
            />
          </CustomConfirm>
        </Tooltip>
      ),

      align: "center",
      fixed: "right",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="mb-4 ml-auto flex w-1/2 gap-x-5">
        <Input
          placeholder="Search by name or product"
          prefix={<Search className="mr-2 text-gray-500" size={20} />}
          className="h-11 rounded-lg border text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div>
        <p className="mb-4 text-sm text-gray-500">
          {/* Total Booking Request: {.length} */}
        </p>
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "100%" }}
        className="rounded-lg shadow-sm"
        rowClassName="hover:bg-gray-50"
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: limit || 10,
          total: bookingData?.meta?.total || 0,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
      />
    </ConfigProvider>
  );
}
