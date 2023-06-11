import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FormInput from "../form-input/form-input";
import './sign-up-form.scss';
import Button from "../button/button";

const defaultSetField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultSetField);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultSetField);
  };

  //   console.log(formFields);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        createUserDocumentFromAuth(user, { displayName });
        resetFormField();
      })
      .catch((error) => {
        if ((error.code = "auth/email-already-in-use")) {
          alert("This email is already signed in!");
        } else {
          console.log(error);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
    <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          required
          name="displayName"
          value={displayName}
        />

        <FormInput
        label="Email"
          type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        />

        <FormInput
        label="Password"
          type="password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        />

        <FormInput
        label="Confirm Password"
          type="password"
          onChange={handleChange}
          required
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
