import { create } from "zustand";

const useNodeStore = create((set,get) => ({
  nodes: [],
  edges:[],


  addNode: (node) =>
    set((state)=>    
    ( { nodes: [ ...state.nodes,node]})
    ),

    addEdges:(edge)=>set((state)=>    {

    
        return  { edges: [ ...state.edges,edge]}

    }
    
    ),

    setEdges:(newEdge)=>set({edges:newEdge}),
    
setNodes:(newNodes)=>set({nodes:newNodes}),
// Function to check if all nodes are connected

  areAllNodesConnected: () => {
    const { nodes, edges } = get();

    if (nodes.length === 0) return true; // No nodes = considered connected

    const connectedNodeIds = new Set();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    return nodes.every((node) => connectedNodeIds.has(node.id));
  },
}));



export default useNodeStore;
