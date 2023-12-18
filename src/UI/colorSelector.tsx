"use Client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, pdfSlice } from "@/lib/redux";

export default function ColorSelector() {
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
    dispatch(
      pdfSlice.actions.setColors({
        primary: debouncedColor,
        secondary: "#ffffff",
      })
    );
  }, [debouncedColor, dispatch]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Primary Color
      </label>
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
}
