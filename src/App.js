import { useEffect, useState } from "react";

function App() {
  // These are 'state' definitions (variables which exist inside this component)
  let [filterRule, setFilterRule] = useState(undefined);
  let [sortRule, setSortRule] = useState(undefined);
  let [missions, setMissions] = useState([]);

  function queryDataFromApi() {
    // API docs here, with examples of payloads.
    // https://docs.spacexdata.com/#5fc4c846-c373-43df-a10a-e9faf80a8b0a
    // Remember to check your network tab for more info on the request which is being done.
    fetch("https://api.spacexdata.com/v3/launches") //fetch is an example of an asynchronous (async) function. What is an async function?
      .then(data => data.json())
      .then(data => {
        setMissions(data);
      });
  }

  useEffect(() => {
    console.log('runs once when the component is initialised');
    queryDataFromApi();
  }, []);

  // apply filters here
  // let filteredMissions = missions.filter...

  // apply sorting rules here
  // let sortedFilteredMissions = filteredMissions.sort...

  return (
    <div className="App">
      <div>
        {/* This is an example of a 'controlled input' what is a controlled input? */}
        <label htmlFor="filter">Filter by Name</label>
        <select id="filter" value={filterRule} onChange={e => setFilterRule(e.target.value)}>
          <option value="">All</option>
          <option value="crs">CRS Missions</option>
          <option value="starlink">Starlink Missions</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort">Sort by Launch Site</label>
        <select id="sort" value={sortRule} onChange={e => setSortRule(e.target.value)}>
          <option value="">All</option>
          <option value="Kwajalein Atoll">Kwajalein Atoll</option>
          <option value="CCAFS SLC 40">CCAFS SLC 40</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <td>Mission Name</td>
            <td>Date</td>
            <td>Launch Site</td>
          </tr>
        </thead>
        <tbody>
          {
            // instead of 'missions' here, use 'sortedFilteredMissions'
            missions.map((mission, index) => {
              return (
                <tr key={index}>
                  <td>{mission.mission_name}</td>
                  <td>{mission.launch_date_utc}</td>
                  <td>{mission.launch_site.site_name}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;

// Try adding another column to the table
// Try adding a multi-select checkbox input to filter your table rows by (hard)
// Deploy your code to a website and show it to richard (use Firebase Hosting) https://www.youtube.com/watch?v=q5J5ho7YUhA&ab_channel=Fireship