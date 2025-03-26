import React from "react";
import { useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";

const UserList = ({ onSelect }) => {
  const users = useSelector((state) => state.users);

  return (
    <List
      height={600}
      itemCount={users.length}
      itemSize={50}
      width={300}
      className="border-r overflow-auto"
    >
      {({ index, style }) => (
        <div
          style={style}
          className="p-2 border-b cursor-pointer hover:bg-gray-200"
          onClick={() => onSelect(users[index])}
        >
          {users[index].name} {users[index].lastName}
        </div>
      )}
    </List>
  );
};

export default UserList;
