import React, { Component, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoginPage from "./Login"
import Home from "../modules/home/home";
import { Spinner, SpinnerProps } from "@chakra-ui/react";

export default function IndexPage(props: SpinnerProps) {
  const { data: session } = useSession();
    if(session) {
      console.log('shiba -----> ');
      return <Home session={session} />
    }
    if(!session) {
      if(typeof session === 'undefined') {
        return <Spinner
        speed="0.66s"
        ml="50%"
        mt="20%"
        emptyColor="gray.200"
        color="blue.500"
        data-testid="loading-spinner"
        size="xl"
        thickness="4px"
        {...props}
      />
      }
      if(typeof session === 'object') {
        return <LoginPage />
      }
    }
}