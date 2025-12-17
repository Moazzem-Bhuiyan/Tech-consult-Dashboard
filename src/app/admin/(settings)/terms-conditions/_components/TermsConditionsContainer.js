"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import {
  useGetTermsAndPrivacyQuery,
  useUpdateTermsAndPrivacyMutation,
} from "@/redux/api/settingsApi";
import { Button } from "antd";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";

export default function TermsConditionsContainer() {
  const { data } = useGetTermsAndPrivacyQuery();
  const value = data?.data?.termsAndConditions;
  // update contetnt api handeller
  const [updateContent, { isLoading: updating }] =
    useUpdateTermsAndPrivacyMutation();

  const handleSubmit = async (values) => {
    try {
      const res = await updateContent(values).unwrap();
      if (res.success) {
        toast.success("Content Update Successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          value={value}
          name="termsAndConditions"
          placeholder="Note: Enter details about your privacy policy here."
        />
        <Button
          type="primary"
          loading={updating}
          size="large"
          className="w-full rounded-xl"
          htmlType="submit"
          icon={<Edit size={18} />}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
