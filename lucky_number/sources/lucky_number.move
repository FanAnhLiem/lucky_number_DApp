module lucky_number::lucky_number {
    use iota::object;
    use iota::tx_context;
    use iota::transfer;

    /// Cờ thưởng nếu đoán đúng
    public struct Flag has key, store {
        id: object::UID,
        owner: address,
    }

    /// Lưu lại kết quả lần đoán gần nhất
    public struct GuessRecord has key, store {
        id: object::UID,
        player: address,
        guess: u8,
        correct: bool,
    }

    /// entry function: người chơi đoán 1 số 0..9
    public entry fun guess_number(guess: u8, ctx: &mut tx_context::TxContext) {
        let sender = tx_context::sender(ctx);

        // Giới hạn input 0..9 (nếu không thỏa thì cho về 0)
        let safe_guess = if (guess > 9) { 0 } else { guess };

        // Số bí mật (hard-code tạm)
        let secret: u8 = 7;
        let is_correct = safe_guess == secret;

        // Tạo 1 object GuessRecord để lưu lịch sử đoán
        let record = GuessRecord {
            id: object::new(ctx),
            player: sender,
            guess: safe_guess,
            correct: is_correct,
        };
        // cần key + store -> đã thêm ở trên
        transfer::public_transfer(record, sender);

        // Nếu đoán đúng thì tặng Flag
        if (is_correct) {
            let flag = Flag {
                id: object::new(ctx),
                owner: sender,
            };
            transfer::public_transfer(flag, sender);
        };
    }
}
