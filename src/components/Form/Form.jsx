import { useForm } from "../../hooks";
import "./form.css";

// const defaultValues = { firstName: '' } //no deseo usar esto para inicializar mi formulario
export const Form = () => {
  const { registerField, handleSubmit, formErrors } = useForm();

  const formSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event, formSubmit)}>
      <pre>{JSON.stringify(formErrors, null, 3)}</pre>
      <input
        type="text"
        {...registerField("firstName", {
          required: "This input is required.",
          //   pattern: {
          //     value: /^[A-Za-z]+$/u,
          //     message: "This input only allow letters.",
          //   },
          //   minLength: {
          //     value: 1,
          //     message: "This input must exceed 8 characters",
          //   },
          //   maxLength: {
          //     value: 20,
          //     message: "This input max 20 characters",
          //   },
        })}
      />
      <div className="form-input_button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
