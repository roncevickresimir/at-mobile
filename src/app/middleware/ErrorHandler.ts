// import { isRejectedWithValue } from '@reduxjs/toolkit';
// import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

// export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
//   if (isRejectedWithValue(action)) {
//     console.warn('We got a rejected action!');
//     toast.warn({
//       title: 'Async error!',
//       message: 'data' in action.error ? (action.error.data as { message: string }).message : action.error.message,
//     });
//   }

//   return next(action);
// };
