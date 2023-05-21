import { NextPage } from 'next';

export type ErrorTemplateProps = { code?: number; message?: string };

export const ErrorTemplate: NextPage<ErrorTemplateProps> = ({ code = 200, message = 'Error' }) => {
  return (
    <div className="bg-gray-900 text-gray-100 h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-9xl font-bold">{code}</div>
          <div className="text-3xl uppercase">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorTemplate;
