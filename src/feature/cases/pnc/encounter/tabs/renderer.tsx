import { observer } from 'mobx-react-lite';
import { PncEncounterTab } from '../store';
import { DeliveryInfoContent } from '../delivery-info';
import { PostpartumVisitContent } from '../postpartum-visit';
import { SixWeeksVisitContent } from '../six-weeks-visit';

interface TabContentProps {
  tab: PncEncounterTab;
}

export const TabContent = observer(({ tab }: TabContentProps) => {
  switch (tab) {
    case PncEncounterTab.DELIVERY_INFO:
      return <DeliveryInfoContent />;
    case PncEncounterTab.POSTPARTUM_VISIT:
      return <PostpartumVisitContent />;
    case PncEncounterTab.SIX_WEEKS_VISIT:
      return <SixWeeksVisitContent />;
    default:
      return null;
  }
});
