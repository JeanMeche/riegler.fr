import { DateTime } from 'luxon';

const table: Array<[string, number]> = [
  ['Macon', 0],
  ['Villefranche', 30],
  ['Lyon', 65],
  ['Vienne', 100],
  ['St-Rambert', 134],
  ['Tournon-sur-Rhone', 160],
  ['Saint-Peray', 180],
  ['La Voulte', 200],
  ['Montélimar', 225],
  ['Bolène', 260],
  ['Sorgue', 305],
  ['Cavaillon', 330],
  ['Salon-de-Provence', 360],
  ['Aix-en-Provence', 390],
];

export default function Cycling(): JSX.Element {
  const start = DateTime.fromObject({ day: 17, hour: 5 });

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        distance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ville
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        25 Km/h
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        27 Km/h
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        29 Km/h
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {table.map(([city, distance]) => {
                      return (
                        <tr key={city}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {distance} Km
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {city}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {start
                              .plus({ hours: distance / 25 })
                              .toFormat('HH:mm')}{' '}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {start
                              .plus({ hours: distance / 27 })
                              .toFormat('HH:mm')}{' '}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {start
                              .plus({ hours: distance / 29 })
                              .toFormat('HH:mm')}{' '}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <a
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          href="https://www.strava.com/routes/2749628832854695398"
          target="_blank"
          rel="noreferrer"
        >
          Route Strava
        </a>
      </div>
    </section>
  );
}
