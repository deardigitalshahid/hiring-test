import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Hiring Test</h1>
      <Link href="/products">Go to Products</Link>
    </>
  );
}
