import React from 'react';
import Head from 'next/head';
import Header from "../header"
import Navigation from "../navigation"
import { CssBaseline, Box} from '@mui/material';
import style from './layout.module.scss';

export default function Layout({ main, aside }) {
  return (
    <section className={style.layout} >
      <Head>
        <title>Snipster.io</title>
        <meta name="description" content="Website to share your code snippets with other programmers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Header />
      <Navigation />
      <main className={style.main} >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {main}
        </Box>
      </main>
    </section>
  )
}
