import { expect, test } from 'vitest'


function deleteBlog(blogId) {
    return blogId;
}

test('delete blog with id', () => {
    const blogId = '12';
    const result = deleteBlog(blogId);
    expect(result).toBe(blogId);
})




function deleteBlogWithoutID(blogId) {
    if (!blogId) {
        throw new Error('blog id is required');
    }
    return blogId;
}

test('throw error if id is not provided', () => {
    expect(() => deleteBlogWithoutID()).toThrow('blog id is required')
});

test('return if id if missing', () => {
    const deleteId = (id) => id;

    expect(deleteId()).toBeUndefined();
})
