'use client'

import { uploadMedia } from "@/services/media.service";
import { AxiosError } from "axios";
import { useState } from "react";

export default function TestUpload() {
  const [files, setFiles] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const handleFilesSubmit = async () => {
    try {
      await uploadMedia(files);
    } catch(err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      }
    }
  }

  return (
    <>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)}/>
      <button onClick={() => handleFilesSubmit()}>Send</button>

      { error && <div>${error}</div>}
    </>
  )
}