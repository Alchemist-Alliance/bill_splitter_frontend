const Loading = () => {
  return (
    <div className="grid grid-cols-1 h-full w-full gap-3 px-3 pb-3 md:grid-cols-2 md:gap-5 md:px-8 md:pb-5 lg:grid-cols-3 lg:px-8 lg:pb-5">
      <div className="animate-pulse rounded-lg md:rounded-xl bg-primary w-full h-[380px] md:h-[400px] lg:h-full"></div>
      <div className="animate-pulse rounded-lg md:rounded-xl bg-primary w-full h-[380px] md:h-[400px] lg:h-full"></div>
      <div className="animate-pulse rounded-lg md:rounded-xl lg:row-span-2 bg-primary w-full h-[380px] md:h-[400px] lg:h-[570px]"></div>
      <div className="animate-pulse rounded-lg md:rounded-xl lg:col-span-2 bg-primary w-full h-[380px] md:h-[400px] lg:h-full"></div>
    </div>
  );
};

export default Loading;
