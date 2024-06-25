import { jwtDecode } from 'jwt-decode';

interface VerifiableCredential {
  vc: {
    '@context': string[];
    type: string[];
    credentialSubject: {
      id: string;
      degree: {
        type: string;
        name: string;
      };
    };
  };
  sub: string;
  nbf: number;
  iss: string;
}

export const decodeJwt = (token: string): VerifiableCredential => {
  return jwtDecode<VerifiableCredential>(token);
};
