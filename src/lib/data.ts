import { Sun, Cloud, CloudRain, CloudSun, Sprout, Landmark, Calculator } from 'lucide-react';

export const locations = ['Delhi', 'Mumbai', 'Bangalore'] as const;
export type Location = typeof locations[number];

export const weatherDataByLocation = {
  'Delhi': {
    coords: { lat: 28.7041, lon: 77.1025 },
    current: {
      city: 'weather.cities.delhi',
      temperature: 32,
      condition: 'weather.conditions.sunny',
      icon: Sun,
      humidity: 40,
      wind: 8,
    },
    forecast: [
      { day: 'days.mon', temp: 33, condition: 'weather.conditions.sunny', icon: Sun },
      { day: 'days.tue', temp: 34, condition: 'weather.conditions.sunny', icon: Sun },
      { day: 'days.wed', temp: 32, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
      { day: 'days.thu', temp: 30, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
      { day: 'days.fri', temp: 33, condition: 'weather.conditions.sunny', icon: Sun },
      { day: 'days.sat', temp: 35, condition: 'weather.conditions.sunny', icon: Sun },
      { day: 'days.sun', temp: 34, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
    ],
    advisory: 'weather.advisories.delhi'
  },
  'Mumbai': {
    coords: { lat: 19.0760, lon: 72.8777 },
    current: {
      city: 'weather.cities.mumbai',
      temperature: 29,
      condition: 'weather.conditions.rain',
      icon: CloudRain,
      humidity: 85,
      wind: 20,
    },
    forecast: [
      { day: 'days.mon', temp: 28, condition: 'weather.conditions.rain', icon: CloudRain },
      { day: 'days.tue', temp: 29, condition: 'weather.conditions.rain', icon: CloudRain },
      { day: 'days.wed', temp: 29, condition: 'weather.conditions.cloudy', icon: Cloud },
      { day: 'days.thu', temp: 27, condition: 'weather.conditions.rain', icon: CloudRain },
      { day: 'days.fri', temp: 28, condition: 'weather.conditions.rain', icon: CloudRain },
      { day: 'days.sat', temp: 30, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
      { day: 'days.sun', temp: 30, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
    ],
    advisory: 'weather.advisories.mumbai'
  },
  'Bangalore': {
    coords: { lat: 12.9716, lon: 77.5946 },
    current: {
      city: 'weather.cities.bangalore',
      temperature: 24,
      condition: 'weather.conditions.partlyCloudy',
      icon: CloudSun,
      humidity: 75,
      wind: 15,
    },
    forecast: [
      { day: 'days.mon', temp: 25, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
      { day: 'days.tue', temp: 26, condition: 'weather.conditions.cloudy', icon: Cloud },
      { day: 'days.wed', temp: 24, condition: 'weather.conditions.rain', icon: CloudRain },
      { day: 'days.thu', temp: 23, condition: 'weather.conditions.rain', icon: CloudRain },
      { day: 'days.fri', temp: 25, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
      { day: 'days.sat', temp: 26, condition: 'weather.conditions.cloudy', icon: Cloud },
      { day: 'days.sun', temp: 26, condition: 'weather.conditions.partlyCloudy', icon: CloudSun },
    ],
    advisory: 'weather.advisories.bangalore'
  }
};


export const mandiPrices = [
  { id: 1, crop: 'Wheat', variety: 'Dara', mandi: 'Azadpur, Delhi', price: 2350, change: 1.2 },
  { id: 2, crop: 'Wheat', variety: 'Dara', mandi: 'Khanna, Punjab', price: 2410, change: -0.5 },
  { id: 3, crop: 'Wheat', variety: 'Dara', mandi: 'Indore, MP', price: 2380, change: 0.8 },
  { id: 4, crop: 'Rice', variety: 'Basmati', mandi: 'Karnal, Haryana', price: 8500, change: 2.5 },
  { id: 5, crop: 'Rice', variety: 'Basmati', mandi: 'Dehradun, UK', price: 8420, change: 1.1 },
  { id: 6, crop: 'Corn', variety: 'Yellow', mandi: 'Nizamabad, Telangana', price: 2150, change: -1.8 },
  { id: 7, crop: 'Corn', variety: 'Yellow', mandi: 'Davangere, Karnataka', price: 2200, change: 0.3 },
  { id: 8, crop: 'Tomato', variety: 'Hybrid', mandi: 'Nashik, Maharashtra', price: 1800, change: 5.1 },
  { id: 9, crop: 'Tomato', variety: 'Hybrid', mandi: 'Madanapalle, AP', price: 1750, change: 4.8 },
];

export const priceTrends = [
  { date: '7 days ago', Wheat: 2300, Rice: 8200, Corn: 2200 },
  { date: '6 days ago', Wheat: 2320, Rice: 8250, Corn: 2180 },
  { date: '5 days ago', Wheat: 2310, Rice: 8300, Corn: 2190 },
  { date: '4 days ago', Wheat: 2340, Rice: 8350, Corn: 2170 },
  { date: '3 days ago', Wheat: 2350, Rice: 8400, Corn: 2160 },
  { date: '2 days ago', Wheat: 2380, Rice: 8450, Corn: 2150 },
  { date: 'Today', Wheat: 2410, Rice: 8500, Corn: 2150 },
];

export const featureCards = [
    {
        titleKey: "featureCards.diseaseDetection.title",
        descriptionKey: "featureCards.diseaseDetection.description",
        icon: Sprout,
        link: "/dashboard/disease-detection",
    },
    {
        titleKey: "featureCards.marketPrices.title",
        descriptionKey: "featureCards.marketPrices.description",
        icon: Landmark,
        link: "/dashboard/market-prices",
    },
    {
        titleKey: "featureCards.profitForecasting.title",
        descriptionKey: "featureCards.profitForecasting.description",
        icon: Calculator,
        link: "/dashboard/profit-estimator",
    },
];

export const cropTypes = [ "Wheat", "Rice", "Corn", "Tomato", "Potato", "Sugarcane", "Cotton", "Soybean" ];
