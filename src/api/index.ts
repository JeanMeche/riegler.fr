export interface Post {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
}

export function getPosts(): Promise<Post[]> {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(resp => resp.json())
}

export function getPostByTitle(slug: string): Promise<Post> {
    return fetch(`https://jsonplaceholder.typicode.com/posts?title=${slug}`).then(resp => resp.json())
}

export function getPostById(id: number | string): Promise<Post> {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(resp => resp.json())
}