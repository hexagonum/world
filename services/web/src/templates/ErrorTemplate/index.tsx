import Layout from '@world/layout';
import { NextPage } from 'next';

export type ErrorTemplateProps = { code?: number; message?: string };

export const ErrorTemplate: NextPage<ErrorTemplateProps> = ({
  code = 200,
  message = 'Error',
}) => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-9xl font-bold">{code}</div>
          <div className="text-3xl uppercase">{message}</div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorTemplate;
