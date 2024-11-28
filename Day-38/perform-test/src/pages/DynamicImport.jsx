import React, { lazy, Suspense, useState } from "react";

const LazyComponent = lazy(() => import("./Heavy"));

export default function DynamicImport() {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div>
        <h1>Dynamic import</h1>
        {isVisible && (
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
        )}
        <button onClick={() => setIsVisible(!isVisible)}>Click</button>
      </div>
    </>
  );
}
