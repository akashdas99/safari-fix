import { component$, useSignal } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

export interface BottomSheetItem {
  title: string;
  details: string;
}

interface BottomSheetProps {
  item: BottomSheetItem;
  onClose$: PropFunction<() => void>;
}

export const BottomSheet = component$<BottomSheetProps>(
  ({ item, onClose$ }) => {
    const startDate = useSignal("");
    const endDate = useSignal("");

    return (
      <div class="fixed inset-x-0 top-14 bottom-16 z-30 md:top-0 md:bottom-0">
        <div
          class="absolute inset-0 touch-none overscroll-contain bg-black/40"
          onClick$={onClose$}
          onTouchMove$={(e) => e.preventDefault()}
        />
        <div class="absolute right-0 bottom-0 left-0 max-h-full overflow-y-auto overscroll-contain rounded-t-2xl bg-white p-4 pb-6 shadow-lg">
          <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
          <h2 class="text-lg font-semibold text-gray-900">{item.title}</h2>
          <p class="mt-2 text-sm text-gray-600">{item.details}</p>

          <div class="mt-4 flex gap-3">
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
    );
  },
);
