const NotFound = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center px-4 py-24">
      <div className="text-(--primary) text-2xl md:text-4xl font-bold">
        404 - Page Not Found
      </div>
      <p className="text-sm md:text-lg text-gray-400">
        Oops! Looks like that page doesn’t exist.
      </p>
    </div>
  );
};

export default NotFound;
