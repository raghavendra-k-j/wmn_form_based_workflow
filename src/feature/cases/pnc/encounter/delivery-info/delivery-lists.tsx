import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Plus, MoreHorizontal, Eye, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { type DeliveryData, SAMPLE_DELIVERIES } from './delivery-data';

/* =============================================================================
 * DELIVERY LIST COMPONENT
 * ============================================================================= */

const RECORDS_PER_PAGE = 10;

interface DeliveryListProps {
    onAddNew: () => void;
    onView: (delivery: DeliveryData) => void;
    onEdit: (delivery: DeliveryData) => void;
}

export const DeliveryList = observer(({ onAddNew, onView, onEdit }: DeliveryListProps) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalRecords = SAMPLE_DELIVERIES.length;
    const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);
    const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
    const endIndex = Math.min(startIndex + RECORDS_PER_PAGE, totalRecords);
    const currentRecords = SAMPLE_DELIVERIES.slice(startIndex, endIndex);

    const handleMenuClick = (e: React.MouseEvent, deliveryId: string) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === deliveryId ? null : deliveryId);
    };

    const handleAction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        setOpenMenuId(null);
        action();
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setOpenMenuId(null);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white text-[13px]">
            {/* Header */}
            <div className="h-12 px-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50 shrink-0">
                <h2 className="text-base font-semibold text-pink-600">Delivery Records</h2>
                <button
                    onClick={onAddNew}
                    className="h-7 px-3 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 flex items-center gap-1.5"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add New Delivery
                </button>
            </div>

            {/* Table Container with horizontal scroll */}
            <div className="flex-1 overflow-auto">
                <table className="w-full min-w-[1100px]">
                    <thead className="sticky top-0 bg-zinc-100 border-b border-zinc-200 z-10">
                        <tr>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Delivery ID</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Delivery Date</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Delivery Time</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Delivery Type</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">No. of Children</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Baby's Gender</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Baby Weight (kg)</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Baby Condition</th>
                            <th className="py-2 px-3 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Mother Condition</th>
                            <th className="py-2 px-3 text-right text-[11px] font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {currentRecords.map((delivery) => (
                            <tr
                                key={delivery.id}
                                onClick={() => onEdit(delivery)}
                                className="hover:bg-indigo-50/50 cursor-pointer transition-colors"
                            >
                                <td className="py-2 px-3 font-medium text-zinc-700 whitespace-nowrap">{delivery.id}</td>
                                <td className="py-2 px-3 text-zinc-600 whitespace-nowrap">{delivery.deliveryDate}</td>
                                <td className="py-2 px-3 text-zinc-600 whitespace-nowrap">{delivery.deliveryTime}</td>
                                <td className="py-2 px-3 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${delivery.deliveryType === 'Normal' ? 'bg-green-100 text-green-700' :
                                        delivery.deliveryType === 'C-Section' ? 'bg-blue-100 text-blue-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                        {delivery.deliveryType}
                                    </span>
                                </td>
                                <td className="py-2 px-3 text-zinc-600 whitespace-nowrap">{delivery.noOfChildren}</td>
                                <td className="py-2 px-3 text-zinc-600 whitespace-nowrap">{delivery.gender}</td>
                                <td className="py-2 px-3 text-zinc-600 whitespace-nowrap">{delivery.babyWeight}</td>
                                <td className="py-2 px-3 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${delivery.babyCondition === 'Healthy' || delivery.babyCondition === 'Stable'
                                        ? 'bg-green-100 text-green-700'
                                        : delivery.babyCondition === 'Critical' || delivery.babyCondition === 'NICU Care'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {delivery.babyCondition}
                                    </span>
                                </td>
                                <td className="py-2 px-3 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${delivery.motherCondition === 'Satisfactory' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {delivery.motherCondition}
                                    </span>
                                </td>
                                <td className="py-2 px-3 whitespace-nowrap">
                                    <div className="relative flex items-center justify-end">
                                        <button
                                            onClick={(e) => handleMenuClick(e, delivery.id)}
                                            className="p-1.5 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
                                            title="Actions"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                        {openMenuId === delivery.id && (
                                            <div className="absolute right-0 top-8 z-20 bg-white border border-zinc-200 rounded-md shadow-lg py-1 min-w-[100px]">
                                                <button
                                                    onClick={(e) => handleAction(e, () => onView(delivery))}
                                                    className="w-full px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-100 flex items-center gap-2"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    View
                                                </button>
                                                <button
                                                    onClick={(e) => handleAction(e, () => onEdit(delivery))}
                                                    className="w-full px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-100 flex items-center gap-2"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="h-12 px-4 border-t border-zinc-200 flex items-center justify-between bg-zinc-50 shrink-0">
                <span className="text-xs text-zinc-500">
                    Showing {startIndex + 1} to {endIndex} of {totalRecords} records
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-7 h-7 rounded text-xs font-medium ${currentPage === page
                                    ? 'bg-pink-600 text-white'
                                    : 'text-zinc-600 hover:bg-zinc-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
});

export { SAMPLE_DELIVERIES };
export type { DeliveryData };

