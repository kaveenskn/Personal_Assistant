const Profile = () => {
  return (
    <div className="h-[min(650px,100vh)] w-full md:w-3/5 lg:w-2/5 mx-auto bg-slate-100 p-6 flex items-start justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="h-40 w-40 rounded-full bg-sky-100 flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-500"
            >
              <path
                d="M20 21a8 8 0 0 0-16 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <button
            type="button"
            aria-label="Change profile photo"
            className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-sky-500 text-white flex items-center justify-center ring-4 ring-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 7 10.5 5.5H13.5L15 7H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-semibold text-slate-900">John Doe</h1>
        <p className="mt-2 text-slate-500">Click to edit name</p>
      </div>
    </div>
  )
}

export default Profile
