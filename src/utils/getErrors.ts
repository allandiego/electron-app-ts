import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error?.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
}

export function getApiErrors(error: any): any {
  // console.log('getError');
  // console.log('----------------------------------------------');
  // console.log(error);
  // console.log('\n\n');
  // console.log(JSON.stringify(error));
  // console.log('\n\n');
  // console.log(error.toJSON());
  // console.log('\n\n');
  // console.log(error.data);
  // console.log(error.response);
  // console.log(error.response.data);
  // console.log('----------------------------------------------');

  //  ---------------  RESPONSE  ---------------
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log('RESPONSE');
    // console.log(error.response);
    // console.log('error.response.data', error.response.data);
    // console.log('error.response.status', error.response.status);
    // console.log('error.response.message', error.response.message);
    // console.log('error.response.headers', error.response.headers);

    // if (error.response?.status && error.response.status === 500) {
    //   return error.message || I18n.t('alerts.messages.internalError');
    // }
    if (error.response?.status && error.response.status === 500) {
      return 'Não foi possível se comunicar com o servidor';
    }

    if (error.response?.status && error.response.status === 503) {
      return 'Erro ao tentar acessar o recurso solicitado';
    }

    if (error.response?.data) {
      const errorResponseData = error.response.data;

      switch (typeof errorResponseData) {
        case 'string':
          return errorResponseData;
        case 'object': {
          // const errorResponseDataKeys = Object.keys(errorResponseData);
          // if (errorResponseDataKeys.includes('message')) {
          //   return errorResponseData.message;
          // }
          // single error
          if (typeof errorResponseData?.message === 'string') {
            return errorResponseData.message;
          }
          if (typeof errorResponseData?.error === 'string') {
            return errorResponseData.error;
          }
          if (typeof errorResponseData?.error_description === 'string') {
            return errorResponseData.error_description;
          }

          if (
            typeof errorResponseData?.error === 'object' &&
            errorResponseData?.error?.message
          ) {
            return errorResponseData.error.message;
          }
          // array of errors
          if (
            errorResponseData.length &&
            errorResponseData.length > 0 &&
            (errorResponseData[0].message || errorResponseData[0].error)
          ) {
            return errorResponseData[0].message || errorResponseData[0].error;
          }
          return JSON.stringify(errorResponseData);
        }
        default: {
          return 'Erro Interno';
        }
      }
    }
    //  ---------------  REQUEST  ---------------
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // https://github.com/axios/axios/issues/1143
    // console.log('REQUEST');
    // console.log(err.request);
    return error.request._response || error.message;

    //  ---------------  ERROR  ---------------
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('ERROR');
    // console.log(err.message);
    return error.message || 'Erro Interno';
    // return I18n.t('alerts.messages.internalError');
  }

  return error;
}
