"use server"

import { redirect } from "next/navigation"
import { signOut } from "../../(admin)/auth"

export async function signoutAction(){
  await signOut({ redirectTo: "/" })
}