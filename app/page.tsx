import Pagination from "./components/Pagination";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  return (
    <Pagination pageSize={5} currentPage={parseInt(searchParams.page)} itemCount={35} />
  );
}
