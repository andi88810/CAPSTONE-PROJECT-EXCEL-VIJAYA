import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const PublicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <div className="">
    
      <Header />
      <Nav />
      <main className="flex-grow mx-auto max-w-6xl px-8 py-10">
        {isPageLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loading aria-live="polite" aria-busy="true" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
