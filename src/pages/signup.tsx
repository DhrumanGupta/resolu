import type { NextPage } from "next";
// import Image from "next/image";
import Link from "next/link";
// import Card from "src/components/Card";
// import InfoCard from "components/home/InfoCard";
// import Message from "components/icons/Message";
// import Search from "components/icons/Search";
// import Verified from "components/icons/Verified";
import MetaDecorator from "components/MetaDecorator";
import InputGroup from "components/InputGroup";
import PasswordInputGroup from "components/PasswordInputGroup";
import { useState } from "react";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <>
      <MetaDecorator
        title="SIgn Up"
        description="BorrowMyBooks is a one-stop application for finding and listing IB-MYP and IBDP books. BorrowMyBooks simplifies the entire process and streamlines communication so you can find and list books faster."
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

            <PasswordInputGroup
              label="Password"
              hidden={passwordHidden}
              setHidden={setPasswordHidden}
              value={password}
              setValue={setPassword}
            />
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

export default Home;
