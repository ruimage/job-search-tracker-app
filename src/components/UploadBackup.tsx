import { HardDriveUpload } from 'lucide-react';
import { persistor } from '../model/store.ts';
import { Button } from '@/components/ui/button.tsx';

export const UploadBackup = () => {
  const uploadBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          persistor.pause();
          const data = JSON.parse(e.target?.result as string);
          localStorage.setItem(
            'persist:job-search-tracker-app-state',
            JSON.stringify(data)
          );
          window.location.reload();
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div>
      <Button
        aria-label="Upload backup"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        onClick={uploadBackup}
      >
        <HardDriveUpload />
        Upload backup
      </Button>
    </div>
  );
};
