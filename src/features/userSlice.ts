import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionResponse } from "ethers";
import { Wallet,HDNodeWallet } from "ethers";

interface UserInterface {
  wallet: HDNodeWallet | null,
  password: string,
  transaction: TransactionResponse | null
}

interface PayloadPasswordInterface {
  password: string
}

interface PayloadTransactionInterface {
  trs: TransactionResponse
}

interface PayloadUserInterface {
  wallet: HDNodeWallet | null,
}

let userState: UserInterface = {
  wallet: null,
  password: '',
  transaction: null
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
    getTransaction:(state,action:PayloadAction<PayloadTransactionInterface>)=>{
      state.transaction = action.payload.trs;
    }

  },
});

export const { createAccount, setPassword, getTransaction } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer;
export default userSlice.reducer;