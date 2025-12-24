import { observer } from 'mobx-react-lite';

interface SectionHeaderProps {
    title: string;
}

export const SectionHeader = observer(({ title }: SectionHeaderProps) => {
    return (
        <h3 className="text-lg font-semibold text-pink-600 bg-pink-50 border-b border-pink-200 px-4 py-3 mb-4 -mx-4">
            {title}
        </h3>
    );
});
