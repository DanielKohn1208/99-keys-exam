import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';

import '@pqina/pintura/pintura.css';
import { getEditorDefaults, 
  processImage, 
  createDefaultImageWriter, 
  createDefaultImageReader } from '@pqina/pintura';
import { PinturaEditor } from '@pqina/react-pintura';
const editorConfig = getEditorDefaults();
editorConfig.enableToolbar = false;
editorConfig.enableButtonClose = false;
editorConfig.enableUtils = false;
editorConfig.enableButtonExport = false;
editorConfig.enableNavigateHistory = false;
editorConfig.cropEnableRotationInput = false;
editorConfig.cropEnableImageSelection = false;
editorConfig.imageCropLimitToImage = false;
editorConfig.enableZoom = false;
editorConfig.animations = 'never';

function ImageEditor({id, curImageUrl, setCurImageUrl, curImageState, updateImageState}) {

  const editorRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    setCurImageUrl(URL.createObjectURL(acceptedFiles[0]));
  })



  // File Stuff
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }, 
    maxFiles: 1,
    onDrop: onDrop
  });

  // Editor Stuff
  // editorConfig.zoomLevel = zoom

  function rotLeft() {
    const { editor } = editorRef.current;
    editor.imageRotation -= Math.PI / 2;
  }

  function rotRight() {
    const { editor } = editorRef.current;
    editor.imageRotation += Math.PI / 2;
  }

  function zoomIn() {
    const { editor } = editorRef.current;
    let crop = editor.imageCrop
    crop.width *= 0.9
    crop.height*= 0.9
    editor.imageCrop = crop
  }

  function zoomOut() {
    const { editor } = editorRef.current;
    let crop = editor.imageCrop
    crop.width *= 1.1
    crop.height *= 1.1
    editor.imageCrop = crop
  }

  function onImageLoad() {
    const { editor } = editorRef.current;
    editor.imageState = curImageState
  }

  function removeImage() {
    URL.revokeObjectURL(curImageUrl)
    setCurImageUrl(null)
    updateImageState(id, null, null)
  }

  async function saveImage(e) {
    e.preventDefault()
    if (editorRef.current != null) {
      const { editor } = editorRef.current;
      const res = await processImage(curImageUrl, {
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        imageState: editor.imageState,
      })
      updateImageState(id, editor.imageState, URL.createObjectURL(res.dest));
    }
  }


  return (<div className="h-100"><div className="container border border-dark rounded-3 h-75">
    {curImageUrl == null && <div {...getRootProps({className: 'dropzone h-100'})}>
                <input {...getInputProps()}/>
      <p className="text-center mt-5 pt-5">Drag and drop an image, or click anywhere to upload (jpeg and png only)</p>
    </div> }

    {curImageUrl != null && 
      <PinturaEditor {...editorConfig} 
        src={curImageUrl} 
        onLoad={onImageLoad}
        imageCropAspectRatio={16/9}
        imageBackgroundColor={[248, 249, 250]}
        ref={editorRef}
      >
      </PinturaEditor>
    }
  </div>
  <div className="pt-3 d-flex justify-content-between">
    <div className="d-flex">
      <button onClick={(e) =>{
          e.preventDefault()
          removeImage()
        }}
        className="btn btn-primary me-2">Remove</button>
      <button 
          onClick={saveImage}
          className="btn btn-primary">Save Image</button>
    </div>
    <div className="d-flex">
      <button onClick={(e) => {
          e.preventDefault();
          zoomOut();
        }} 
        className="btn btn-primary me-2">
          -
      </button>
      <button onClick={(e) => {
          e.preventDefault();
          zoomIn();
        }} 
        className="btn btn-primary me-2">
          +
      </button>
    </div>
    <div className="d-flex">
    <button onClick={(e) => {
          e.preventDefault();
          rotLeft();
        }} 
        className="btn btn-primary me-2 fw-bolder">
        ↺
      </button>
      <button onClick={(e) => {
          e.preventDefault();
          rotRight();
        }} 
        className="btn btn-primary me-2 fw-bolder">
        ↻
      </button>
    </div>
  </div>
  <p className="text-muted">Hint: Drag image to place at desired position in frame</p>
  </div>)
}

export default React.memo(ImageEditor)
