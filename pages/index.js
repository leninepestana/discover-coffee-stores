import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";

import { useRouter } from "next/router";
import Link from "next/link";
import Card from "../components/card";

import { fetchCoffeeStores } from "../lib/coffee-store";

import coffeeStoresData from "../data/coffee-stores.json";

import useTrackLocation from "../hooks/use-track-location";
import { useEffect } from "react";

export async function getStaticProps(context) {
  // const data = coffeeStoresData;
  // console.log("Hi getStaticProps");
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: { coffeeStores }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  // console.log("props", props);

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(
            `/api/getCoffeeStoreByLocation?latLong=${latLong}&limit=30`
          );

          console.log({ fetchedCoffeeStores });
          // setCoffeeStores(fetchedCoffeeStores);

          //set coffee stores
        } catch (error) {
          console.log({ error });
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);

  // https://blog.logrocket.com/guide-to-react-useeffect-hook/

  //------------------------------------
  const handleOnBtnClick = () => {
    console.log("Hi from banner button");

    // console.log({ latLong, locationErrorMsg });
    handleTrackLocation();
  };

  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee appealing - Home</title>
        <meta name="description" content="Coffee appealing - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={
            isFindingLocation ? "Locating.." : "View coffee stores nearby"
          }
          handleOnClick={handleOnBtnClick}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}

        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="" />
        </div>
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
