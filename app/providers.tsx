"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IotaClientProvider, WalletProvider } from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";

const queryClient = new QueryClient();

// Định nghĩa các network mà dapp sẽ dùng
const networks = {
  devnet: { url: getFullnodeUrl("devnet") },
  // nếu sau này cần thêm testnet/mainnet thì add vào đây
};

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>{children}</WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
}
