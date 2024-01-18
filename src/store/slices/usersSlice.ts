import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayloadShowModal, UsersResponse, UsersState } from "../types";
import { apiEndpoints, createUrl } from "@/utils/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    const createdUrl = createUrl(apiEndpoints.users);

    const response = await fetch(createdUrl);
    if (!response.ok) {
      return rejectWithValue(`Fetch error, status ${response.status}`);
    }
    const users = await response.json();
    return users;
  }
);

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (searchQuery: string, { rejectWithValue }) => {
    const createdUrl = createUrl(apiEndpoints.users, searchQuery);
    const response = await fetch(createdUrl);
    if (!response.ok) {
      return rejectWithValue(`Search error, status ${response.status}`);
    }
    const searchedUsers = await response.json();
    return searchedUsers;
  }
);

const initialState: UsersState = {
  users: [],
  errors: {
    fetchUsersErr: null,
    searchUsersErr: null,
  },
  isLoadings: {
    isFetchUsersLoading: false,
    isSearchUsersLoading: false,
  },
  searchQuery: "",
  modals: {
    isShowUserModal: false,
    activeUserId: null,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    setShowUserModal: (state, { payload }: PayloadAction<PayloadShowModal>) => {
      const { id } = payload;
      state.modals.activeUserId = id;
      state.modals.isShowUserModal = true;
    },
    setCloseUserModal: (state) => {
      state.modals.isShowUserModal = false;
      state.modals.activeUserId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.errors.fetchUsersErr = null;
        state.isLoadings.isFetchUsersLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errors.searchUsersErr = action.payload as string;
        state.isLoadings.isFetchUsersLoading = false;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<UsersResponse>) => {
          const { users } = payload;
          state.users = users;
          state.errors.fetchUsersErr = null;
          state.isLoadings.isFetchUsersLoading = false;
        }
      )

      .addCase(searchUsers.pending, (state) => {
        state.errors.searchUsersErr = null;
        state.isLoadings.isSearchUsersLoading = true;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.errors.searchUsersErr = action.payload as string;
        state.isLoadings.isSearchUsersLoading = false;
      })
      .addCase(
        searchUsers.fulfilled,
        (state, { payload }: PayloadAction<UsersResponse>) => {
          const { users } = payload;
          state.users = users;
          state.errors.searchUsersErr = null;
          state.isLoadings.isSearchUsersLoading = false;
        }
      );
  },
});

export const { setSearchQuery, setShowUserModal, setCloseUserModal } =
  usersSlice.actions;
export default usersSlice.reducer;
