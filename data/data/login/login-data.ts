export const invalidLoggedInData = [
    {
        email: 'test',
        password: '1234567890',
        expected: [
            {
                field: 'Email',
                message: 'Invalid email'
            }
        ]
    },
    {
        email: '',
        password: '',
        expected: [
            {
                field: 'Email',
                message: 'This field can not be empty'
            }
        ]
    }
]
