import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('<Blog /> initially renders only the blog title & author', () => {
  const user = {
    name: 'Yuge Phan',
    username: 'cantbloqtheblog'
  };
  const blog = {
    title: 'The Blog of Testing',
    author: 'Incognito Magneto',
    url: 'https://blog.testique.org',
    likes: 1337,
    user: user
  };

  const component = render(
    <Blog blog={blog} user={user}/>
  );

  const classBlog = component.container.querySelector('.blog');
  console.log(prettyDOM(classBlog));

  const condensedDiv = component.container.querySelector('.lessInfo');
  expect(condensedDiv).toHaveTextContent(`${blog.title} - ${blog.author}`);
  expect(condensedDiv).not.toHaveStyle('display: none');

  const expandedDiv = component.container.querySelector('.moreInfo');
  expect(expandedDiv).toHaveTextContent(`${blog.url}`);
  expect(expandedDiv).toHaveTextContent(`${blog.likes}`);
  expect(expandedDiv).toHaveStyle('display: none');
});
