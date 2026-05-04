import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/** Reglas nuevas de react-hooks 7 (Next 16) demasiado estrictas para el código actual; se pueden ir endureciendo por archivo. */
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/refs': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default eslintConfig;
