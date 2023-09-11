import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center px-9 py-9">
      <div className="">
        <h1 className="text-3xl font-semibold bg-yellow-300 mb-12">
          The page you are looking for could not be found 😢
        </h1>
        <button onClick={moveBack} className="text-lg">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
