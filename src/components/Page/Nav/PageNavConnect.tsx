import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useCallback, useState } from 'react';

import { useWallet } from 'use-wallet';

import metamaskLogo from 'assets/img/metamask-fox.svg';

import { PageNavWalletCard } from './PageNavWalletCard';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function PageNavConnect(): JSX.Element {
  const { connect } = useWallet();

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleMetamaskConnect = useCallback(() => {
    connect('injected');
    setShowModal(false);
  }, [connect]);

  return (
    <>
      <Button onClick={handleModalOpen} variant="contained">
        Connect
      </Button>
      <Modal open={showModal} onClose={handleModalClose}>
        <Box sx={style}>
          <h1 style={{ textAlign: 'center' }} className="h1">
            Choose wallet
          </h1>

          <PageNavWalletCard
            icon={<img src={metamaskLogo} alt="" style={{ height: 32 }} />}
            onConnect={handleMetamaskConnect}
            title="Metamask"
          ></PageNavWalletCard>
        </Box>
      </Modal>
    </>
  );
}
