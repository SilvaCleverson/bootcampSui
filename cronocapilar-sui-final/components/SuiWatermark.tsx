"use client";

export default function SuiWatermark() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        opacity: 0.12,
        zIndex: -1,
        pointerEvents: "none",
        transition: "opacity 0.3s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.25";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.12";
      }}
    >
      <img 
        src="/LogoSui.jpg" 
        alt="Sui Logo" 
        style={{ 
          width: 100, 
          height: 100, 
          objectFit: "contain",
          filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))"
        }}
      />
    </div>
  );
}

