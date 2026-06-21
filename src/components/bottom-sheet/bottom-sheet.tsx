import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

export interface BottomSheetItem {
  title: string;
  details: string;
}

const listItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `Option ${i + 1}`,
  value: `value-${i + 1}`,
}));

interface BottomSheetProps {
  item: BottomSheetItem;
  onClose$: PropFunction<() => void>;
}

export const BottomSheet = component$<BottomSheetProps>(
  ({ item, onClose$ }) => {
    const startDate = useSignal("");
    const endDate = useSignal("");

    useVisibleTask$(({ cleanup }) => {
      const prevent = (e: TouchEvent | WheelEvent) => e.preventDefault();
      document.addEventListener("touchmove", prevent, { passive: false });
      document.addEventListener("wheel", prevent, { passive: false });

      cleanup(() => {
        document.removeEventListener("touchmove", prevent);
        document.removeEventListener("wheel", prevent);
      });
    });

    return (
      <div class="fixed inset-x-0 top-14 bottom-16 z-30 md:top-0 md:bottom-0">
        <div
          class="absolute inset-0 touch-none overscroll-contain bg-black/40"
          onClick$={onClose$}
          onTouchMove$={(e) => e.preventDefault()}
        />
        <div class="absolute right-0 bottom-0 left-0 flex h-[50vh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-lg">
          <div class="shrink-0 p-4 pb-2">
            <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
            <h2 class="text-lg font-semibold text-gray-900">{item.title}</h2>
            <p class="mt-2 text-sm text-gray-600">{item.details}</p>
          </div>

          <ul
            class="flex-1 overflow-y-auto overscroll-contain divide-y divide-gray-100 px-4"
            onTouchMove$={(e) => e.stopPropagation()}
            onWheel$={(e) => e.stopPropagation()}
          >
            {listItems.map((listItem) => (
              <li key={listItem.id} class="flex items-center py-3">
                <div class="h-8 w-8 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  {listItem.id}
                </div>
                <span class="ml-3 text-sm text-gray-900">{listItem.label}</span>
              </li>
            ))}
          </ul>

          <div class="shrink-0 p-4 pt-3">
            <div class="mt-0 flex gap-3">
              <div class="relative flex-1">
                <div class="flex h-10 w-full items-center rounded-lg border border-gray-200 bg-gray-100 px-3 text-sm text-gray-900">
                  {startDate.value || "Start date"}
                </div>
                <input
                  type="date"
                  value={startDate.value}
                  onInput$={(_, el) => (startDate.value = el.value)}
                  class="absolute inset-0 box-border h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:p-0"
                />
              </div>
              <div class="relative flex-1">
                <div class="flex h-10 w-full items-center rounded-lg border border-gray-200 bg-gray-100 px-3 text-sm text-gray-900">
                  {endDate.value || "End date"}
                </div>
                <input
                  type="date"
                  value={endDate.value}
                  onInput$={(_, el) => (endDate.value = el.value)}
                  class="absolute inset-0 box-border h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:p-0"
                />
              </div>
            </div>

            <button
              type="button"
              onClick$={onClose$}
              class="mt-4 w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  },
);
