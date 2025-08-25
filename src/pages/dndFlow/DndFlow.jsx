import React, {useCallback, useState} from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import Sidebar from "../../components/sidebar/Sidebar";
import CustomNode from "../../components/customNode/customNode";
import useNodeStore from "../../store/nodeStore";

function DndFlow() {
  // Get nodes, edges and methods from Zustand store
  const {nodes, setNodes, addNode, edges, addEdges, setEdges} = useNodeStore();

  // Get helper function to convert screen position to flow position
  const {screenToFlowPosition} = useReactFlow();

  // State to keep track of selected node
  const [selectedNode, setSelectedNode] = useState();

  // Available node types for the sidebar
  const nodeTypes = [
    {
      description: "Message",
      type: "",
      icon: "https://cdn-icons-png.flaticon.com/512/5356/5356190.png",
    },
  ];

  // Counter for generating unique IDs
  let id = 0;

  // Handles node changes (drag, position, delete)
  const onNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes)),
    [nodes]
  );

  // Handles edge changes (delete, update)
  const onEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edges)),
    []
  );

  // Handles connecting two nodes with an edge
  const onConnect = useCallback((connection) => {
    const newEdge = {
      ...connection,
      id: `edge-${connection.source}-${connection.target}`,
    };
    addEdges(newEdge);
  }, []);

  // Called when drag starts from sidebar
  const onDragStart = (event, nodeType) => {
    setType(nodeType); // This function is missing in your code
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Allow dropping on canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop event on the ReactFlow canvas
  const onDrop = useCallback((event) => {
    event.preventDefault();

    // Convert mouse position to flow position
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Get node type data from drag event
    const nodeType = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );

    // Create a new node object
    const node = {
      id: getId(),
      position: position,
      data: {label: "Send Message", description: nodeType.description + id},
      type: "custom",
    };

    // Add the new node to the state
    addNode(node);

    console.log("nodes after adding:", nodes);
  }, []);

  // Function to generate unique IDs
  function getId() {
    return `dnd_id${id++}`;
  }

  // Track selected nodes and edges
  const onSelectionChange = (event, node) => {
    console.log("Clicked node:", node);
    setSelectedNode(node);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        boxSizing: "border-box",
        paddingTop: "40px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onNodeClick={onSelectionChange}
        nodeTypes={{custom: CustomNode}}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <Sidebar
        nodeTypes={nodeTypes}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        setNodes={setNodes}
        nodes={nodes}
      />
    </div>
  );
}

export default DndFlow;
