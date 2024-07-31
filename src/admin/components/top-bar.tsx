import { Box, Button, Icon, Tooltip } from '@adminjs/design-system';
import { useCurrentAdmin } from 'adminjs';
import React, { FC, useCallback } from 'react';
import axios from 'axios';

const TopBar: FC = () => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();
  const icon = currentAdmin.theme === 'dark' ? 'Sun' : 'Moon';

  const handleChangeTheme = useCallback(async () => {
    try {
      const theme = currentAdmin.theme === 'dark' ? 'light' : 'dark';
      const response = await axios.put('/admin/me', { theme });
      const { updated, session } = response.data;
      if (updated) {
        setCurrentAdmin(session);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }, [currentAdmin]);

  return (
    <Box flex flexGrow={1} justifyContent="end" alignItems="center" p="lg">
      <Button
        size="icon"
        variant="text"
        onClick={handleChangeTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.firstChild.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.firstChild.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={`Switch to ${currentAdmin.theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <Icon icon={icon} size={24} />
      </Button>
    </Box>
  );
};

export { TopBar };
export default TopBar;
