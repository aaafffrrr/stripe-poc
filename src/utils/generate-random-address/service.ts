type Address = {
  line1: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
};

export function generateRandomAddress(): Address {
  // Define arrays of data for random selection
  const streetNames: string[] = [
    'Main',
    'Park',
    'Oak',
    'Pine',
    'Elm',
    'Cedar',
    'Maple',
    'Spruce',
    'Willow',
    'Birch',
  ];

  const cityStateMap: { [city: string]: string } = {
    Montréal: 'QC',
    Toronto: 'ON',
    Vancouver: 'BC',
    Calgary: 'AB',
    Edmonton: 'AB',
    Ottawa: 'ON',
    Winnipeg: 'MB',
    'Quebec City': 'QC',
    Hamilton: 'ON',
    Kitchener: 'ON',
  };

  // Select a random city and its corresponding state
  const cities = Object.keys(cityStateMap);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomState = cityStateMap[randomCity];

  // Helper function to generate a random postal code (Canadian format)
  const getRandomPostalCode = (): string => {
    return 'H3G 0E1'; // Placeholder for a random postal code generation logic
  };

  // Generate random address object
  return {
    line1: `${Math.floor(Math.random() * 1000) + 1} ${
      streetNames[Math.floor(Math.random() * streetNames.length)]
    } Street`,
    city: randomCity,
    postalCode: getRandomPostalCode(),
    state: randomState,
    country: 'CA',
  };
}
