import api from '../../src/serverApi/api';
import serverless from 'serverless-http';

export const handler = serverless(api);