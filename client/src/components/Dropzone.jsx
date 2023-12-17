import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className='drop-zone'>גרור את הקבצים לכאן או לחץ כדי לבחור את הקבצים</p>
      </div>
    </section>
  )
}

export default Dropzone;