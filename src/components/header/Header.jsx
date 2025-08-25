import React from "react";
import useNodeStore from "../../store/nodeStore";

function Header() {
  const {areAllNodesConnected} = useNodeStore();
  function handleSave() {
    if (areAllNodesConnected()) {
      alert("All nodes are connected");
    } else {
      alert("Some nodes are not connected");
    }
  }
  return (
    <div
      style={{
        backgroundColor: "#e8e8e8",
        padding: "8px 18px",
        position: "fixed",
        width: "100%",
        zIndex: 9999,
        display: "flex",
      }}
    >
      <button
        style={{
          outline: "none",
          border: "1px solid #2968fa",
          background: "#ffff",
          padding: "4px 10px",
          borderRadius: "4px",
          color: "#2767fd",
          marginLeft: "auto",
        }}
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
}

export default Header;
