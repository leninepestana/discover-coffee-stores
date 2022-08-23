import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const DynamicRoute = () => {
  const router = useRouter();
  const query = router.query.dynamic;
  console.log("Query ", query);
  console.log("dynamic", router);
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      Hi there This is a dynamic route: {query}
    </div>
  );
};
export default DynamicRoute;
