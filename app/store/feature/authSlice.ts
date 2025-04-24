import { oauthUserDataInterface } from "@/lib/utility/interface/oauthUserDataInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProps {
  userData: oauthUserDataInterface;
  logOut: boolean;
}

const initialState: initialStateProps = {
  userData: {
    name: "",
    email: "",
    role: "",
  },
  logOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<oauthUserDataInterface>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData.email = "";
      state.userData.name = "";
      state.userData.role = "";
    },
  },
});

export const { setUserData, logout } = authSlice.actions;
export default authSlice.reducer;
