import React, { useState, useEffect } from 'react';

interface MetaMaskAuthProps {
  onAddress: (address: string) => void;
}

const MetaMaskAuth: React.FC<MetaMaskAuthProps> = ({ onAddress }) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const detectProvider = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const address = accounts[0];
          setAddress(address);
          onAddress(address);
        } catch (error) {
          console.error('User rejected the request');
        }
      } else {
        console.error('MetaMask not found');
      }
    };
    detectProvider();
  }, [onAddress]);

  return (
    <div>
      {address ? (
        <p>Connected as: {address}</p>
      ) : (
        <p>Connecting to MetaMask...</p>
      )}
    </div>
  );
};

export default MetaMaskAuth;
