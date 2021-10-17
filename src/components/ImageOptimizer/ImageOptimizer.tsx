import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Jimp from 'jimp';
import { DropZone } from '../Dropzone/DropZone';
import { fileToDataURI } from '../../utils';
import styles from './ImageOptimizer.module.scss';
import prettyBytes from 'pretty-bytes';

export const ImageOptimizer: React.FC = () => {
  const [quality, setQuality] = useState(100);
  const [jimpImage, setJimpImage] = useState<Jimp>();

  const [original, setOriginal] = useState<string>();
  const [processed, setProcessed] = useState<string>();

  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const originalSizeFormatted = useMemo(
    () => prettyBytes(originalSize),
    [originalSize]
  );
  const compressedSizeFormatted = useMemo(
    () => prettyBytes(compressedSize),
    [compressedSize]
  );

  const percentSaved = useMemo(() => {
    return (((originalSize - compressedSize) * 100) / originalSize).toFixed(2);
  }, [originalSize, compressedSize]);

  const changeQuality = useCallback(() => {
    console.log(jimpImage, quality);

    if (!jimpImage) {
      return;
    }

    const c = jimpImage.quality(quality);

    c.getBufferAsync(Jimp.MIME_JPEG).then((file) => {
      setCompressedSize(file.byteLength);
    });

    c.getBase64Async(Jimp.MIME_JPEG).then((file) => {
      setProcessed(file);
    });
  }, [jimpImage, quality]);

  useEffect(() => {
    if (quality <= 100 && quality >= 0) {
      changeQuality();
    }
  }, [quality, changeQuality]);

  const onImageSelect = (files: FileList) => {
    setOriginalSize(files[0].size);

    fileToDataURI(files[0]).then((file) => {
      setOriginal(file);

      Jimp.read(file).then((img) => {
        setJimpImage(img);
        setQuality(50);
      });
    });
  };

  return (
    <>
      {!original && <DropZone onSelect={onImageSelect} />}

      {original && (
        <div className={styles.pageContainer}>
          <div className={styles.originalImgContainer}>
            <img alt="Original" src={original} />
          </div>
          <div className={styles.dupImgContainer}>
            <img alt="Modified" src={processed} />
          </div>

          <div className={styles.originalSize}>{originalSizeFormatted}</div>
          <div className={styles.compressedSize}>
            {compressedSizeFormatted} (Saved: {percentSaved}%){' '}
          </div>
        </div>
      )}
    </>
  );
};
