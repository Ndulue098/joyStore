"use server"

import { signIn } from "../../(admin)/auth"

export async function signinAction(){
  await signIn("google",{redirectTo:"/admin"})
  
}