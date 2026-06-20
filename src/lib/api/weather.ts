import { WeatherData } from "@/lib/types";

// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
function getWeatherDescription(code: number): string {
  if (code === 0) return "Clear sky";
  if (code === 1 || code === 2 || code === 3) return "Mainly clear, partly cloudy, and overcast";
  if (code === 45 || code === 48) return "Fog and depositing rime fog";
  if (code >= 51 && code <= 55) return "Drizzle: Light, moderate, and dense intensity";
  if (code >= 56 && code <= 57) return "Freezing Drizzle: Light and dense intensity";
  if (code >= 61 && code <= 65) return "Rain: Slight, moderate and heavy intensity";
  if (code >= 66 && code <= 67) return "Freezing Rain: Light and heavy intensity";
  if (code >= 71 && code <= 75) return "Snow fall: Slight, moderate, and heavy intensity";
  if (code === 77) return "Snow grains";
  if (code >= 80 && code <= 82) return "Rain showers: Slight, moderate, and violent";
  if (code >= 85 && code <= 86) return "Snow showers slight and heavy";
  if (code === 95) return "Thunderstorm: Slight or moderate";
  if (code >= 96 && code <= 99) return "Thunderstorm with slight and heavy hail";
  return "Unknown";
}

export async function getWeatherData(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.append('latitude', lat.toString());
    url.searchParams.append('longitude', lng.toString());
    url.searchParams.append('current', 'temperature_2m,weather_code,wind_speed_10m,snowfall,snow_depth');
    url.searchParams.append('daily', 'snowfall_sum,temperature_2m_max,temperature_2m_min');
    url.searchParams.append('temperature_unit', 'fahrenheit');
    url.searchParams.append('wind_speed_unit', 'mph');
    url.searchParams.append('precipitation_unit', 'inch');
    url.searchParams.append('forecast_days', '7');
    url.searchParams.append('timezone', 'America/New_York');

    // Fetch with Next.js revalidation (cache for 30 minutes)
    const response = await fetch(url.toString(), { next: { revalidate: 1800 } });
    
    if (!response.ok) {
      console.error("Weather API error:", response.statusText);
      return null;
    }

    const data = await response.json();

    const current = data.current;
    const daily = data.daily;

    const forecast = daily.time.map((date: string, index: number) => ({
      date,
      snowfall_inches: daily.snowfall_sum[index] || 0,
      temp_high_f: daily.temperature_2m_max[index] || 0,
      temp_low_f: daily.temperature_2m_min[index] || 0,
    }));

    return {
      current: {
        temperature_f: current.temperature_2m || 0,
        weather_code: current.weather_code || 0,
        weather_description: getWeatherDescription(current.weather_code),
        wind_speed_mph: current.wind_speed_10m || 0,
        snowfall_inches: current.snowfall || 0,
        snow_depth_inches: current.snow_depth || 0,
      },
      forecast,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}
