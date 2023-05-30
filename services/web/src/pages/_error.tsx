import ErrorTemplate from '@world/templates/ErrorTemplate';
import { NextPage } from 'next';

export const ErrorPage: NextPage = () => <ErrorTemplate code={500} message="Error" />;

export default ErrorPage;
