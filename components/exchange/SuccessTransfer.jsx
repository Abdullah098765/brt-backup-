import { useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { receiveTokens } from "../../utils/sendBRGTokens";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function convertToMatic(inputValue) {
  const conversionRate = 0.68;
  const maticAmount = inputValue / conversionRate;
  return maticAmount;
}
function convertToBrg(inputValue) {
  const conversionRate = 0.3;
  const maticAmount = inputValue / conversionRate;
  return maticAmount;
}
export default function StripeSuccessTransfer({ coin, amount }) {
  const router = useRouter();
  const address = useAddress();

  const sendTransaction = async () => {
    const { ethers } = await import("ethers");
    const senderPrivateKey = process.env.POLYGON_MOSES_PRIVATE_KEY;
    const recipientAddress = address;
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.TOKEN_PROVIDER
    );
    const senderWallet = new ethers.Wallet(senderPrivateKey, provider);
    const amountToSend = ethers.utils.parseUnits(
      convertToMatic(amount).toString(),
      "ether"
    ); // Convert to wei
    const transaction = {
      to: recipientAddress,
      value: amountToSend,
    };
    try {
      const txResponse = await senderWallet.sendTransaction(transaction);
      console.log("Transaction Hash:", txResponse.hash);
      Swal.fire({
        icon: "success",
        text: "transfer success",
        timer: 4000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 4000,
      });
      console.error("Error sending transaction:", error);
    }
  };

  const handleMaticTransfer = async () => {
    await sendTransaction();
  };

  const handleBrgTransfer = async () => {
    try {
      const response = await receiveTokens({
        senderAccount: process.env.MOSES_ACCOUNT,
        tokenAmount: convertToBrg(amount).toString(),
        receiver: address,
      });
      if (response.success) {
        Swal.fire({
          icon: "success",
          text: "Successfully transfered amount",
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Opps, something wrong " + response?.message,
          timer: 3000,
        });
      }
      console.log("SEND tokens", response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Opps, something wrong " + error?.message,
        timer: 3000,
      });
    }
  };
  useEffect(() => {
    if (coin === "BRG") {
      handleBrgTransfer();
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    }
    if (coin === "MATIC") {
      handleMaticTransfer();
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      Thanks you coins will deliver to your account.
    </div>
  );
}
