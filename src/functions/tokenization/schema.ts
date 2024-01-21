export default {
  type: 'object',
  properties: {
    card_number: {
      type: 'number',
      description: 'Número de tarjeta válido utilizando el algoritmo de LUHN.',
    },
    ccv: {
      type: 'number',
      description: 'Código de seguridad de la tarjeta.',
    },
    expiration_month: {
      type: 'string',
      description: 'Mes de vencimiento de la tarjeta (formato MM).',
    },
    expiration_year: {
      type: 'string',
      description: 'Año de vencimiento de la tarjeta (formato YYYY).',
    },
    email: {
      type: 'string',
      description: 'Dirección de correo electrónico válida.',
    },
  },
  required: ['card_number', 'ccv', 'expiration_month', 'expiration_year', 'email'],
} as const;
