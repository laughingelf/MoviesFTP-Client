

function Footer() {
    return (
        <footer className="footer bg-black shadow dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto mx-auto p-4 md:py-4">
                <div className="sm:flex sm:items-center sm:justify-end">

                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="mailto:jaygery90@gmail.com" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-1" />
                <div className="flex items-center justify-between mb-4 sm:mb-0">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">UndergroundDev</a><br /> What's knowledge, If not distributed.</span>
                    <a href="" className="flex items-center">
                        <span className=" mr-2 self-center text-xl sm:text-md md:text-lg font-semibold whitespace-nowrap dark:text-white underline thin flex-shrink-5">UndergroundDev</span>
                        <img src="./img/ugd-logo.svg" className="h-8 mr-1 mt-1" alt="ugd-logo" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer