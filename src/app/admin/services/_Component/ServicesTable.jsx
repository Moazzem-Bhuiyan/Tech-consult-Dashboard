"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { Button, Table } from "antd";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import AddserviceModal from "./AddserviceModal";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/redux/api/serviceApi";
import EditserviceModal from "./EditServiceDetails";
import toast from "react-hot-toast";

export default function ServicesTable() {
  const [showCreateserviceModal, setShowCreateserviceModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // get services from api
  const { data: serviceData, isLoading } = useGetServicesQuery({
    limit: 10,
    page: currentPage,
  });
  // delete service handler
  const [deleteService, { isLoading: deleteLoading }] =
    useDeleteServiceMutation();
  const data = serviceData?.data.map((service, i) => ({
    key: i,
    id: service?._id,
    service_name: service?.title,
    service_subtitle: service?.subTitle,
    initial_price: `${service?.initialPrice}`,
    price: `${service?.finalPrice}`,
    description: service?.description,
    images: service?.images,
    // images is an array of urls
  }));
  const handledeleteService = async (id) => {
    try {
      const res = await deleteService(id).unwrap();
      if (res.success) {
        toast.success("Service deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete the service");
    }
  };
  const columns = [
    {
      title: "Service Name",
      dataIndex: "service_name",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Service Subtitle",
      dataIndex: "service_subtitle",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Initial Price",
      dataIndex: "initial_price",
      render: (value) => <span className="text-gray-700">$ {value}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => <span className="text-gray-700">$ {value}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex items-center">
          <button
            onClick={() => {
              setSelectedService(record);
              setOpen(true);
            }}
            className="mr-4 text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <CustomConfirm
            title="Delete Service"
            message="Are you sure you want to delete this service?"
            onConfirm={() => {
              handledeleteService(record.id);
            }}
          >
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="my-5 flex items-center justify-between gap-10">
        <h2 className="mb-4 text-2xl font-semibold">Services Table</h2>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<PlusCircle size={20} />}
            iconPosition="start"
            className="!w-full !py-6"
            onClick={() => setShowCreateserviceModal(true)}
          >
            Add Service
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} loading={isLoading} />

      {/* add service modal */}
      <AddserviceModal
        open={showCreateserviceModal}
        setOpen={setShowCreateserviceModal}
      />
      {/* edit service modal */}
      <EditserviceModal
        open={open}
        setOpen={setOpen}
        service={selectedService}
      />
    </div>
  );
}
