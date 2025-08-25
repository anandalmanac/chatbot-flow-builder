import React from "react";

function Sidebar({nodeTypes, selectedNode, setSelectedNode, setNodes, nodes}) {
  // Handle drag start: store node data in drag event
  function onDragStart(e, node) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/reactflow", JSON.stringify(node));
  }

  // Handle input change when a node is selected
  function handleChange(e) {
    // Update selected node's description
    setSelectedNode({
      ...selectedNode,
      data: {
        ...selectedNode.data,
        description: e.target.value,
      },
    });

    // Update nodes array with the new description for the selected node

    const updatedNodes = nodes.map((node) =>
      node.id === selectedNode.id
        ? {...node, data: {...node.data, description: e.target.value}}
        : node
    );

    setNodes(updatedNodes);
  }

  return (
    <div style={{width: "30%", padding: "10px", borderLeft: "1px solid gray "}}>
      {/* Show input if a node is selected */}
      {selectedNode && (
        <div>
          <button
            onClick={() => setSelectedNode(null)}
            style={{
              marginBottom: "24px",
              background: "transparent",
              padding: "4px 0px",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            &#8592;
          </button>
          <p>Text:</p>
          <input
            type="text"
            value={selectedNode.data.description}
            onChange={handleChange}
            style={{
              padding: "4px 6px",
              borderRadius: "4px",
              border: "1px solid gray",
              marginTop: "4px",
            }}
          />
        </div>
      )}

      {/* Show draggable node options if no node is selected */}
      {!selectedNode &&
        nodeTypes.map((item, i) => (
          <div
            key={i}
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, item)}
            draggable
            style={{
              padding: "20px",
              border: "1px solid #0284ff",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            <img src={item.icon} alt="" style={{width: "40px"}} />
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
