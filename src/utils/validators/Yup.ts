/* eslint-disable arrow-body-style */
import * as Yup from 'yup';
// import { isValid as isValidCPF } from './Cpf';
// import { isValid as isValidCNPJ } from './Cnpj';

// Yup.addMethod(Yup.string, 'isCpf', function (message) {
//   return Yup.mixed().test('isCpf', message, function (value) {
//     const { path, createError } = this;
//     return isValidCPF(value) || createError({ path, message });
//   });
// });

// Yup.addMethod(Yup.string, 'isCnpj', message => {
//   return Yup.mixed().test('isCnpj', message, function (value) {
//     const { path, createError } = this;
//     return isValidCPF(value) || createError({ path, message });
//   });
// });

// function isValidCountryName(ref, msg) {
//   return yup.mixed().test({
//     name: 'isValidCountry',
//     exclusive: false,
//     message: msg || `${ref.path} must be a valid country name`,
//     params: {
//       reference: ref.path,
//     },
//     test(value) {
//      const isRightFormat = this.resolve(ref);
//      return isRightFormat; [//ASK] should be doing the checks or transformations here
//     },
//   });
// }

// Yup.addMethod(Yup.string, 'isCPF', message => {
//   return Yup.mixed().test({
//     message,
//     name: 'isCPF',
//     // exclusive: true,
//     params: {},
//     test(value) {
//       return (
//         isValidCPF(value) || this.createError({ path: this.path, message })
//       );
//     },
//   });
// });

// Yup.addMethod(Yup.string, 'isCNPJ', message => {
//   return Yup.mixed().test({
//     message,
//     name: 'isCNPJ',
//     // exclusive: true,
//     params: {},
//     test(value) {
//       return (
//         isValidCNPJ(value) || this.createError({ path: this.path, message })
//       );
//     },
//   });
// });

// // https://github.com/jquense/yup/issues/104#issuecomment-659508687
// Yup.addMethod(Yup.string, 'oneOfOptional', (arr, message) => {
//   return Yup.mixed().test({
//     message,
//     name: 'oneOfOptional',
//     exclusive: true,
//     params: {},
//     test(value) {
//       return value == null ? true : arr.includes(value);
//     },
//   });
// });
// usage
// export default Yup.object().shape({
//   value: oneOfOptional(['toto','foo','bar'])
// });

export default Yup;
