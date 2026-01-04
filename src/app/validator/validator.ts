import * as yup from "yup";

export const employeeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  gender: yup.string().required("Gender is required"),
  state: yup.string().required("State is required"),
  dob: yup.string().required("Date of birth is required"),
  profileImage: yup.string().required("Profile image is required"),
  active: yup.boolean().required ("Active is required"),
});
