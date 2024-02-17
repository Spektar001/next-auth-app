import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Link
        className="bg-white border rounded-md px-4 py-2 hover:shadow-md duration-300"
        href={"/login"}
      >
        Login
      </Link>
      <Link
        className="bg-white border rounded-md px-4 py-2 hover:shadow-md duration-300"
        href={"/registration"}
      >
        Registration
      </Link>
    </div>
  );
}
