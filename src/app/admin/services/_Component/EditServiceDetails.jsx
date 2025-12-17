"use client";

import { useEffect, useState } from "react";
import { Button, Divider, Form, Modal, Upload, message } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { RiCloseLargeLine } from "react-icons/ri";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextArea from "@/components/Form/UTextArea";
import { useUpdateServiceMutation } from "@/redux/api/serviceApi";
import toast from "react-hot-toast";

export default function EditServiceModal({ open, setOpen, service }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // edit service api handeller

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  /* ---------------- PREFILL DATA ---------------- */
  useEffect(() => {
    if (service && open) {
      form.setFieldsValue({
        title: service?.service_name,
        subTitle: service?.service_subtitle,
        description: service?.description,
        initialPrice: service?.initial_price,
        finalPrice: service?.price,
      });

      if (service?.images?.length) {
        setFileList(
          service.images.map((img, index) => ({
            uid: index,
            name: `image-${index}`,
            status: "done",
            url: img,
          })),
        );
      }
    }
  }, [service, open, form]);

  /* ---------------- UPLOAD CONFIG ---------------- */
  const uploadProps = {
    multiple: true,
    fileList,
    listType: "picture",
    accept: "image/*",

    onChange: ({ fileList: newFileList }) => {
      if (newFileList.length > 2 && newFileList.length == 2) {
        toast.warning("Maximum 2 images allowed!");
        return;
      }
      setFileList(newFileList);
    },

    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImage) {
        message.error("Only image files are allowed!");
        return Upload.LIST_IGNORE;
      }

      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return Upload.LIST_IGNORE;
      }

      return false; // prevent auto upload
    },

    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <DeleteOutlined />,
    },
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      const data = {
        title: values.title,
        subTitle: values.subTitle,
        description: values.description,
        initialPrice: Number(values.initialPrice),
        finalPrice: Number(values.finalPrice),
      };
      formData.append("data", JSON.stringify(data));
      // Append maximum 2 images
      fileList.slice(0, 2).forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      const result = await updateService({
        data: formData,
        id: service.id,
      }).unwrap();
      if (result.success) {
        toast.success("Service updated successfully");
      }
      setOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create service");
    }
  };

  /* ---------------- CLOSE MODAL ---------------- */
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={800}
      closeIcon={false}
      onCancel={handleClose}
    >
      {/* CLOSE ICON */}
      <div
        className="absolute right-0 top-0 h-12 w-12 cursor-pointer rounded-bl-3xl"
        onClick={handleClose}
      >
        <RiCloseLargeLine
          size={18}
          className="absolute left-1/3 top-1/3 text-black"
        />
      </div>

      <div className="pb-5">
        <h4 className="text-center text-2xl font-medium">Edit Service</h4>

        <Divider />

        <FormWrapper
          form={form}
          onSubmit={handleSubmit}
          defaultValues={{
            title: service?.service_name,
            subTitle: service?.service_subtitle,
            description: service?.description,
            initialPrice: service?.initial_price,
            finalPrice: service?.price,
          }}
        >
          <UInput
            name="title"
            label="Service Name"
            placeholder="Enter service title"
            required
          />

          <UInput
            name="subTitle"
            label="Sub Title"
            placeholder="Enter service sub-title"
            required
          />

          <Form.Item label="Service Images (Max 2)">
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag images to upload</p>
              <p className="ant-upload-hint">
                JPG / PNG • Max 2 images • 5MB each
              </p>
            </Upload.Dragger>

            {fileList.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {fileList.length} / 2 image(s) selected
              </p>
            )}
          </Form.Item>

          <UTextArea
            name="description"
            label="Service Description"
            placeholder="Enter service description"
            required
          />

          <UInput
            name="initialPrice"
            label="Initial Price"
            placeholder="Enter initial price"
            required
          />

          <UInput
            name="finalPrice"
            label="Final Price"
            placeholder="Enter final price"
            required
          />

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="mt-4 w-full"
            loading={isLoading}
          >
            Update Service
          </Button>
        </FormWrapper>
      </div>
    </Modal>
  );
}
