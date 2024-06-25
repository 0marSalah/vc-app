import { EthrDID } from 'ethr-did';
import { createVerifiableCredentialJwt, Issuer } from 'did-jwt-vc';
import { ethers } from 'ethers';
import { ISSUER_ADDRESS, PRIVATE_KEY } from '../config';

export const issueCredential = async (
  issuerAddress: string = ISSUER_ADDRESS || '',
  holderAddress: string,
  privateKey: string = PRIVATE_KEY || ''
): Promise<string> => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();

  const ethrDid = new EthrDID({
    identifier: issuerAddress,
    privateKey: privateKey,
    provider: provider,
  });

  const vcPayload = {
    sub: holderAddress,
    nbf: Math.floor(Date.now() / 1000),
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        id: holderAddress,
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
      },
    },
  };

  const vcJwt = await createVerifiableCredentialJwt(
    vcPayload,
    ethrDid as unknown as Issuer
  );
  return vcJwt;
};
