import React from "react";
import { Redirect } from "react-router-dom";
import User from "../models/User";

/**
 *
 * Another way to export directly your functional component.
 */
export const GuestGuard = props => {
  if (!User.isPresentInSessionStorage()) {
    return props.children;
  }
  // if user is already logged in, redirects to home
  return <Redirect to={'/'} />;
};
