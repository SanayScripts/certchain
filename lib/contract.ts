export const CONTRACT_ADDRESS = "0x080d6d8b0B7A11A9CB4Dd9D1BaA0942954333cf9"; // replace after deploying

export const CONTRACT_ABI = [
  "function issue(bytes32 hash) external",
  "function verify(address issuer, bytes32 hash) external view returns (uint256)",
];