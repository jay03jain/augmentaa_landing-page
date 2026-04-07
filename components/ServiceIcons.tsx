const common = "h-8 w-8";

export function IconCircuit() {
  return (
    <svg
      className={common}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 10h4v4h-4V10zm8 0h4v4h-4V10zm-8 8h4v4h-4v-4zm8 0h4v4h-4v-4z"
        fill="currentColor"
      />
      <path
        d="M14 12h4M12 14v4M20 14v4M14 20h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChargingPlug() {
  return (
    <svg
      className={common}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 6v6M14 6v6M18 6v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 14h16v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 24v4M20 24v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDeliveryRoute() {
  return (
    <svg
      className={common}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 22h6l3-8 4 10 3-6h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="22" r="2.5" fill="currentColor" />
      <circle cx="22" cy="18" r="2.5" fill="currentColor" />
      <circle cx="28" cy="22" r="2.5" fill="currentColor" />
    </svg>
  );
}
