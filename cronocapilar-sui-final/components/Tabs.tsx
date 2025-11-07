"use client";
import { useState, ReactNode, useEffect } from "react";
import React from "react";

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  // Atualizar quando defaultTab mudar
  React.useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  return (
    <div>
      {/* Tab Headers */}
      <div
        style={{
          display: "flex",
          gap: 8,
          background: "linear-gradient(135deg, #ffffff 0%, #fdf4f7 100%)",
          borderRadius: 20,
          padding: 8,
          marginBottom: 24,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (onTabChange) onTabChange(tab.id);
            }}
            style={{
              minWidth: "68px",
              padding: "12px 8px",
              border: "none",
              background: activeTab === tab.id ? "linear-gradient(135deg, #667eea 0%, #ff6b9d 100%)" : "transparent",
              borderRadius: 14,
              color: activeTab === tab.id ? "#fff" : "#667eea",
              fontWeight: activeTab === tab.id ? "600" : "500",
              fontSize: 10,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              flexShrink: 0,
              boxShadow: activeTab === tab.id ? "0 8px 24px rgba(102, 126, 234, 0.4)" : "none",
              transform: activeTab === tab.id ? "scale(1.05)" : "scale(1)",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 2, filter: activeTab === tab.id ? "drop-shadow(0 2px 4px rgba(255,255,255,0.3))" : "none" }}>{tab.icon}</div>
            <div>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}

