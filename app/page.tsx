import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <Pagination pageSize={5} currentPage={1} itemCount={35}/>
  );
}
