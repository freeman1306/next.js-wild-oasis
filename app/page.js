import Link from "next/link"
import Navigation from "./components/Navigation"


function Page() {
  return (
    <div>


      <h1>Home Page</h1>

      <Link href="/cabins">View Cabins</Link>
    </div>
  )
}

export default Page