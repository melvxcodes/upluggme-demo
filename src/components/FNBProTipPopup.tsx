import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FNBProTipPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tipNumber?: number;
}

const bankingTips = [
  "Don't share your banking app OTP with anyone.",
  "Enable biometric authentication for extra security.",
  "Regularly review your account statements for suspicious activity.",
  "Use strong, unique passwords for your banking apps.",
  "Never conduct banking transactions on public WiFi.",
  "Set up transaction notifications for real-time monitoring.",
  "Keep your banking app updated to the latest version.",
  "Log out of your banking app when not in use.",
  "Use in-app card locking features if you misplace your card.",
  "Verify SMS/email requests before clicking any links.",
];

export function FNBProTipPopup({
  isOpen,
  onClose,
  tipNumber,
}: FNBProTipPopupProps) {
  const [currentTip] = useState(() => {
    const tip = tipNumber || Math.floor(Math.random() * bankingTips.length) + 1;
    return {
      number: tip,
      text: bankingTips[tip - 1] || bankingTips[0],
    };
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop with dark overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Card */}
      <div className="relative z-10 mx-4 w-full max-w-[320px] rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* FNB Logo/Header */}
        <div className="mb-4 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#DC143C]">
            <span className="text-xl font-bold text-white">FNB</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            FNB Banking Pro Tip
          </h3>
          <p className="text-sm text-gray-500">Tip #{currentTip.number}</p>
        </div>

        {/* Tip Content */}
        <div className="mb-6">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-center text-gray-800">{currentTip.text}</p>
          </div>
        </div>

        {/* OK Button */}
        <Button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-[#DC143C] bg-transparent py-3 text-[#DC143C] transition-all duration-200 hover:bg-[#DC143C] hover:text-white hover:shadow-lg hover:shadow-[#DC143C]/30 focus:bg-[#DC143C] focus:text-white focus:shadow-lg focus:shadow-[#DC143C]/30 active:scale-95"
        >
          Got it, thanks!
        </Button>

        {/* Powered by FNB */}
        <p className="mt-4 text-center text-xs text-gray-400">Powered by FNB</p>
      </div>
    </div>
  );
}
