import React, { useContext, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { loginUser } from "../../api.js";
import { Redirect } from "react-router-dom";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    // using API function to submit data to FoodBuddy API
    loginUser({
      email: email,
      password: password,
    });

    // redirect to homepage
    const state = { redirect: "/" };
    return <Redirect to={state.redirect} />;
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.5em" />
      <SubmitButton type="submit" onClick={onSubmit}>
        Login
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
