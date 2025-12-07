# Screenshot
<img width="1913" height="870" alt="Screenshot 2025-12-07 134956" src="https://github.com/user-attachments/assets/57c865af-2028-4066-8dad-6bd61ce63d78" />

# Explorer Link & Contract Address

**Network:** devnet

**Package ID:** 0x88d8a928851e18105de9ecd88bb3f5ca560ed6b4798fd2220c8ecbce75e96573

**Explorer:** https://explorer.iota.org/object/0x88d8a928851e18105de9ecd88bb3f5ca560ed6b4798fd2220c8ecbce75e96573?network=devnet



# 🎲 Lucky Number DApp (IOTA + Move + Next.js)

This is a simple on-chain game built on **IOTA devnet** where users guess a lucky number.  
If the guess is correct, the smart contract will mint a **Flag NFT** as a reward.

The project consists of:

- A **Move smart contract** deployed on IOTA
- A **Next.js frontend dApp** using `@iota/dapp-kit`

---

## 🚀 Features

- Connect wallet using IOTA Wallet
- Guess a number from **0 to 9**
- Submit guess on-chain
- Smart contract checks the result
- If correct → mint and transfer a **Flag NFT**
- Display transaction hash and result on UI

---

## 🛠 Tech Stack

- **Blockchain:** IOTA Devnet
- **Smart Contract:** Move (IOTA Move)
- **Frontend:** Next.js (App Router)
- **Wallet & SDK:** `@iota/dapp-kit`, `@iota/iota-sdk`
- **UI:** Radix UI
- **State & Data:** React Hooks, React Query

---

## 📁 Project Structure

```txt
lucky-number-dapp/
  app/
    layout.tsx
    page.tsx
    providers.tsx
    globals.css
  hooks/
    useLuckyNumber.ts
  lib/
    config.ts
  package.json

lucky_number/            # Move contract
  Move.toml
  sources/
    lucky_number.move
```
