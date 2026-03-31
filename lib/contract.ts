export const CONTRACT_ADDRESS = "0x97131c8457F434b06300a646F145Eb09A248cfe0"; // replace after deploying

export const CONTRACT_ABI = [
  "function issue(bytes32 hash) external",
  "function verify(address issuer, bytes32 hash) external view returns (uint256)",
];