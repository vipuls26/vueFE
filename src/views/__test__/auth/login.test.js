import { expect, test } from 'vitest'


function loginUser(email, password) {
    return { email, password }
}

test('login user with coreect email and password', () => {
    const user = loginUser('test@gmail.com', 'test@gmail.com')

    expect(user).toEqual({ email: 'test@gmail.com', password: 'test@gmail.com' })
    expect(user.email).toBe('test@gmail.com')
    expect(user.password).toBe('test@gmail.com')
})


const users = [{ email: 'test@gmail.com', password: 'correctpassword123' }];

function loginUserWithWrongPassword(email, password) {

    const user = users.find(u => u.email === email);

    if (user && user.password === password) {
        return user;
    }

    return null;
}

test('login with incorrect email and password', () => {
    const user = loginUserWithWrongPassword('test@gmail.com', 'passfdnfkjn');

    expect(user).toBeNull();
});
