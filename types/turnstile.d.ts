export {};

declare global {
  interface TurnstileRenderOptions {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback"?: () => void;
    theme?: "light" | "dark" | "auto";
  }

  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: TurnstileRenderOptions) => string;
    };
  }
}
