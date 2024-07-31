import { Box, Label, DropZone } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';
import React, { FC } from 'react';

const ImageUploader: FC = (props: BasePropertyProps) => {
  const { record, property } = props;

  return (
    <Box p="xl">
      <Label>Attachment</Label>
      <DropZone validate={{ maxSize: 1024000, mimeTypes: ['application/pdf', 'image/jpeg'] }} />
    </Box>
  );
};

export default ImageUploader;
