import { expect, test } from 'vitest'


function addBlog(title, category, content, image) {
    return { title, category, content, image }
}

test('add blog', () => {
    const user = addBlog('post 1', 'fun', 'loremddkfgkdfhgjk', 'image.jpg')

    expect(user).toEqual({ title: 'post 1', category: 'fun', content: 'loremddkfgkdfhgjk', image: 'image.jpg' })

    expect(user.title).toBe('post 1')
    expect(user.category).toBe('fun')
    expect(user.content).toBe('loremddkfgkdfhgjk')
    expect(user.image).toBe('image.jpg')
})


const users = [{ title: '', category: '', content: '', image: '' }];

function addBlogwithNullValue(title, category, content, image) {

    return null;
}

test('login with incorrect email and password', () => {
    const user = addBlogwithNullValue('test@gmail.com', 'passfdnfkjn');

    expect(user).toBeNull();
});
