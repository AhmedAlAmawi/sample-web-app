"use Client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, pdfSlice } from "@/lib/redux";
import CrownIcon from "./crownIcon";

export default function ColorSelector({
  isPremium,
  setOpenModal,
}: {
  isPremium: boolean;
  setOpenModal: any;
}) {
  const premiumStyle =
    (!isPremium && "pointer-events-none  bg-jackOrange/20 opacity-40") || "";
  const [color, setColor] = useState("#000000");
  const [debouncedColor, setDebouncedColor] = useState(color);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedColor(color);
    }, 500); // 500ms delay for debounce
    return () => clearTimeout(timerId);
  }, [color]);

  useEffect(() => {
    if (!isPremium) return;
    dispatch(
      pdfSlice.actions.setColors({
        primary: debouncedColor,
        secondary: "#ffffff",
      })
    );
  }, [debouncedColor, dispatch]);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between">
        <span className="flex flex-row items-center gap-2">
          Primary Color
          {!isPremium && <CrownIcon />}
        </span>
        {!isPremium && (
          <button
            type="button"
            className="text-jackOrange hover:text-orange-800 "
            onClick={() => setOpenModal(true)}
          >
            Upgrade to Premium
          </button>
        )}
      </div>
      <div className={`${premiumStyle}`}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
}
