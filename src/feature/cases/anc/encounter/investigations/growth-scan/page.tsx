import { GrowthScanProvider } from './context';
import { GrowthScanView } from './view';

/** Growth Scan Page - Entry point */
export const GrowthScanPage = () => {
  return (
    <GrowthScanProvider>
      <GrowthScanView />
    </GrowthScanProvider>
  );
};

export { GrowthScanPage as default };
