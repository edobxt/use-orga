"use client";
import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

interface CloudinaryUploadWidgetProps {
  cloudName: string;
  uploadPreset: string;
  folder: string;
  onSuccess?: (result: CloudinaryUploadResult) => void;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    url: string;
    [key: string]: any; // Vous pouvez remplacer par des clés spécifiques selon vos besoins
  };
}

interface Cloudinary {
  createUploadWidget: (
    options: Record<string, any>, // Remplacez par une interface spécifique si possible
    callback: (error: unknown, result: CloudinaryUploadResult) => void
  ) => CloudinaryWidget;
}

interface CloudinaryWidget {
  open: () => void;
}

declare global {
  interface Window {
    cloudinary?: Cloudinary;
  }
}

export function CloudinaryUploadWidget({ 
  cloudName, 
  uploadPreset, 
  folder,
  onSuccess 
}: CloudinaryUploadWidgetProps) {
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  useEffect(() => {
    const initializeWidget = () => {
      if (typeof window !== 'undefined' && window.cloudinary) {
        const cloudinary = window.cloudinary;
        widgetRef.current = cloudinary.createUploadWidget(
          {
            cloudName,
            uploadPreset,
            folder,
            sources: ['local', 'url', 'camera'],
            multiple: true,
            maxFiles: 50,
            styles: {
              palette: {
                window: "#000000",
                windowBorder: "#90A0B3",
                tabIcon: "#FFFFFF",
                menuIcons: "#FFFFFF",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#FFFFFF",
                action: "#FF620C",
                inactiveTabIcon: "#CCCCCC",
                error: "#FF0000",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#000000"
              }
            }
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              onSuccess?.(result);
            }
          }
        );
      }
    };

    initializeWidget();
  }, [cloudName, uploadPreset, folder, onSuccess]);

  const openWidget = () => {
    widgetRef.current?.open();
  };

  return (
    <Button 
      onClick={openWidget}
      className="bg-white text-black hover:bg-gray-100"
    >
      Ajouter des photos
    </Button>
  );
}
