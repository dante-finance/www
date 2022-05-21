import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { useWallet } from 'use-wallet';

import { Trans, useTranslation } from 'react-i18next';

import metamaskLogo from 'assets/img/metamask-fox.svg';

import { PageNavWalletCard } from './PageNavWalletCard';

const modalStyle = {
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
  const { connect, reset, status, account } = useWallet();
  const { t } = useTranslation(['generic']);

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleDisconnect = useCallback(() => {
    reset();
  }, [reset]);

  const handleMetamaskConnect = useCallback(() => {
    connect('injected');
    setShowModal(false);
  }, [connect]);

  return (
    <>
      {status === 'connected' ? (
        <>
          <span className="visually-hidden">
            {t('generic:wallet_name', { amount: account })}
          </span>
          <Button onClick={handleDisconnect} variant="contained">
            <span aria-hidden>
              {t('generic:wallet_name', { amount: account })}
            </span>
            <span className="visually-hidden">
              {t('generic:page_header.connect.disconnect_action')}
            </span>
          </Button>
        </>
      ) : (
        <Button onClick={handleModalOpen} variant="contained">
          <Trans
            i18nKey="generic:page_header.connect.connect_action"
            components={{
              'visually-hidden': <span className="visually-hidden" />,
            }}
          />
        </Button>
      )}

      <Modal open={showModal} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <h1 style={{ textAlign: 'center' }} className="h1">
            {t('generic:page_header.connect.title')}
          </h1>

          <PageNavWalletCard
            icon={<img src={metamaskLogo} alt="" style={{ height: 32 }} />}
            onConnect={handleMetamaskConnect}
            title={t('generic:wallet.metamask.label')}
          />
        </Box>
      </Modal>
    </>
  );
}
