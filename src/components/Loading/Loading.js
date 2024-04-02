import "./Loading.scss";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <main className="loading">
      <div className="loading__wrapper">
        <h1 className="loading__title">Get your mugs ready...</h1>
        <p className="loading__content loading__content--brewing">
          Our server is waking up and brewing some fresh data.
        </p>
        <p className="loading__content loading__content--caffeine">
          Just hang tight while we pour in some digital caffeine!
        </p>
        <BeatLoader
          color="#f7fdf9"
          loading="true"
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loading__loader"
        />
      </div>
    </main>
  );
}
