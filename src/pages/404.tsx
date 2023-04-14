import { NextPage } from 'next';

export const NotFoundPage: NextPage = () => {
  return (
    <div className="bg-gray-900 text-gray-100 h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-9xl font-bold">404</div>
          <div className="text-3xl uppercase">Page Not Found</div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
