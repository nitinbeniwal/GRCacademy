const KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

/** Auth is only active when a real Clerk publishable key is configured. */
export const clerkEnabled = Boolean(KEY && KEY.startsWith('pk_'))
export const clerkKey = KEY
