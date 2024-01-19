export default {
  type: 'object',
  properties: {
    card_number: {
      type: 'number',
      minimum: 1000000000000,
      maximum: 9999999999999999,
      description: 'Número de tarjeta válido utilizando el algoritmo de LUHN.',
    },
    cvv: {
      type: 'number',
      minimum: 100,
      maximum: 9999,
      description: 'Código de seguridad de la tarjeta.',
      message: {
        minimum: "El campo debe ser mayor o igual a {0}",
        maximum: "El campo debe ser menor o igual a {0}"
      }
    },
    expiration_month: {
      type: 'string',
      pattern: '^(0?[1-9]|1[0-2])$',
      description: 'Mes de vencimiento de la tarjeta (formato MM).',
    },
    expiration_year: {
      type: 'string',
      pattern: '^[0-9]{4}$',
      description: 'Año de vencimiento de la tarjeta (formato YYYY).',
    },
    email: {
      type: 'string',
      minLength: 5,
      maxLength: 100,
      pattern: '^(.+)@(gmail\.com|hotmail\.com|yahoo\.es)$',
      description: 'Dirección de correo electrónico válida.',
    },
  },
  required: ['card_number', 'cvv', 'expiration_month', 'expiration_year', 'email'],
} as const;
