"use client";

import { ConfigProvider, Input, Table } from "antd";
import clsx from "clsx";
import { ArrowRightLeft, Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import EarningModal from "./EarningModal";

// Dummy data
const earningStats = [
  {
    key: "total",
    title: "Total Earnings",
    amount: 350000,
  },
];

// Dummy table data
const data = Array.from({ length: 7 }).map((_, inx) => ({
  key: inx + 1,
  name: "Moazzem Hossain",
  subscription: inx % 2 === 0 ? "Monthly" : "6-Month",
  contact: "+1234567890",
  purchaseDate: "11 oct 24, 11.10PM",
  expiredate: "11 oct 24, 11.10PM",
  amount: 22,
  accNumber: "1234567890",
}));

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);

  // ================== Table Columns ================
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "User Name",
      dataIndex: "name",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          {value}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          ${value}
        </Tag>
      ),
    },
    {
      title: "ACC Number",
      dataIndex: "accNumber",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
    },
    {
      title: "Expire Date",
      dataIndex: "expiredate",
    },

    // {
    //   title: "Pricing Plan",
    //   dataIndex: "pricingPlan",

    //   filters: [
    //     {
    //       text: "Monthly",
    //       value: "monthly",
    //     },
    //     {
    //       text: "Quarterly",
    //       value: "quarterly",
    //     },
    //     {
    //       text: "Yearly",
    //       value: "yearly",
    //     },
    //   ],
    //   filterIcon: () => (
    //     <Filter
    //       size={18}
    //       color="#fff"
    //       className="flex justify-start items-start"
    //     />
    //   ),
    //   onFilter: (value, record) => record.pricingPlan.indexOf(value) === 0,
    // },

    {
      title: "Action",
      render: () => (
        <Tooltip title="Show Details">
          <button onClick={() => setShowEarningModal(true)}>
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
      ),
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
      {/* Earning stats */}
      <section className="he w-1/2">
        {earningStats?.map((stat) => (
          <div
            key={stat.key}
            className={clsx(
              "flex-center-start h-[120px] gap-x-4 rounded-lg from-[#41839E] to-[#0B607E] px-5 py-4 text-lg text-white hover:bg-gradient-to-tr hover:from-[#41839E] hover:to-[#0B607E]",
              stat.key === "today"
                ? "bg-primary-blue"
                : "bg-gradient-to-tr from-[#41839E] to-[#0B607E]",
            )}
          >
            <ArrowRightLeft size={24} />
            <p className="font-dmSans text-3xl">
              {stat.title}
              <span className="pl-3 text-3xl font-semibold">
                $ {stat.amount || 0}
              </span>
            </p>
          </div>
        ))}
      </section>
      <div className="mb-3 ml-auto w-1/3 gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Earning table */}
      <section className="my-10">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          pagination
        ></Table>
      </section>

      {/* Show earning modal */}
      <EarningModal open={showEarningModal} setOpen={setShowEarningModal} />
    </ConfigProvider>
  );
}
