import { USGDatingProvider } from './context';
import { USGDatingView } from './view';

/** USG Dating Page - Entry point */
export const USGDatingPage = () => {
  return (
    <USGDatingProvider>
      <USGDatingView />
    </USGDatingProvider>
  );
};

export { USGDatingPage as default };
