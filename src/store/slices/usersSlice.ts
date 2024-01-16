import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchUsersParams, UsersResponse, UsersState } from "../types";
import { apiEndpoints, createUrl } from "@/utils/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params?: FetchUsersParams) => {
    const createdUrl = createUrl(apiEndpoints.users, params?.searchQuery);

    const response = await fetch(createdUrl);
    if (!response.ok) {
      console.log(`error, status ${response.status}`);
      // const message = `An error has occured: ${response.status}`;
      // throw new Error(message);
    }
    const users = await response.json();
    return users;
  }
);

const initialState: UsersState = {
  users: [],
  errors: {
    fetchUsersErr: null,
  },
  isLoadings: {
    fetchUsersLoading: false,
  },
  searchQuery: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.errors.fetchUsersErr = null;
        state.isLoadings.fetchUsersLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const payload = action.payload as Error;
        state.errors.fetchUsersErr = payload.message;
        state.isLoadings.fetchUsersLoading = false;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<UsersResponse>) => {
          const { users } = payload;
          state.users = users;
          state.errors.fetchUsersErr = null;
          state.isLoadings.fetchUsersLoading = false;
        }
      );
  },
});

export const { setSearchQuery } = usersSlice.actions;
export default usersSlice.reducer;
