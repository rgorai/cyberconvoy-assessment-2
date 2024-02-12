const HTTP_CODES: Record<number, ServerError> = {
  404: {
    status: 404,
    statusText: 'Not Found',
  },
  500: {
    status: 500,
    statusText: 'Internal Server Error',
  },
}

export default HTTP_CODES
