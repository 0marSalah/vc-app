import React, { useState } from 'react';
import { issueCredential } from '../utils/issueCredential';
import { decodeJwt } from '../utils/decodeJWT';
import { signCredential } from '../utils/signCredential';
import { saveCredential } from '../utils/saveCredential';
import MetaMaskAuth from './MetaMaskAuth';

const IssueCredential: React.FC = () => {
  const [credential, setCredential] = useState<string | null>(null);
  const [signedCredential, setSignedCredential] = useState<string | null>(null);
  const [decodedCredential, setDecodedCredential] = useState<any | null>(null);
  const [holderAddress, setHolderAddress] = useState<string | null>(null);

  const handleIssueCredential = async () => {
    if (holderAddress) {
      const vcJwt = await issueCredential(undefined, holderAddress);
      setCredential(vcJwt);
      const decoded = decodeJwt(vcJwt);
      setDecodedCredential(decoded);

      // Sign the credential with MetaMask
      const signature = await signCredential(vcJwt, holderAddress);
      setSignedCredential(signature);

      // Combine the data
      const combinedData = {
        credential: vcJwt,
        signature: signature,
        holder: holderAddress,
        decodedCredential: decoded,
      };

      // Save the combined data
      await saveCredential(combinedData);
    }
  };

  return (
    <div>
      <MetaMaskAuth onAddress={setHolderAddress} />
      <button
        onClick={handleIssueCredential}
        disabled={!holderAddress}
      >
        Issue Credential
      </button>
      {credential && (
        <div>
          <h2>Encoded Credential</h2>
          <pre>{credential}</pre>
        </div>
      )}
      {signedCredential && (
        <div>
          <h2>Signature</h2>
          <pre>{signedCredential}</pre>
        </div>
      )}
      {decodedCredential && (
        <div>
          <h2>Decoded Credential</h2>
          <pre>{JSON.stringify(decodedCredential, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IssueCredential;
