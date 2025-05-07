"use client";

import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState<number | null>(null); // 現在金額
  const [initialAmount, setInitialAmount] = useState<number | null>(null);// 初期金額
  const [interestRate, setInterestRate] = useState<number | null>(null); // 利息率
  const [year, setYear] = useState<number>(0); // 年数
  const [isModalOpen, setIsModalOpen] = useState(true); // モーダルの表示状態

  const handleIncrease = () => {
    if (amount !== null && interestRate !== null) {
      setAmount((prevAmount) => prevAmount! + prevAmount! * interestRate!);
      setYear((prevYear) => (prevYear + 1)); // 年数を1年増やす 
    }
  };

  const handleModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const initialAmount = parseFloat(formData.get("amount") as string);
    const initialRate = parseFloat(formData.get("interestRate") as string);
    setInitialAmount(initialAmount);
    setAmount(initialAmount);
    setInterestRate(initialRate);
    setIsModalOpen(false);
  };

  const initializeSettings = () => {
    setInitialAmount(null);
    setAmount(null);
    setInterestRate(null);
    setYear(0);
    setIsModalOpen(true);
  }

  if (isModalOpen) {

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">初期設定</h2>
          <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="amount" className="block text-lg font-medium">
                初期金額:
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="1"
                className="w-full rounded border-gray-300 px-4 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="interestRate" className="block text-lg font-medium">
                初期利息率 (例: 0.05 = 5%):
              </label>
              <input
                id="interestRate"
                name="interestRate"
                type="number"
                step="0.01"
                className="w-full rounded border-gray-300 px-4 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded bg-blue-500 text-white px-6 py-3 font-medium hover:bg-blue-600 transition"
            >
              設定
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold">利息シミュレーション</h1>
        <p className="text-3xl">
          現在の金額:{" "}
          <span className="font-mono font-semibold">
            ¥{amount?.toFixed(2)}
          </span>
        </p>
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="interestRate" className="text-lg font-medium">
            初期金額:{" "}
            <span className="font-mono font-semibold">
              ¥{initialAmount}
            </span>
            　利息率:{" "}
            <span className="font-mono font-semibold">
              {interestRate ? `${(interestRate * 100)}%` : "未設定"}
            </span>
            　年数:{" "}
            <span className="font-mono font-semibold">
              {year}年
            </span>
          </label>
        </div>
        <button
          className="rounded-full bg-blue-500 text-white px-6 py-3 text-lg font-medium hover:bg-blue-600 transition"
          onClick={handleIncrease}
        >
          １年経過
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-3 text-lg font-medium hover:bg-yellow-600 transition"
          onClick={initializeSettings}
        >
          設定変更
        </button>
      </main>
    </div>
  );
}