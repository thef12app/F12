import React, { useState } from 'react';
import cn from 'classnames';
import styles from './DropZone.module.scss';
import { Button } from '@nextui-org/react';

export interface DropZoneProps {
  onSelect: (files: FileList) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onSelect }) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const ref = React.useRef(null);

  const onDrop: React.DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    setDraggedOver(false);

    if (evt.dataTransfer.files.length) {
      onSelect(evt.dataTransfer.files);
    }
  };

  const onFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      onSelect(e.target.files);
    }
  };

  return (
    <div
      className={cn(styles.dropTarget, { [styles.draggingOver]: draggedOver })}
      ref={ref}
      onDragOver={(e) => {
        e.preventDefault();
        setDraggedOver(true);
      }}
      onDragLeave={() => setDraggedOver(false)}
      onDrop={onDrop}
    >
      <span>
        Drop your file here Or
        <label>
          <input
            type="file"
            className={styles.fileInput}
            onChange={onFileSelect}
          />{' '}
          <Button ghost>Browse</Button>
        </label>
      </span>
    </div>
  );
};
