import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { Login } from '@/components/Login';
import { MenuButton } from '@/components/MenuButton';
import { CpeButton } from '@/components/CpeButton';
import { GitButton } from '@/components/GitButton';

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Userservice } from "@/core/user.service";

export default function Home() {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    async function checkCookie(){
      let res = await Userservice.checkLoginStatus(cookies.access_token)
      if(res === 1)
        router.push("/findgame");
    }

    checkCookie();
  }, []);

  return (
    <div className={styles.all}> 
      <Head>
        <title>BATTLESHIP - BootyByters</title>
        <link rel="icon" href="/steeringwheel2.ico" />
      </Head>
      <main className={styles.main}>
        <MenuButton />
        <CpeButton />
        <GitButton />
        <div className={styles.loginbox}>
          <p className={styles.p1}>BATAILLE &nbsp;NAVALE</p>
          <p className={styles.p2}>BY THE</p>
          <p className={styles.p3}>B O O T Y &nbsp;&nbsp; B Y T E R S</p>
          <br/>
          <Image
            className={styles.logo}
            src="/ships/croiseur-min.png"
            alt="Croiseur"
            width={246}
            height={74}
            priority
          />
          <Login />
        </div>
      </main>
    </div>
  );
}
