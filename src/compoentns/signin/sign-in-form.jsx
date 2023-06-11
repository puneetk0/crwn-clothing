import { createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input";
import "./sign-in-form.scss";
import Button from "../button/button";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../utils/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const defaultSetField = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultSetField);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultSetField);
  };

  const signInWithGooglePopup = () => {
    signInWithPopup(auth, provider)
      .then(({ }) => {
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signInWithGoogleReditect = () => {
    signInWithRedirect(auth, provider);
  };

  //   console.log(formFields);

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
    })
    .catch((error) => {
      switch(error.code){
        case 'auth/wrong-password': alert("Password is icorrect");
        break;
        case 'auth/user-not-found': alert("No user found with this email");
        break;
        default: console.log(error)
      }
      
   
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type="button" buttonType='google' onClick={signInWithGooglePopup}>Google Sign In</Button>
        </div>

       
      </form>
    </div>
  );
}

export default SignInForm;
