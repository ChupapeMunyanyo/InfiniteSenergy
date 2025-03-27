import { createSlice, configureStore } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const generateUsers = (num) =>
  Array.from({ length: num }, (_, id) => ({
    id,
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 65 }),
    email: faker.internet.email(),
  }));


const usersSlice = createSlice({
  name: "users",
  initialState: generateUsers(1000000),
  reducers: {
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex((user) => user.id === id);
      if (index !== -1) state[index] = { ...state[index], ...data };
    },
  },
});

export const { updateUser } = usersSlice.actions;
export const store = configureStore({ reducer: { users: usersSlice.reducer } });
