import React, {lazy, Suspense} from "react";
import { useInView} from 'react-intersection-observer';

const LazyComponent = lazy(() => import("./Heavy"))

const ImportOnVisibility = () => {
    const {ref, inView} = useInView({ threshold: 0.5});
  return (
    <>
      <h1>Visibility</h1>
      <div style={{height: "150vh"}}></div>
      <div ref={ref}>
        {inView &&
            <Suspense fallback={<div>Loading....</div>}>
                <LazyComponent/>
            </Suspense>
        }
      </div>
    </>
  );
};

export default ImportOnVisibility;
