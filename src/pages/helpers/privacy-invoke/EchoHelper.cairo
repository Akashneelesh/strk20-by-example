// Adapted from starknet-privacy packages/privacy/src/tests/mock_invoke_returns.cairo
// (Apache-2.0, StarkWare). The smallest possible helper contract: it echoes the
// deposit instructions it is given back to the privacy pool.
use privacy::objects::OpenNoteDeposit;

#[starknet::interface]
pub trait IEchoHelper<T> {
    /// The entry point every helper contract must expose.
    /// The privacy pool calls it via the `INVOKE_SELECTOR` during `InvokeExternal`.
    /// Calldata after the selector is deserialized into this function's parameters;
    /// the return value tells the pool which open notes to credit.
    fn privacy_invoke(ref self: T, deposits: Span<OpenNoteDeposit>) -> Span<OpenNoteDeposit>;
}

#[starknet::contract]
pub mod EchoHelper {
    use privacy::objects::OpenNoteDeposit;
    use super::IEchoHelper;

    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    pub impl EchoHelperImpl of IEchoHelper<ContractState> {
        fn privacy_invoke(
            ref self: ContractState, deposits: Span<OpenNoteDeposit>,
        ) -> Span<OpenNoteDeposit> {
            deposits
        }
    }
}
