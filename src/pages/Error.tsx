type ErrorProp = {
  code: number;
  title: string;
  message: string;
};

function ErrorPage({ code, title, message }: ErrorProp) {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center text-gray-500">
      <div className="flex flex-col items-center max-w-sm text-center">
        <h1 className="font-display font-black text-9xl">{code}</h1>
        <h2 className="font-display font-black text-4xl mb-8">{title}</h2>
        <p className="font-display font-medium text-xl">{message}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
