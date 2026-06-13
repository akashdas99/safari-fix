import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BottomSheet } from "~/components/bottom-sheet/bottom-sheet";

const items = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  subtitle: `Description for item ${i + 1}`,
  details: `Here are more details about item ${i + 1}. This is the extended description shown in the bottom sheet.`,
}));

export default component$(() => {
  const selected = useSignal<(typeof items)[number] | null>(null);
  const nav = useNavigate();

  return (
    <div class="flex h-screen flex-col overflow-hidden bg-gray-50 md:h-auto md:overflow-visible">
      {/* Header - fixed on mobile only */}
      <header class="fixed top-0 left-0 right-0 z-40 flex h-14 items-center border-b border-gray-200 bg-white px-4 md:static">
        <h1 class="text-lg font-semibold text-gray-900">My App</h1>
      </header>

      {/* Content */}
      <main class="mt-14 mb-16 flex-1 overflow-y-auto md:mt-0 md:mb-0">
        <ul class="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick$={() => (selected.value = item)}
                class="w-full px-4 py-3 text-left active:bg-gray-100"
              >
                <p class="font-medium text-gray-900">{item.title}</p>
                <p class="text-sm text-gray-500">{item.subtitle}</p>
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer menu - fixed on mobile only */}
      <footer class="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gray-200 bg-white md:hidden">
        <a
          href="?tab=home"
          onClick$={(e) => {
            e.preventDefault();
            nav("?tab=home");
          }}
          class="flex flex-col items-center text-xs text-gray-600"
        >
          <span class="text-xl">🏠</span>
          Home
        </a>
        <a
          href="?tab=search"
          onClick$={(e) => {
            e.preventDefault();
            nav("?tab=search");
          }}
          class="flex flex-col items-center text-xs text-gray-600"
        >
          <span class="text-xl">🔍</span>
          Search
        </a>
        <a
          href="?tab=profile"
          onClick$={(e) => {
            e.preventDefault();
            nav("?tab=profile");
          }}
          class="flex flex-col items-center text-xs text-gray-600"
        >
          <span class="text-xl">👤</span>
          Profile
        </a>
      </footer>

      {/* Bottom sheet */}
      {selected.value && (
        <BottomSheet
          item={selected.value}
          onClose$={() => (selected.value = null)}
        />
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
