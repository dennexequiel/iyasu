import { IoIosArrowRoundBack } from "react-icons/io";

interface SuccessPopupProps {
  onClose: () => void
}

export default function NewsletterSuccessPopup({ onClose }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 bg-white/10 flex items-center justify-center p-4 transition-opacity duration-300 z-50">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-teal-500">
          Success! You&apos;re Officially Subscribed
        </h2>
        <p className="text-center mb-6 font-poppins">
          Stay in the loop! Get the latest updates straight to your inbox.
        </p>
        <a
        onClick={onClose}
        className='uppercase font-bold flex items-center justify-center mt-6 text-neutral-500 hover:text-teal-500 transition duration-300 cursor-pointer'
      >
        <IoIosArrowRoundBack className='w-4 h-4 mr-1' />
        Back
      </a>
      </div>
    </div>
  )
}