import {Handle, Position} from "@xyflow/react";

export default function CustomNode({data}) {
  return (
    <div
      style={{
        width: "150px",
        borderRadius: "4px",
        background: "#ffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          fontWeight: "semibold",
          backgroundColor: "#63ff88",
          padding: "2px",
        }}
      >
        {data.label}
      </p>
      <p
        style={{
          borderRadius: "4px",
          fontSize: "8px",
          fontWeight: "light",

          padding: "10px 10px",
        }}
      >
        {data.description}
      </p>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
