export const isDev = process.env.NODE_ENV === 'development'
export const databaseConnected = () => process['database_connected']