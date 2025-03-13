import React, { useState, useEffect, useCallback } from "react";
import { fetchData } from "./data";

const TreeList = ({
  tnode,
  selectedId,
  setSelectedId,
  expandedId,
  onExpand,
  parentExpand,
}) => {
  const isExpand = expandedId === tnode.id || parentExpand;
  const isLeafNode = !tnode.children || tnode.children?.length === 0;

  const handleToggle = () => {
    setSelectedId(tnode.id);

    if (!isLeafNode) {
      onExpand(isExpand ? null : tnode.id);
    }
  };

  return (
    <li
      style={{ listStyleType: "none", paddingLeft: "10px", cursor: "pointer" }}
      onClick={handleToggle}
    >
      {tnode?.children?.length > 0 ? (
        <span
          style={{
            marginRight: "5px",
            fontSize: "14px",
            display: "inline-block",
            width: "16px",
            textAlign: "center",
          }}
        >
          {isExpand ? "▼" : "▶"}
        </span>
      ) : (
        <span style={{ marginRight: "10px" }}>•</span>
      )}
      <span
        style={{
          color: selectedId === tnode.id ? "blue" : "black",
          fontWeight: selectedId === tnode.id ? "bold" : "normal",
          textDecoration: selectedId === tnode.id ? "underline" : "none",
        }}
      >
        {tnode.name}
      </span>

      {isExpand && tnode?.children?.length > 0 && (
        <ul
          style={{
            paddingLeft: "10px",
          }}
        >
          {tnode?.children.map((childNode) => (
            <TreeList
              key={childNode.id}
              tnode={childNode}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              expandedId={expandedId}
              onExpand={onExpand}
              parentExpand={isExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const EnhancedTreeWidget = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // ✅ Now dynamic
  const [expandedId, setExpandedId] = useState(null); // ✅ Only one node expands

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await fetchData(); // ✅ Await the API call
        console.log(response);
        setTreeData(response);
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    fetchTreeData(); // ✅ Call the async function
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #000",
        width: "300px",
      }}
    >
      <h3>📂 Tree View</h3>
      <ul style={{ paddingLeft: "10px" }}>
        {treeData.map((tnode) => (
          <TreeList
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            key={tnode.id}
            tnode={tnode}
            expandedId={expandedId}
            onExpand={setExpandedId}
            parentExpand={false}
          />
        ))}
      </ul>
    </div>
  );
};

export default EnhancedTreeWidget;
