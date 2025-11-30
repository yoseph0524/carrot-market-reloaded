"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { smsLogIn } from "./action";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          type="number"
          placeholder="Phone number"
          required
          name={"phone"}
          errors={state.error?.formErrors}
        />
        {state.token ? (
          <Input
            type="text"
            placeholder="Verification code"
            required
            name={"token"}
            min={1000000}
            max={999999}
          />
        ) : null}
        <Button
          text={state.token ? "Verify Token" : " Send Verification SMS"}
        />
      </form>
    </div>
  );
}
