import { expect, test } from 'vitest'


function editBlog(title, category, content, image) {
    return { title, category, content, image }
}

test('edit blog', () => {
    const blog = editBlog('post 1', 'fun', 'loremddkfgkdfhgjk', 'image.jpg')

    expect(blog).toEqual({ title: 'post 1', category: 'fun', content: 'loremddkfgkdfhgjk', image: 'image.jpg' })

    expect(blog.title).toBe('post 1')
    expect(blog.category).toBe('fun')
    expect(blog.content).toBe('loremddkfgkdfhgjk')
    expect(blog.image).toBe('image.jpg')
})


const blogs = [{ title: '', category: '', content: '', image: '' }];

function editBlogwithNullValue(title, category, content, image) {

    return null;
}

test('edit with null value', () => {
    const blogs = editBlogwithNullValue('post 1', 'fun', 'loremddkfgkdfhgjk', 'image.jpg')

    expect(blogs).toBeNull();
});
