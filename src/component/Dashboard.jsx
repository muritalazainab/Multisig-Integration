const Dashboard = ({ balance, txCount, quorum }) => {
    return (
      <div className="p-6 bg-stone-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-amber-500">Dashboard</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-stone-800 rounded-lg text-center">
            <h3 className="text-lg text-stone-400">Contract Balance</h3>
            <p className="text-3xl font-semibold text-green-400">{balance} ETH</p>
          </div>
          <div className="p-4 bg-stone-800 rounded-lg text-center">
            <h3 className="text-lg text-stone-400">Transactions</h3>
            <p className="text-3xl font-semibold text-blue-400">{txCount}</p>
          </div>
          <div className="p-4 bg-stone-800 rounded-lg text-center">
            <h3 className="text-lg text-stone-400">Quorum</h3>
            <p className="text-3xl font-semibold text-yellow-400">{quorum}</p>
          </div>
        </div>
      </div>
    );
  };
  