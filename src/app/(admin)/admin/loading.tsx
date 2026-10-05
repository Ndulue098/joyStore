interface loadingProps {
  
}

export default function loading({}: loadingProps) {
  return (
    <div className="flex items-center justify-center h-full w-full">

     <div
      className={`relative inline-block  w-32 h-32 text-center`}
      // style={{ width: size, height: size }}
      role="status"
      aria-label="loading"
      >
      <span
        className="absolute inset-0 rounded-full border-2 animate-ping opacity-75"
        style={{ borderColor:"#3B82F6", animationDuration: '2s' }}
        />
      <span
        className="absolute inset-0 rounded-full border-2 animate-ping opacity-75"
        style={{ borderColor: "#3B82F6", animationDuration: '2s', animationDelay: '-1s' }}
        />
        </div>
    </div>
  );
}