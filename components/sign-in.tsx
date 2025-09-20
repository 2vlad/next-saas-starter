"use client"

import { handleSignIn, type SignInState } from "@/app/actions/auth"
import { useFormState, useFormStatus } from "react-dom"

const initialState: SignInState = {}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send magic link"}
    </button>
  )
}

export default function SignIn() {
  const [state, formAction] = useFormState(handleSignIn, initialState)

  return (
    <div className="flex flex-col items-start gap-2">
      <form action={formAction} className="flex items-center gap-2">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          className="w-56 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SubmitButton />
      </form>
      {state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-green-600" role="status">
          {state.success}
        </p>
      ) : null}
    </div>
  )
}
