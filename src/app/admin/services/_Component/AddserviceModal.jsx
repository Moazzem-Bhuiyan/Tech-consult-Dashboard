import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Divider, Form, Modal, Upload } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import UTextArea from "@/components/Form/UTextArea";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import toast from "react-hot-toast";
export default function AddserviceModal({ open, setOpen }) {
  const [fileList, setFileList] = useState([]);
  const [addService, { isLoading }] = useCreateServiceMutation();

  const uploadProps = {
    name: "images",
    multiple: true,
    fileList,
    onChange: ({ fileList: newFileList }) => {
      // Limit to maximum 2 files
      if (newFileList.length > 2) {
        message.warning("Maximum 2 images allowed!");
        return;
      }
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isImage = file.type && file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }

      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }

      message.success(`${file.name} selected successfully.`);
      return false; // Prevent auto upload
    },
    maxCount: 2,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <DeleteOutlined />,
    },
  };

  const handlesubmit = async (values) => {
    try {
      const formData = new FormData();
      const data = {
        title: values.title,
        subTitle: values.subTitle,
        description: values.description,
        initialPrice: Number(values.initialPrice),
        finalPrice: Number(values.finalPrice),
      };
      console.log("data", data);
      formData.append("data", JSON.stringify(data));

      // Append maximum 2 images
      fileList.slice(0, 2).forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      const result = await addService(formData).unwrap();
      if (result.success) {
        toast.success("Service created successfully");
      }
      setOpen(false);
      setFileList([]);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create service");
    }
  };
  return (
    <div>
      <Modal
        open={open}
        footer={null}
        centered
        onCancel={() => setOpen(false)}
        closeIcon={false}
        width={800}
      >
        {/* Close Icon */}
        <div
          className="absolute right-0 top-0 h-12 w-12 cursor-pointer rounded-bl-3xl"
          onClick={() => setOpen(false)}
        >
          <RiCloseLargeLine
            size={18}
            color="black"
            className="absolute left-1/3 top-1/3"
          />
        </div>

        <div className="pb-5">
          <h4 className="text-center text-2xl font-medium">Add Service</h4>
          <Divider />
          <div className="flex-1">
            {/* Form content goes here */}
            <FormWrapper onSubmit={handlesubmit}>
              <UInput
                name="title"
                label="Service Name"
                type="text"
                placeholder={"Enter service title"}
                required={true}
              />
              <UInput
                name="subTitle"
                label="Sub Title"
                type="text"
                placeholder={"Enter service sub-title"}
                required={true}
              />
              <Form.Item
                label="Service Images (Max 2)"
                name="images"
                className="mb-6"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) return e;
                  return e && e.fileList;
                }}
                rules={[
                  { required: false, message: "Please upload service images" },
                ]}
              >
                <Upload.Dragger
                  {...uploadProps}
                  listType="picture"
                  accept="image/*"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag images to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support JPG, PNG files (Max 2 images, 5MB each)
                  </p>
                </Upload.Dragger>
                {fileList.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    {fileList.length} / 2 image(s) selected
                  </p>
                )}
                {fileList.length === 2 && (
                  <p className="mt-1 text-sm text-orange-600">
                    Maximum images reached
                  </p>
                )}
              </Form.Item>
              <UTextArea
                name="description"
                label="Service Description"
                type="textarea"
                placeholder={"Enter service description"}
                required={true}
              />
              <UInput
                name="initialPrice"
                label="Initial Price"
                type="number"
                placeholder={"Enter the initial price for booking"}
                required={true}
              />
              <UInput
                name="finalPrice"
                label="Final Price"
                type="number"
                placeholder={"Enter the total price of this service"}
                required={true}
              />

              <Button
                htmlType="submit"
                className="w-full"
                size="large"
                type="primary"
                loading={isLoading}
                disabled={isLoading}
              >
                Add Service
              </Button>
            </FormWrapper>
          </div>
        </div>
      </Modal>
    </div>
  );
}
