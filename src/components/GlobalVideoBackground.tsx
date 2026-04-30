const GlobalVideoBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
        }}
        src="/global-bg.mp4"
      />
      {/* Dark overlay for readability across all sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "hsl(0 0% 0% / 0.2)",
        }}
      />
      {/* Vignette for extra depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.45) 100%)",
        }}
      />
    </div>
  );
};

export default GlobalVideoBackground;
