"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useUpdateProfileinfoMutation } from "@/redux/api/authApi";
import { editProfileSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import toast from "react-hot-toast";

export default function EditProfileForm({ user, selectedImage }) {
  const [updateProfie, { isLoading }] = useUpdateProfileinfoMutation();
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      const res = await updateProfie(formData).unwrap();
      if (res.success) {
        toast.success("Profile Update Successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section className="mt-5 px-10">
      {/* <h4></h4> */}
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          name: user?.name,
          email: user?.email,
          contact: user?.contactNumber,
        }}
      >
        <UInput name="name" label="Name" type="text" />
        <UInput name="email" label="Email" type="email" disabled />
        <UInput name="contact" label="Contact" type="contact" />

        <Button
          loading={isLoading}
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}
