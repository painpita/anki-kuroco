# KuroKanji

![workflow](https://github.com/painpita/anki-kuroco/actions/workflows/build.yml/badge.svg)

## _A simple Kanji learning app based on Kuroco_

Powered by Gatsby, a React Framework ⚛️

KuroKanji is　a Webapp that lets its users learn Kanji by managing their own card list and generating HTML tiles which feature a kanji on a side and its signification on the other.
It features : 
  * User authentication support using Kuroco membership API
  * User specific lists
  * Creation of anki cards using Kuroco forms
  * Creation of card lists
  * Multi language support using the Kuroco engine
  * Automatic card generation using third party API

## About Gatsby

Gatsby is a React framework and a static site generator that aims to help build fast-loading websites. It is open-source and aggregates functionalities from React, GraphQL and Webpack.

https://www.gatsbyjs.com/

## 🚀 How to run

Dependencies : 

npm v14.15.0 or higher

Run the following commands to start the app in development mode :

``
npm install 
npm run dev
``

## 🔌 Plugins

KuroKanji uses the following plugins :
  * gatsby-source-filesystem : used to copy locale files to the public folder
  * gatsby-plugin-react-i18next : used for multi-language support
  * gatsby-plugin-sass : used to load scss styles in Gatsby

## 🧩 Frameworks

KuroKanji uses the following frameworks :
  * Gatsby
Gatsby is a static site generator (SSG) that binds together features of React, Webpack and GraphQL to help generate fast static websites. In KuroKanji, we use Gatsby features to help us navigate through React components, pass data between components, handle multi-language using GraphQL and sharing data through the website.
  * React
React is a front-end framework and a JS library that helps us create dynamic website by generating 'components' that bind together a template and its logic.
  * Material UI
Material UI is a React library that gives developers ready-to-use components to generate their front-end.

## 🛠️ Other tools

KuroKanji also uses the following tools :
  * Axios : used for building HTTP queries & interacting with Kuroco as well as managing authentication

## 🐛 Remaning bugs

Some bugs remain unfixed for now : 
  * Sometimes, the user might be redirected to the profile page without apparent reason
  * If the language is switched to japanese, it can't be changed back
  * If the language is different from english, it will not display in flip cards (kuroco bug)

