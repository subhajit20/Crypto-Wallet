import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet,HDNodeWallet } from "ethers";

interface UserInterface {
  wallet: HDNodeWallet | null,
  password: string
}

interface PayloadPasswordInterface {
  password: string
}

interface PayloadUserInterface {
  wallet: HDNodeWallet | null,
}

let userState: UserInterface = {
  wallet: null,
  password: ''
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    createAccount:(state,action: PayloadAction<PayloadUserInterface>) =>{
      state.wallet = action.payload.wallet;
    },
    setPassword:(state,action: PayloadAction<PayloadPasswordInterface>) =>{
      state.password = action.payload.password;
    },

  },
});

export const { createAccount, setPassword } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer;
export default userSlice.reducer;