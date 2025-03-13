import React, { useState, useEffect } from "react";
import { fetchData } from "./data";

const TreeList = ({ tnode, selectedId, isExpSelected }) => {
  const [isExpand, setExpand] = useState(false);

  useEffect(() => {
    setExpand(isExpSelected || tnode.children?.some(child => child.id === selectedId));
  }, [isExpSelected, selectedId, tnode.children]);

  return (
    <li>
      {tnode?.children?.length > 0 ? (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setExpand(!isExpand)}
        >
          {isExpand ? "-" : "+"}
        </span>
      ) : (
        "."
      )}
      <span style={{ color: tnode.id === selectedId ? "blue" : "black", cursor: "pointer" }} onClick={() => setExpand(!isExpand)}>
        {tnode.name}{" "}
      </span>
      {isExpand && tnode?.children?.length > 0 && (
        <ul style={{ marginLeft: "20px" }}>
          {tnode?.children.map((childNode) => {
            return (
              <TreeList
                key={childNode.id}
                tnode={childNode}
                selectedId={selectedId}
                isExpSelected={childNode.id === selectedId}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

const TreeWidget = () => {
  const [treeData, setTreeData] = useState([]);
  const selectedId = "10";

  useEffect(() => {
    fetchData().then((response) => {
      console.log(response);
      setTreeData(response);
    });
  }, []);
  return (
    <div>
      <ul>
        {treeData.map((tnode) => {
          return (
            <TreeList
              selectedId={selectedId}
              key={tnode.id}
              tnode={tnode}
              isExpSelected={tnode.id === selectedId ||  tnode.children?.some(child => child.id === selectedId)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TreeWidget;
