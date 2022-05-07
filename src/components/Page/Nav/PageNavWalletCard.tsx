import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface PageNavWalletCardProps {
  icon: React.ReactNode;
  title: string;
  onConnect: () => void;
}

export function PageNavWalletCard(props: PageNavWalletCardProps): JSX.Element {
  const { icon, title, onConnect } = props;

  return (
    <ListItem button onClick={onConnect}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}
