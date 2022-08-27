import { format } from 'date-fns';
import Container from './container';

export default function Footer(): JSX.Element {
  const staticGenerationDate = new Date(process.env.staticGenerationDate!);

  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">Matt.</h3>
            <div className="text-xs">
              Staticly built on{' '}
              <span title={staticGenerationDate.toLocaleString()}>{format(staticGenerationDate, 'PPP')}</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
              <a
                className="text-gray-500 hover:text-blue-500 duration-200"
                href="https://facebook.com/matthieu.riegler"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a
                className="ml-3 text-gray-500 hover:text-blue-400 duration-200"
                href="https://twitter.com/jean__meche"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                className="ml-3 text-gray-500 hover:text-pink-600 duration-200"
                href="https://instagram.com/jean__meche"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a
                className="ml-3 text-gray-500 hover:text-blue-600 duration-200"
                href="https://www.linkedin.com/in/matthieuriegler/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>

              <a
                className="ml-3 text-gray-500 hover:text-orange-500 duration-200"
                href="https://www.strava.com/athletes/6914721"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
              </a>

              <a
                className="ml-3 text-gray-500 hover:text-orange-400 duration-200"
                href="https://stackoverflow.com/users/884123/matthieu-riegler"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 169.61 200" fill="currentColor" stroke="currentColor" width="24" height="24">
                  <path d="M140.44 178.38v-48.65h21.61V200H0v-70.27h21.61v48.65z" />
                  <path d="M124.24 140.54l4.32-16.22-86.97-17.83-3.78 17.83zM49.7 82.16L130.72 120l7.56-16.22-81.02-37.83zm22.68-40l68.06 57.3 11.35-13.51-68.6-57.3-11.35 13.51zM116.14 0l-14.59 10.81 53.48 71.89 14.58-10.81zM37.81 162.16h86.43v-16.21H37.81z" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
