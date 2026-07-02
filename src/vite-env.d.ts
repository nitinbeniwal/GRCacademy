/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_RAZORPAY_KEY_ID?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Razorpay checkout is loaded from a <script> tag, not npm.
interface RazorpayInstance {
  open: () => void
  on: (event: string, cb: (resp: unknown) => void) => void
}
interface Window {
  Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance
}
