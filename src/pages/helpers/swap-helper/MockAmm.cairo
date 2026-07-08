// Adapted from starknet-privacy packages/privacy/src/test_contracts/mock_amm.cairo
// (Apache-2.0, StarkWare). Test-only entry points removed.
use starknet::ContractAddress;

/// Interface for the mock AMM.
#[starknet::interface]
pub trait IMockAMM<T> {
    fn swap(ref self: T, in_token: ContractAddress, out_token: ContractAddress, amount: u256);
}

/// Mock AMM contract used to demo the swap helper.
/// Implements a simple 1:1 swap.
#[starknet::contract]
pub mod MockAMM {
    use openzeppelin::interfaces::token::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use super::IMockAMM;

    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl MockAMMImpl of IMockAMM<ContractState> {
        fn swap(
            ref self: ContractState,
            in_token: ContractAddress,
            out_token: ContractAddress,
            amount: u256,
        ) {
            let caller = get_caller_address();

            // Transfer input tokens from caller.
            IERC20Dispatcher { contract_address: in_token }
                .transfer_from(sender: caller, recipient: get_contract_address(), :amount);

            // Transfer output tokens (1:1 exchange).
            IERC20Dispatcher { contract_address: out_token }.transfer(recipient: caller, :amount);
        }
    }
}
