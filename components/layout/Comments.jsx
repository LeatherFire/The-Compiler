import React from 'react';

// Statik yorum verileri
const commentsData = [
    {
        id: 1,
        author: 'Michael Gough',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
        date: 'Feb. 8, 2022',
        content:
            'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.',
    },
    {
        id: 2,
        author: 'Jese Leos',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
        date: 'Feb. 12, 2022',
        content: 'Much appreciated! Glad you liked it ☺️',
    },
    {
        id: 3,
        author: 'Bonnie Green',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        date: 'Mar. 12, 2022',
        content:
            'The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.',
    },
    {
        id: 4,
        author: 'Helene Engels',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
        date: 'Jun. 23, 2022',
        content:
            'Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.',
    },
];

const Comments = () => {
    return (
        <section className="bg-white py-2 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center mb-6 text-center justify-center">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 text-center">Discussion ({commentsData.length})</h2>
                </div>
                <form className="mb-6 justify-center flex flex-col">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="comment"
                            rows="6"
                            className="px-0 w-full text-sm text-gray-900 focus:ring-0 focus:outline-none"
                            placeholder="Write a comment..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="mx-auto inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                    >
                        Post comment
                    </button>
                </form>
                {/* Yorumları döngü ile oluşturma */}
                {commentsData.map((comment) => (
                    <article key={comment.id} className="p-6 text-base bg-white rounded-lg mb-6 border-[1px] border-gray-400">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                    <img className="mr-2 w-6 h-6 rounded-full" src={comment.avatar} alt={comment.author} />
                                    {comment.author}
                                </p>
                                <p className="text-sm text-gray-600">{comment.date}</p>
                            </div>
                            <button
                                id={`dropdownComment${comment.id}Button`}
                                data-dropdown-toggle={`dropdownComment${comment.id}`}
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
                                type="button"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                            {/* Dropdown menu */}
                            <div id={`dropdownComment${comment.id}`} className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                                <ul className="py-1 text-sm text-gray-700">
                                    <li>
                                        <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500">{comment.content}</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline font-medium"
                            >
                                <svg
                                    className="mr-1.5 w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Comments;
