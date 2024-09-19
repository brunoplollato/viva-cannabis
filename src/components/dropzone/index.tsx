'use client'

import { Avatar } from "@nextui-org/react"
import { Camera } from "lucide-react"
import React, { useRef, useState } from 'react'
import { toast } from "react-toastify"

type Props = {
  src?: string | undefined;
  onFileSelect: (file: File) => void;
}

export default function Dropzone({ src, onFileSelect }: Props) {
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(src)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setAvatarSrc(e.target?.result as string)
        }
        reader.readAsDataURL(file)
        onFileSelect(file)
      } else {
        toast.error('Formato não aceito')
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative inline-block group">
      <Avatar
        src={avatarSrc || "/placeholder.png?height=128&width=128"}
        className="w-32 h-32 text-large transition-opacity duration-300 group-hover:opacity-75"
      />
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={handleUploadClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleUploadClick()}
        aria-label="Upload avatar"
      >
        <Camera className="w-8 h-8 text-white" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload file"
      />
    </div>
  )
}