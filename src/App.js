import { createElement as el } from 'react' // declarative
import logo from './images/logo.svg'
import './App.css'

export const App = () => {
  // declarative below
  const currentYear = new Date().getFullYear()

  return el(
    'div',
    { className: 'App' },
    el(
      'header',
      { className: 'App-header' },
      el('img', { className: 'App-logo', alt: 'logo', src: logo }),
      el(
        'a',
        {
          className: 'App-link',
          href: 'https://reactjs.org',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        'React docs'
      ),
      el(
        'span',
        {
          className: 'App-copyright'
        },
        `All rights reserved | ${currentYear}`
      )
    )
  )
}
