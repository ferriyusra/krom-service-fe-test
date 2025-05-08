import Link from "next/link"
import { FaFacebook, FaTwitter, FaHeart } from 'react-icons/fa6'

const LandingPageLayoutFooter = () => {
  return (
    <footer className="bg-[#006a65] text-white px-6 py-10 mt-5">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex-shrink-0">
            <FaHeart
              size={100}
            />
          </div>

          <div className="text-sm md:text-base">
            <h4 className="font-semibold mb-2">Contact</h4>
            <p>Jalan Pisang No.9 Jakarta Selatan</p>
            <p>12950 DKI Jakarta, Indonesia</p>
            <p>helpdesk@career.go.id</p>
            <p>www.career-hello.go.id</p>
          </div>
        </div>

        <div className="my-6 border-t border-white" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>© Hello Career Krom</p>
          <div className="flex flex-wrap gap-3 text-white font-medium text-center justify-center">
            <Link href="#">Program</Link>
            <span className="hidden md:inline">|</span>
            <Link href="#">Story</Link>
            <span className="hidden md:inline">|</span>
            <Link href="#">Teach with us</Link>
            <span className="hidden md:inline">|</span>
            <Link href="#">FAQ</Link>
          </div>
          <div className="flex items-center gap-4 text-xl">
            <Link href="#"><FaFacebook /></Link>
            <Link href="#"><FaTwitter /></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default LandingPageLayoutFooter