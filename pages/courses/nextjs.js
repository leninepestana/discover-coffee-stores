import { useRouter } from "next/router";
import Link from "next/link";

const Courses = () => {
  const router = useRouter();
  return (
    <div>
      Welcome to Next.js with Ankita
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </div>
  );
};
export default Courses;
