import React from 'react';
import { message } from 'antd';
import { Wallet,EtherscanProvider, HDNodeWallet } from 'ethers';
import Error from 'next/error';

type Props = {
    toAddress: string,
    provider:EtherscanProvider,
    wei: string,
}

class WalletError extends Error{
    errormsg:'';
    constructor(message: string){
        super(message);
        this.errormsg = message;
        this.name = "ValidationError";
    }
}

const TransactionMessage = (props: Props) => {
    const { toAddress, provider, wei } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const sendEther = async () => {
        console.log("Sending")
        try{
            console.log("Checking account")
            const acc = localStorage.getItem('acc');
            if(acc && toAddress !== ''){
                if(JSON.parse(acc).address === toAddress){
                    throw new WalletError("From and To address should not be same!")
                }
                messageApi.open({
                    key,
                    type: 'loading',
                    content: 'Loading...',
                });
                const account:HDNodeWallet = JSON.parse(acc);
                console.log(account)
                const privateKey = Wallet.fromPhrase(account.mnemonic?.phrase!)
                const wallet = new Wallet(
                    privateKey.privateKey,
                    provider
                )
                const tx = {
                    to: toAddress!,
                    value: wei,
                };
                console.log("Creating tx")
                const txRes = await wallet.sendTransaction(tx);

                console.log("Sent")
                console.log(txRes);
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Sent',
                });
            }else{
                throw new WalletError("Fill all the required values");
            }
        }catch(e){
            if(e instanceof WalletError){
                messageApi.open({
                    type: 'error',
                    content: e.errormsg,
                });
            }
        }
  };

  return (
    <>
      {contextHolder}
      <label htmlFor="modal-3" className="btn-primary btn w-full" onClick={sendEther}>
        SEND
      </label>
    </>
  );
};

export default TransactionMessage;