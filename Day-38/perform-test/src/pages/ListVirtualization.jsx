import React from "react";
import { FixedSizeList as List } from "react-window";

const ListVirtualization = () => {
  const items = Array.from({ length: 1000 }, (_, index) => `item ${index + 1}`);
  return (
    <>
      <h1>List Virtualization</h1>
      <List height={300} itemCount={items.length} itemSize={20} width="100%">
        {({ index, style }) => <li style={style}>{items[index]}</li>}
      </List>
    </>
  );
};

export default ListVirtualization;
