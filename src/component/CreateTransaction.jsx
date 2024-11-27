import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'; // assuming you're using web3-react or similar

const CreateTransaction = ({ signers, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isSigner, setIsSigner] = useState(false);
  
  const { account } = useWeb3React(); // Get the current user's Ethereum account

  // Check if the current user is a signer
  useEffect(() => {
    if (signers && account) {
      setIsSigner(signers.includes(account));
    }
  }, [account, signers]);

  // If not a signer, display a message
  if (!isSigner) {
    return (
      <div className="p-6 bg-stone-900 rounded-lg shadow-md">
        <p className="text-red-500 text-xl font-semibold">Only a valid signer can create transactions.</p>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(amount, receiver);
  };

  return (
    <form
      className="p-6 bg-stone-900 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-amber-500">Create Transaction</h2>
      
      <div className="mt-4">
        <label className="block text-stone-400">Amount (ETH)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mt-2 rounded bg-stone-800 text-stone-200"
          placeholder="Enter amount"
        />
      </div>

      <div className="mt-4">
        <label className="block text-stone-400">Receiver Address</label>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full p-2 mt-2 rounded bg-stone-800 text-stone-200"
          placeholder="Enter receiver address"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full p-3 rounded bg-gradient-to-r from-amber-400 to-yellow-600 text-stone-950 font-semibold"
      >
        Submit Transaction
      </button>
    </form>
  );
};

export default CreateTransaction;
