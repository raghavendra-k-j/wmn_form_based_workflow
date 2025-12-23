import { AnomalyScanProvider } from './context';
import { AnomalyScanView } from './view';

/** Anomaly Scan Page - Entry point */
export const AnomalyScanPage = () => {
  return (
    <AnomalyScanProvider>
      <AnomalyScanView />
    </AnomalyScanProvider>
  );
};

export { AnomalyScanPage as default };
