import { Outlet } from '@tanstack/react-router';

export const Main = () => {
  return (
    <main className='h-screen w-screen'>
      <Outlet />
    </main>
  );
};
