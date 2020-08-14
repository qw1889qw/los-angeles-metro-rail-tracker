import React, { forwardRef } from 'react';

export default forwardRef(({ children }, ref) => (
  <div ref={ref}>
    {children}
  </div>
));
