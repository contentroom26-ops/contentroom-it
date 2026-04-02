import corridorBg from "@/assets/corridor-room.jpg";

/**
 * Full-screen fixed corridor background replacing the CSS 3D room.
 */
export default function ImmersiveRoom() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <img
        src={corridorBg}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.85)" }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.6) 100%)",
        }}
      />
    </div>
  );
}
