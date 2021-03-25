import React from 'react';

interface PageProps {
  className?: string;
}
const Page: React.FC<PageProps> = ({ className, children, ...rest }) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default Page;

// import React, { forwardRef } from 'react';

// interface PageProps {
//   className?: string;
// }
// const Page: React.ForwardRefRenderFunction<HTMLDivElement, PageProps> = (
//   { className, children, ...rest },
//   ref,
// ) => {
//   return (
//     <div className={className} ref={ref} {...rest}>
//       {children}
//     </div>
//   );
// };

// export default forwardRef(Page);
