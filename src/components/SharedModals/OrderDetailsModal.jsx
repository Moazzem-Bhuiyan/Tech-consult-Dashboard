"use client";

import {Divider, Modal} from "antd";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import {Tag} from "antd";

export default function OrderDetailsModal({open, setOpen}) {
     return (
          <Modal
               centered
               open={open}
               setOpen={setOpen}
               footer={null}
               onCancel={() => {
                    setOpen(false);
               }}>
               <h3 className="text-2xl font-bold text-black text-center">
                    Order Details
               </h3>
               <Divider />
               <div className="flex flex-col items-center gap-4 rounded-lg ">
                    <Image
                         src={userImage}
                         alt="user image"
                         height={2400}
                         width={2400}
                         className="w-[20%] h-auto rounded-full aspect-square"
                    />

                    <h4 className="text-lg font-bold text-black">Boxxos</h4>
               </div>
               <Divider />

               <div className=" grid grid-cols-1 gap-7 px-12 py-8 md:grid-cols-2 ">
                    <div className="text-black">
                         <h5 className=" font-bold">Order Id</h5>
                         <p className="font-dmSans text-base">#0000008f</p>
                    </div>
                    <div className="text-black">
                         <h5 className=" font-bold">Order Date </h5>
                         <p className="font-dmSans text-base">11 Oct, 2024</p>
                    </div>
                    <div className="text-black">
                         <h5 className=" font-bold">Amount</h5>
                         <p className="font-dmSans text-base">$500</p>
                    </div>
                    <div className="text-black">
                         <h5 className=" font-bold">Product Name </h5>
                         <p className="font-dmSans">
                              <Tag
                                   color="cyan"
                                   className="!text-sm !mt-1 !font-semibold">
                                   Mobile Phone
                              </Tag>
                         </p>
                    </div>
               </div>
          </Modal>
     );
}
