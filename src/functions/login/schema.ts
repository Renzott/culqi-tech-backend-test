
// login schema, username and password
export default {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 5,
            maxLength: 100,
            description: 'Nombre de usuario.',
        },
        password: {
            type: 'string',
            minLength: 5,
            maxLength: 100,
            description: 'Contraseña de usuario.',
        },
    },
    required: ['username', 'password'],
} as const;