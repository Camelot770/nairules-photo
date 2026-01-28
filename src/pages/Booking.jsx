import BookingForm from '../components/BookingForm'

export default function Booking() {
  return (
    <div className="page-transition px-6 pt-20 pb-8">
      <header className="mb-10">
        <p className="text-gray-400 text-sm tracking-wide uppercase mb-2">Заявка</p>
        <h1 className="text-3xl font-light">
          Записаться на съёмку
        </h1>
      </header>
      <div className="max-w-md">
        <BookingForm />
      </div>
    </div>
  )
}
