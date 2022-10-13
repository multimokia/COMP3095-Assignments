import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recipe App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-[4rem] pt-20">
            All<span className="text-[#0070f3]"> Recipes</span>
          </h1>
        </div>
      </main>
    </div>
  );
}
