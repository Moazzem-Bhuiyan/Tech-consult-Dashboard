"use client";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useState, useRef } from "react";

const { TabPane } = Tabs;

export default function ProfileContainer() {
  const { data } = useGetMyProfileQuery();
  const user = data?.data;

  // State to store the uploaded image
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : user?.photoUrl
              }
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="border-primary-pink aspect-square h-auto w-[160px] rounded-full border-2 p-1"
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Edit button */}
            <button
              onClick={triggerFileInput}
              className="flex-center absolute bottom-2 right-2 aspect-square rounded-full bg-[#2C50ED] p-2 text-white/95"
            >
              <ImagePlus size={20} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">{user?.name}</h3>
            <p className="mt-1 text-lg font-medium text-primary-blue">
              Administrator
            </p>
            {/* <p>Selected Image: {selectedImage ? selectedImage.name : 'None'}</p> */}
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered>
            <TabPane tab="Edit Profile" key="editProfile">
              <EditProfileForm user={user} selectedImage={selectedImage} />
            </TabPane>

            <TabPane tab="Change Password" key="changePassword">
              <ChangePassForm />
            </TabPane>
          </Tabs>
        </section>
      </div>
    </ConfigProvider>
  );
}
