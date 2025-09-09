import React, { useState } from "react";

const WalletPage = () => {
  const [balance, setBalance] = useState(1000); // starting mock balance
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Deposit",
      amount: 500,
      status: "Completed",
      date: new Date().toLocaleString(),
    },
  ]);

  const [amount, setAmount] = useState("");

  // Helper to add transaction
  const addTransaction = (type: string, amt: number) => {
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        type,
        amount: amt,
        status: "Completed",
        date: new Date().toLocaleString(),
      },
    ]);
  };

  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (amt > 0) {
      setBalance(balance + amt);
      addTransaction("Deposit", amt);
      setAmount("");
    }
  };

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (amt > 0 && amt <= balance) {
      setBalance(balance - amt);
      addTransaction("Withdraw", amt);
      setAmount("");
    } else {
      alert("Insufficient funds!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>

      {/* Current Balance */}
      <div className="bg-primary text-white p-4 rounded-lg mb-6 w-[250px] text-center">
        <h2 className="text-lg font-semibold">Current Balance</h2>
        <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex gap-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleDeposit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdraw}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Withdraw
        </button>
      </div>

      {/* Transaction History */}
      <h2 className="text-lg font-bold mb-2">Transaction History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="text-center">
              <td className="border p-2">{txn.id}</td>
              <td className="border p-2">{txn.type}</td>
              <td className="border p-2">${txn.amount}</td>
              <td className="border p-2">{txn.status}</td>
              <td className="border p-2">{txn.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletPage;