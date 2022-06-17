import React, { Component, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import LoginPage from "./Login";
import Home from "../modules/home/home";

export default function IndexPage() {
  const { data: session } = useSession();

    if(session) {
      return <Home />
    }
    if(!session) {
      if(typeof session === 'undefined') {
        return "undefined";
      }
      if(typeof session === 'object') {
        return <LoginPage />
      }
    }
}