"use client";
import { RootState } from "@/app/store/store";
import { maskEmail } from "@/lib/utility/helper/maskEmail";
import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useSelector } from "react-redux";

export default function HeaderAuth() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [viewEmail, setViewEmail] = useState(false);

  const toggleEmail = () => {
    setViewEmail((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      {!viewEmail ? (
        <div className="flex items-center">
          <button onClick={toggleEmail}>
            <RxEyeClosed
              style={{ width: "30", height: "30", marginRight: "10" }}
            />
          </button>
          <span>{maskEmail(userData.email)}</span>
        </div>
      ) : (
        <div className="flex items-center">
          <button onClick={toggleEmail}>
            <RxEyeOpen
              style={{ width: "30", height: "30", marginRight: "10" }}
            />
          </button>

          <span>{userData.email}</span>
        </div>
      )}
    </div>
  );
}
