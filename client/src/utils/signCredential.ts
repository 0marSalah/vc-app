export const signCredential = async (
  vcJwt: string,
  holderAddress: string
): Promise<string> => {
  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [holderAddress, vcJwt],
  });
  return signature;
};
