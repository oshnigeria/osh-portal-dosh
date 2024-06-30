export const main_url =
  process.env.NEXT_PUBLIC_NODE_ENV !== "production"
    ? "https://sbxapi.oshnigeria.org"
    : "https://api.oshnigeria.org";

export const cookies_id = "oshnigeria_dosh_cookies";

export const states = [
  "Select a state",
  "abia",
  "abuja federal capital",
  "adamawa",
  "akwa ibom",
  "anambra",
  "bauchi",
  "bayelsa",
  "benue",
  "borno",
  "cross river",
  "delta",
  "ebonyi",
  "edo",
  "ekiti",
  "enugu",
  "gombe",
  "imo",
  "jigawa",
  "kaduna",
  "kano",
  "katsina",
  "kebbi",
  "kogi",
  "kwara",
  "lagos",
  "nassarawa",
  "niger",
  "ogun",
  "ondo",
  "osun",
  "oyo",
  "plateau",
  "rivers",
  "sokoto",
  "taraba",
  "yobe",
  "zamfara",
];
