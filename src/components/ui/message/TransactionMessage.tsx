import React from 'react';
import { message } from 'antd';
import { Wallet,EtherscanProvider, HDNodeWallet } from 'ethers';

type Props = {
    toAddress: string,
    provider:EtherscanProvider,
    wei: string,
}

const TransactionMessage = (props: Props) => {
    const { toAddress, provider, wei } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const sendEther = async () => {
        console.log("Sending")
        try{
            messageApi.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
            console.log("Checking account")
            const acc = localStorage.getItem('acc');
            if(acc && toAddress !== ''){
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
                throw new Error("Fill all the required values");
            }
        }catch(e){
            messageApi.open({
                type: 'error',
                content: 'Something went wrong! Please try again later',
            });
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