import React, { useState } from 'react';
import { fileToDataURI } from '../../utils';
import { DropZone } from '../Dropzone/DropZone';
import { Layout } from '../Layout/Layout';
import styles from './ImageToDataURI.module.scss';
import copy from 'copy-to-clipboard';

export const ImageToDataURI: React.FC = () => {
  const [dataURI, setDataURI] = useState('');
  const [isImage, setIsImage] = useState(false);
  const onDataUriChange = (val: string) => {
    if (val !== dataURI) {
      setDataURI(val);
    }
  };

  const onFileSelect = (files: FileList) => {
    setIsImage(false);
    setDataURI('');

    fileToDataURI(files[0]).then((data) => {
      setDataURI(data || '');
      console.log(files[0].type);

      setIsImage(
        [
          'image/png',
          'image/svg+xml',
          'image/tiff',
          'image/webp',
          'image/bmp',
          'image/gif',
          'image/jpeg',
        ].includes(files[0].type)
      );
    });
  };

  return (
    <Layout>
      <div className={styles.content}>
        <DropZone onSelect={(files) => onFileSelect(files)} />
        <div className={styles.result}>
          <div className={styles.imageContainer}>
            {isImage ? (
              <img src={dataURI} alt="Result image" />
            ) : dataURI ? (
              <div>Not an image</div>
            ) : (
              <div>Image Preview</div>
            )}
          </div>
          <textarea
            placeholder="Data URI..."
            value={dataURI}
            onChange={(e) => onDataUriChange(e.target.value)}
          ></textarea>
          {dataURI && (
            <button onClick={() => copy(dataURI)} className={styles.copyButton}>
              Copy
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
