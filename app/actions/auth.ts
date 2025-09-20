"use server"

import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth"

export type SignInState = {
  error?: string
  success?: string
}

export async function handleSignIn(
  _prevState: SignInState | undefined,
  formData: FormData
): Promise<SignInState> {
  const email = formData.get("email")

  if (!email || typeof email !== "string") {
    return {
      error: "Please enter a valid email address to receive a login link.",
    }
  }

  const normalizedEmail = email.trim()

  if (!normalizedEmail) {
    return {
      error: "Please enter a valid email address to receive a login link.",
    }
  }

  try {
    await signIn("nodemailer", {
      email: normalizedEmail,
      redirectTo: "/app",
    })

    return {
      success: "Check your inbox for a magic link to continue.",
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthAccountNotLinked":
          return {
            error: "Please sign in using the same provider you used previously.",
          }
        default:
          return {
            error: "We couldn't sign you in. Please try again.",
          }
      }
    }

    return {
      error: "Something went wrong. Please try again in a moment.",
    }
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" })
}
