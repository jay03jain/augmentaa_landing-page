/** Soft wave between sections — amplitude ~48px on a 1200×80 viewBox. */
export function WaveDivider({
  fill,
  className = "",
  flip = false,
}: {
  fill: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`relative w-full leading-none ${className}`}
      aria-hidden
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <svg
        className="block h-12 w-full sm:h-14 md:h-16"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={fill}
          d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 L1200,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
