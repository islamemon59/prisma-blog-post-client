import Link from "next/link";
import React from "react";

const PracticeLayout = ({
  children,
  marketing,
  sales,
}: {
  children: React.ReactNode;
  marketing: React.ReactNode;
  sales: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex gap-6 py-4 px-4">
        <Link
          className="px-2.5 py-1 bg-white text-black rounded-2xl"
          href="/development"
        >
          Development
        </Link>
        <Link
          className="px-2.5 py-1 bg-white text-black rounded-2xl"
          href="/marketing"
        >
          Marketing
        </Link>
        <Link
          className="px-2.5 py-1 bg-white text-black rounded-2xl"
          href="/marketing/settings"
        >
          Settings
        </Link>
        <Link
          className="px-2.5 py-1 bg-white text-black rounded-2xl"
          href="/sales"
        >
          Sales
        </Link>
      </div>

      <div className="flex">
        {marketing}
        {sales}
      </div>
      {children}
    </div>
  );
};

export default PracticeLayout;
