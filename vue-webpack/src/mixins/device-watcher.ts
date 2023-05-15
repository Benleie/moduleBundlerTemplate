import { onBeforeMount, onBeforeUnmount } from 'vue';
import { isMobile } from '@/utils/env';
import { DeviceTypeEnum } from '@/types/common';
import { useAppStoreWithoutSetup } from '@store/app';

const useAppStore = useAppStoreWithoutSetup();

export default function Resize(): void {
  const resizeHandler = () => {
    const mobile: boolean = isMobile();
    const device: number = mobile ? DeviceTypeEnum.MOBILE : DeviceTypeEnum.PC;
    useAppStore.setDevice(device);
  };

  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });
}
