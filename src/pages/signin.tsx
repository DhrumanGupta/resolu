import type { NextPage } from "next";
import Link from "next/link";
import MetaDecorator from "components/MetaDecorator";
import InputGroup from "components/InputGroup";
import PasswordInputGroup from "components/PasswordInputGroup";
import { FormEvent, useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "components/Button";
import axios from "axios";
import { authRoutes } from "../data/Routes";
import useUser from "../hooks/useUser";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [message, setMessage] = useState({ error: false, value: "" });

  const { mutate } = useUser();

  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    axios
      .post(authRoutes.login, { email, password })
      .then((resp) => {
        setMessage({
          error: false,
          value: "Login successful! You will be redirected shortly..",
        });
        mutate(null);
      })
      .catch((resp) => {
        setMessage({
          error: true,
          value: "Invalid OTP entered",
        });
      });

    mutate(null);
  };

  return (
    <>
      <MetaDecorator
        title="Sign In"
        description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content"
      />
      <main className="container-custom justify-center flex flex-col h-[85vh]">
        {" "}
        <div className="flex flex-col justify-center container-custom">
          <h1>Login to your account</h1>
          <p>
            Don&apos;t have an account? <Link href="/signup">Sign Up.</Link>
          </p>
          <form
            className="flex flex-col mt-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />

            <PasswordInputGroup
              label="Password"
              hidden={passwordHidden}
              setHidden={setPasswordHidden}
              value={password}
              setValue={setPassword}
            />
            <PrimaryButton className="!py-3 mt-6" onClick={handleInput as any}>
              Login
            </PrimaryButton>
          </form>
          {/* <h1 className="mb-1">Don&apos;t buy, borrow</h1>
          <p className="md:max-w-[90%] lg:max-w-[80%]">
            Buying new books every year is expensive and wasteful. BorrowMyBooks
            allows you to find and coordinate book pickups from other students.
            Get started by <Link href="signup">signing up</Link>, or browsing
            the <Link href="listings">current listings</Link>.
          </p>
        </div>
        <div className="w-full h-96 md:h-112 relative">
          <Image
            src="/images/index/books.png"
            alt="IB Books"
            layout="fill"
            objectFit="contain"
          /> */}
        </div>
      </main>
    </>
  );
};

// @ts-ignore
Home.isAnonymous = true;

export default Home;
