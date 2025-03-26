import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/usersSlice";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-50">
        <UserList onSelect={setSelectedUser} />
        <UserDetails user={selectedUser} />
      </div>
    </Provider>
  );
};

export default App;
