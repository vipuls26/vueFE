import { expect, test } from 'vitest'


function registerUser(name, email, password, confirmpassword, role) {
    return { name, email, password, confirmpassword, role }
}

test('register user with coreect email and password', () => {
    const user = registerUser('test', 'test@gmail.com', 'password123', 'password123', 'user')

    expect(user).toEqual({ name: 'test', email: 'test@gmail.com', password: 'password123', confirmpassword: 'password123', role: 'user' })
    
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@gmail.com')
    expect(user.password).toBe('password123')
    expect(user.confirmpassword).toBe('password123'),
    expect(user.role).toBe('user')
})


const users = [{ email: 'test@gmail.com', password: 'correctpassword123' }];

function registerUserWithWrongPassword(email, password, role) {

    const user = users.find(u => u.email === email);

    if (user && user.password === password && user.role === role) {
        return user;
    } 

    return null;
}

test('register with incorrect email and password', () => {
    const user = registerUserWithWrongPassword('test@gmail.com', 'passfdnfkjn', 'user');

    expect(user).toBeNull();
});
