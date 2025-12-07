"use client";

import { useState } from "react";
import {
  useCurrentAccount,
  useIotaClient,
  useSignAndExecuteTransaction,
} from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { PACKAGE_ID, MODULE_NAME, CONTRACT_METHODS } from "@/lib/config";

export function useLuckyNumber() {
  const account = useCurrentAccount();
  const iotaClient = useIotaClient(); // không truyền tham số
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(null);

  const guessNumber = async (
  guess: number
): Promise<"correct" | "wrong" | null> => {
  if (!account) {
    setError(new Error("Chưa kết nối ví"));
    return null;
  }

  setIsLoading(true);
  setError(null);
  setLastResult(null);

  try {
    const tx = new Transaction();

    // Gọi entry fun lucky_number::lucky_number::guess_number(guess: u8, ctx)
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::${CONTRACT_METHODS.GUESS}`,
      arguments: [tx.pure.u8(guess as number)],
    });

    // ký + gửi tx
    const res = await signAndExecute({
      transaction: tx as never,
    });

    const digest = res?.digest;
    if (!digest) {
      throw new Error("Không lấy được transaction digest");
    }

    setTxHash(digest);

    // chờ tx confirm + lấy effects
    const effectsResult = await iotaClient.waitForTransaction({
      digest,
      options: { showEffects: true },
    });

    const created = effectsResult.effects?.created ?? [];

    // Lấy tất cả objectId được tạo
    const createdIds: string[] = created
      .map((c: any) => c.reference?.objectId as string | undefined)
      .filter((id: string | undefined): id is string => !!id);

    let hasFlag = false;

    // Với mỗi objectId, gọi getObject để lấy type
    for (const id of createdIds) {
      const obj = await iotaClient.getObject({
        id,
        options: { showType: true },
      });

      const type = obj.data?.type;
      if (typeof type === "string" && type.includes("::Flag")) {
        hasFlag = true;
        break;
      }
    }

    const resultStatus: "correct" | "wrong" = hasFlag ? "correct" : "wrong";
    setLastResult(resultStatus);
    setIsLoading(false);
    return resultStatus;
  } catch (e: any) {
    const err = e instanceof Error ? e : new Error(String(e));
    setError(err);
    setIsLoading(false);
    return null;
  }
};


  return {
    account,
    isLoading,
    txHash,
    error,
    lastResult,
    guessNumber,
  };
}
