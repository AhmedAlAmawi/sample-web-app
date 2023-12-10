"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  pdfSlice,
  useSelector,
  selectSelectedComponent,
  useDispatch,
  SelectedComponent,
} from "@/lib/redux";
type SelectedComponentKey = keyof typeof SelectedComponent;

export default function Header({
  component,
  title,
}: {
  component: SelectedComponentKey;
  title: string;
}) {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);

  return (
    <div className="flex flex-row justify-between items-center my-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <button
        type="button"
        onClick={() =>
          dispatch(
            pdfSlice.actions.setSelectedComponent(
              selectedComponent !== SelectedComponent[component]
                ? SelectedComponent[component]
                : SelectedComponent.NA
            )
          )
        }
      >
        {selectedComponent === SelectedComponent[component] ? (
          <ChevronUpIcon
            className="h-6 w-6 text-jackOrange"
            aria-hidden="true"
          />
        ) : (
          <ChevronDownIcon
            className="h-6 w-6 text-jackOrange"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
