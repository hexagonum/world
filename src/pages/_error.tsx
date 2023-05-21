import ErrorTemplate from '@weather/templates/ErrorTemplate';
import { NextPage } from 'next';

export const ErrorPage: NextPage = () => <ErrorTemplate code={500} message="Error" />;

export default ErrorPage;
