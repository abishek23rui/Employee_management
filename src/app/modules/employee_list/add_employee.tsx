import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Switch } from "@mui/material";
import { employeeSchema } from "../../validator/validator";
import FormField from "../../../components/Formfield";

interface Props {
  onSubmitData: (data: any) => void;
  onClose: () => void;
  initialValues?: any;
}

function AddEmployeeForm({ onSubmitData, onClose, initialValues }: Props) {
  const isEdit = Boolean(initialValues);

  const [preview, setPreview] = useState(initialValues?.profileImage || "");
  const [showImageModal, setShowImageModal] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: "",
      gender: "",
      state: "",
      dob: "",
      profileImage: "",
      active: true,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name || "",
        gender: initialValues.gender || "",
        state: initialValues.state || "",
        dob: initialValues.dob || "",
        profileImage: initialValues.profileImage || "",
        active: initialValues.active ?? true,
      });
      setPreview(initialValues.profileImage || "");
    }
  }, [initialValues, reset]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setValue("profileImage", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitForm = (data: any) => {
    const payload = isEdit ? { ...initialValues, ...data } : data;

    onSubmitData(payload);
    onClose();
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">
        {isEdit ? "Edit Employee" : "Create Employee"}
      </h3>

      <FormField
        name="name"
        label="Name"
        control={control}
        placeholder="Enter name"
        error={errors.name?.message as string}
        isRequired
      />

      <FormField
        name="gender"
        label="Gender"
        type="select"
        control={control}
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        placeholder="Select gender"
        error={errors.gender?.message as string}
        isRequired
      />

      <FormField
        name="state"
        label="State"
        type="select"
        control={control}
        placeholder="Enter state"
        options={[
          { label: "Tamil Nadu", value: "Tamil Nadu" },
          { label: "Kerala", value: "Kerala" },
        ]}
        error={errors.state?.message as string}
        isRequired
      />

      <FormField
        name="dob"
        label="Date of Birth"
        type="date"
        control={control}
        error={errors.dob?.message as string}
        isRequired
      />

      {/* Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Active</span>
        <Switch
          defaultChecked={initialValues?.active ?? true}
          onChange={(e) => setValue("active", e.target.checked)}
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="text-sm font-medium">Profile Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 w-full"
        />

        {preview && (
          <>
            <img
              src={preview}
              alt="Preview"
              onClick={() => setShowImageModal(true)}
              className="w-20 h-20 rounded-full mt-2 object-cover cursor-pointer ring-2 ring-gray-200 hover:ring-blue-400"
            />

            {/* error message */}
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage?.message as string}
              </p>
            )}
          </>
        )}

        {errors.profileImage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.profileImage?.message as string}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 rounded border hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit(submitForm)}
          className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Save"}
        </button>
      </div>
      {showImageModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-xl max-w-sm w-full">
            <h4 className="text-sm font-semibold mb-3">
              Profile Image Preview
            </h4>

            <img
              src={preview}
              alt="Preview Large"
              className="w-full h-72 object-contain rounded-md border"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-3 py-2 rounded border hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEmployeeForm;
