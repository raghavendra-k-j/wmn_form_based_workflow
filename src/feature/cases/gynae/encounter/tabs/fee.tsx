import { observer } from 'mobx-react-lite';

/** Fee Tab Content */
export const FeeContent = observer(() => {
  return (
    <div className="tab-content-card">
      <h2 className="tab-content-title">Fee</h2>
      <p className="tab-content-description">
        Manage consultation fees and billing information.
      </p>
      {/* TODO: Implement fee/billing management */}
    </div>
  );
});
