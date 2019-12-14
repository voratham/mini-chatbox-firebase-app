export default async () => {
  const resp = await fetch("https://ipapi.co/json/");
  const { ip, country_name } = await resp.json();
  return { ip, country_name };
};
