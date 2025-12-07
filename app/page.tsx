"use client";

import { Container, Heading, Text, TextField, Button } from "@radix-ui/themes";
import { ConnectButton } from "@iota/dapp-kit";
import { useState } from "react";
import { useLuckyNumber } from "@/hooks/useLuckyNumber";

export default function HomePage() {
  const [guess, setGuess] = useState("0");
  const { account, isLoading, txHash, error, lastResult, guessNumber } =
    useLuckyNumber();

  const handlePlay = async () => {
    const n = parseInt(guess);
    if (Number.isNaN(n)) return;
    if (n < 0 || n > 9) return;
    await guessNumber(n);
  };

  return (
    <main>
      <Container
        style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 0" }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Heading size="6">🎲 Lucky Number dApp</Heading>
          <ConnectButton />
        </header>

        {!account && (
          <Text style={{ marginBottom: "1rem" }}>
            Hãy kết nối ví IOTA để bắt đầu chơi.
          </Text>
        )}

        {account && (
          <>
            <Text
              style={{
                marginBottom: "1rem",
                display: "block",
                fontFamily: "monospace",
              }}
            >
              Ví: {account.address}
            </Text>

            <div
              style={{
                padding: "1.5rem",
                background: "var(--gray-a3)",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <Heading size="4" style={{ marginBottom: "1rem" }}>
                Đoán số may mắn (0–9)
              </Heading>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <TextField.Root
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  type="number"
                  min="0"
                  max="9"
                  style={{ maxWidth: "120px" }}
                  disabled={isLoading}
                />
                <Button size="3" onClick={handlePlay} disabled={isLoading}>
                  {isLoading ? "Đang gửi..." : "Gửi dự đoán"}
                </Button>
              </div>

              {lastResult === "correct" && (
                <Text style={{ color: "var(--green-11)" }}>
                  🎉 Đoán đúng rồi! Bạn đã nhận được 1 Flag.
                </Text>
              )}
              {lastResult === "wrong" && (
                <Text style={{ color: "var(--red-11)" }}>
                  😢 Bạn đoán chưa đúng, thử lại số khác nhé!
                </Text>
              )}
            </div>

            {txHash && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "var(--blue-a3)",
                  borderRadius: "8px",
                }}
              >
                <Text
                  size="2"
                  style={{
                    color: "var(--blue-11)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  ✅ Transaction confirmed
                </Text>
                <Text
                  size="1"
                  style={{
                    color: "var(--blue-11)",
                    display: "block",
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                  }}
                >
                  Tx Hash: {txHash}
                </Text>
              </div>
            )}

            {error && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "var(--red-a3)",
                  borderRadius: "8px",
                }}
              >
                <Text style={{ color: "var(--red-11)" }}>
                  Error: {error.message}
                </Text>
              </div>
            )}
          </>
        )}
      </Container>
    </main>
  );
}
