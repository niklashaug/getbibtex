![vscode-portfolio banner](./docs/animation.gif)

<div align="center">

[![NextJS](https://img.shields.io/badge/NextJS-blueviolet.svg?style=flat-square&logo=react&color=3a005a&logoColor=white)](/#)
[![tRPC](https://img.shields.io/badge/tRPC-blueviolet.svg?style=flat-square&logo=trpc&color=3a005a&logoColor=white)](/#)
[![Typescript](https://img.shields.io/badge/typescript-blueviolet.svg?style=flat-square&logo=typescript&color=3a005a&logoColor=white)](/#)
[![Tailwind](https://img.shields.io/badge/tailwind-blueviolet.svg?style=flat-square&logo=tailwindcss&color=3a005a&logoColor=white)](/#)
[![Prettier](https://img.shields.io/badge/prettier-blueviolet.svg?style=flat-square&logo=prettier&color=3a005a&logoColor=white)](/#)
[![Vercel](https://img.shields.io/badge/vercel-blueviolet.svg?style=flat-square&logo=vercel&color=3a005a&logoColor=white)](/#)
</div>

***

<h4 align="center">BibTeX entry generator from URL</h4>


<p align="center">
  <a href="#about">About</a> •
  <a href="#what-i-have-learned">What I Have Learned</a> •
  <a href="#development">Development</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>
Website: <b><a href="https://getbibtex.com/">getbibtex.com 🌐</a></b><br>
<img width="2000" height="0">
</td>
</tbody>
</table>
</p>

## About

Get BibTeX entry for a website. Data is scrapped from website headers. The project was inspired by [Wikipedia BibTeX Generator](https://irl.github.io/bibwiki/) which works only for Wikipedia links.

## What I Have Learned

This project was more goal oriented rather than education oriented. I've mostly polished my knowledge in CORS/same origin policy areas (which is no longer in this project as I've moved backend to NextJS).

## Development

1. Install dependencies with `npm install`.
2. Create a local db with `docker compose up`. You can browse local db under http://0.0.0.0:8081/db/test.
3. Create `.env` file based on `.env.example`.
4. Run frontend application with `npm run dev`.
5. Access application under http://localhost:3000.

## Deployment

Add environmental variable (project secrets on vercel) based on `.env.example`.
