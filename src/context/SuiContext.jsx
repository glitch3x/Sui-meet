import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getJsonRpcFullnodeUrl, SuiJsonRpcClient } from '@mysten/sui/jsonRpc';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

const SuiContext = createContext(null);

export const PACKAGE_ID = "0x2f641e62adaa6470fc11896b5842492f53fd50c59778a175e7d44648ecbdae0b";

// Initialize a client to testnet
const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl('testnet'), network: 'testnet' });

export const SuiProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [keypair, setKeypair] = useState(null);
  const [sessionNft, setSessionNft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const initialized = useRef(false);

  const initializeInvisibleWallet = async () => {
    if (initialized.current) return;
    initialized.current = true;
    setIsLoading(true);
    try {
      // 1. Generate an Ephemeral Keypair
      const kp = new Ed25519Keypair();
      const address = kp.getPublicKey().toSuiAddress();
      
      console.log('Invisible Keypair generated:', address);
      setUserAddress(address);
      setKeypair(kp);
      setIsConnected(true);

      // 2. Request free testnet SUI from faucet
      console.log('Requesting testnet SUI for invisible signaling...');
      await requestSuiFromFaucetV2({
        host: getFaucetHost('testnet'),
        recipient: address,
      });
      console.log('Testnet SUI received!');

    } catch (err) {
      console.error('Login/Faucet error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeInvisibleWallet();
  }, []);

  const logout = () => {
    setUserAddress(null);
    setKeypair(null);
    setIsConnected(false);
    setSessionNft(null);
  };

  const mintSessionNft = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setSessionNft({
        id: '0xNFT...123',
        name: 'Governance #402',
        role: 'EXECUTIVE BOARD',
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <SuiContext.Provider
      value={{
        suiClient: client,
        keypair,
        userAddress,
        sessionNft,
        isLoading,
        isConnected,
        logout,
        mintSessionNft,
        initializeInvisibleWallet,
      }}
    >
      {children}
    </SuiContext.Provider>
  );
};

export const useSui = () => useContext(SuiContext);
