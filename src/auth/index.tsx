import type { ReactNode } from 'react'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/clerk-react'
import { LogIn } from 'lucide-react'
import { clerkEnabled, clerkKey } from './config'

/** Wraps the app in ClerkProvider when configured; otherwise a no-op passthrough. */
export function AuthProvider({ children }: { children: ReactNode }) {
  if (!clerkEnabled) return <>{children}</>
  return (
    <ClerkProvider publishableKey={clerkKey as string} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  )
}

/** Sign-in / user button for the navbar. Renders nothing when auth is disabled. */
export function AuthControls() {
  if (!clerkEnabled) return null
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn-ghost !px-4 !py-1.5" aria-label="Sign in">
            <LogIn size={15} /> Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn-primary !px-4 !py-1.5 max-sm:hidden">Sign up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}

/** Gate that requires sign-in for protected pages (e.g. dashboard). */
export function RequireAuth({ children }: { children: ReactNode }) {
  if (!clerkEnabled) return <>{children}</>
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="container-x py-24 text-center">
          <div className="text-5xl">🔐</div>
          <h1 className="mt-4 text-2xl font-bold">Sign in to view your learning</h1>
          <p className="mt-2 text-cslate">Your progress, XP and certifications live in your account.</p>
          <div className="mt-6 flex justify-center gap-3">
            <SignInButton mode="modal">
              <button className="btn-primary">Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-ghost">Create account</button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </>
  )
}
