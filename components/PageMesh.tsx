export function PageMesh() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 animate-mesh-shift"
      aria-hidden
      style={{
        backgroundImage:
          "radial-gradient(circle, #00C9A7 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "0 0",
        opacity: 0.04,
      }}
    />
  );
}
