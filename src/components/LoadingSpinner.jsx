const LoadingSpinner = () => {
    return (
        <div className="absolute inset-0 bg-transparent w-full h-screen flex items-center justify-center">
            <div className="animate-spin flex justify-center items-center">
                <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* Outer circle */}
                    <circle className="text-gray-400" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                    {/* Half boundary */}
                    <path className=" text-gray-200" stroke="currentColor" strokeWidth="2" fill="none" d="M12 2a10 10 0 0 1 0 20" />
                </svg>
            </div>
        </div>
    );
};

export default LoadingSpinner;
