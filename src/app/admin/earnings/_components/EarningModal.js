"use client";

import { Divider, Modal } from "antd";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tag } from "antd";

export default function EarningModal({ open, setOpen }) {
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title={null}
    >
      <h1 className=" text-center text-2xl font-bold my-10">Transaction Details</h1>
      <Divider/>

      <section className="text-lg font-medium space-y-5 px-4 my-4">
        <div className="flex-center-between">
          <span>Name :</span>
          <span>John Doe</span>
        </div>
        <Divider/>
        <div className="flex-center-between">
          <span>Transaction ID :</span>
          <span>#0000008f</span>
        </div>
        <Divider/>
        <div className="flex-center-between">
          <span>Amount :</span>
          <span>$500</span>
        </div>
        <Divider/>
        <div className="flex-center-between">
          <span>A/C number :</span>
          <span>*** **** **** *545</span>
        </div>
        <Divider/>
        <div className="flex-center-between">
          <span>Date :</span>
          <span>11 Oct, 2024</span>
        </div>
      </section>
    </Modal>
  );
}
