import type { NextPage } from "next";
// import Image from "next/image";
import Link from "next/link";
import MetaDecorator from "components/MetaDecorator";
import InputGroup from "components/InputGroup";
import PasswordInputGroup from "components/PasswordInputGroup";
import useAxiosData from "../hooks/useAxiosData";

import { PrimaryButton } from "components/Button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { authRoutes } from "../data/Routes";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [userName, setName] = useState("");
  const [data, makeRequest] = useAxiosData();

  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    makeRequest(
      axios.post(authRoutes.register, { email, password, name: userName })
    );
  };

  return (
    <>
      <MetaDecorator
        title="Sign Up"
        description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content"
      />
      <main className="container-custom justify-center flex flex-col h-[85vh]">
        {" "}
        <div className="flex flex-col justify-center container-custom">
          <h1>Create an account</h1>
          <p>
            Already have an account? <Link href="/signin">Sign In.</Link>
          </p>
          <form
            className="flex flex-col mt-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputGroup
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />

            <InputGroup
              label="Name"
              type="text"
              value={userName}
              setValue={setName}
            />

            <PasswordInputGroup
              label="Password"
              hidden={passwordHidden}
              setHidden={setPasswordHidden}
              value={password}
              setValue={setPassword}
            />
            <PrimaryButton className="!py-3 mt-6" onClick={handleInput as any}>
              Signup
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
